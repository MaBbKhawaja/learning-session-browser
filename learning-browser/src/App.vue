<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Learning Sessions Browser</h1>
      
      <div class="mb-6 space-y-4">
        <div>
          <label for="search" class="sr-only">Search sessions by title</label>
          <Input
            id="search"
            v-model="searchQuery"
            placeholder="Search sessions by title..."
          />
        </div>
        
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2">
            <label for="sort-order" class="text-sm font-medium text-gray-700">
              Sort by popularity:
            </label>
            <button
              id="sort-order"
              @click="toggleSortOrder"
              class="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :aria-label="`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`"
            >
              {{ sortOrder === 'desc' ? '↓ Descending' : '↑ Ascending' }}
            </button>
          </div>
          
          <div class="flex items-center gap-2">
            <label for="simulate-error" class="text-sm font-medium text-gray-700">
              Simulate error:
            </label>
            <Toggle
              id="simulate-error"
              v-model="shouldSimulateError"
              label="Simulate error"
              @update:modelValue="toggleErrorSimulation"
            />
          </div>
        </div>
      </div>

      <div
        v-if="loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
        class="text-center py-12"
      >
        <p class="text-gray-600">Loading sessions...</p>
      </div>

      <div
        v-else-if="error"
        role="alert"
        class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
      >
        <h2 class="text-lg font-semibold text-red-900 mb-2">Error loading sessions</h2>
        <p class="text-red-700 mb-4">{{ error }}</p>
        <button
          @click="fetchSessions"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>

      <div
        v-else
        role="list"
        aria-label="Learning sessions"
        class="space-y-4"
      >
        <div
          v-for="session in filteredAndSortedSessions"
          :key="session.id"
          role="listitem"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <Card :session="session" @update:completed="updateCompleted(session, $event)" />
        </div>
        
        <div
          v-if="filteredAndSortedSessions.length === 0"
          class="text-center py-12 text-gray-500"
        >
          <p>No sessions found matching your search.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Input, Toggle } from 'learning-browser-library'
import Card from './components/Card.vue'
import type { Session } from './types'

const sessions = ref<Session[]>([])
const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('desc')
const loading = ref(true)
const error = ref<string | null>(null)
const shouldSimulateError = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let searchRequestId = 0

const debouncedSearchQuery = ref('')

const fetchSessions = async () => {
  loading.value = true
  error.value = null
  
  const willSimulateError = shouldSimulateError.value
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (willSimulateError) {
    error.value = 'Failed to load sessions. Please try again.'
    loading.value = false
    sessions.value = []
    return
  }
  
  try {
    const response = await fetch('/sessions.json')
    if (!response.ok) {
      throw new Error('Failed to fetch sessions')
    }
    const data = await response.json()
    sessions.value = data
    loading.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    loading.value = false
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

const toggleErrorSimulation = () => {
  if (shouldSimulateError.value && sessions.value.length > 0 && !loading.value && !error.value) {
    error.value = 'Failed to load sessions. Please try again.'
    sessions.value = []
  } else if (!shouldSimulateError.value && error.value && !loading.value) {
    error.value = null
    fetchSessions()
  }
}

const updateCompleted = (session: Session, completed: boolean) => {
  session.completed = completed
}

const updateDebouncedSearch = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  const currentRequestId = ++searchRequestId
  
  debounceTimer = setTimeout(() => {
    if (currentRequestId === searchRequestId) {
      debouncedSearchQuery.value = searchQuery.value
    }
  }, 300)
}

watch(searchQuery, () => {
  updateDebouncedSearch()
})

const filteredSessions = computed(() => {
  if (!debouncedSearchQuery.value.trim()) {
    return sessions.value
  }
  
  const query = debouncedSearchQuery.value.toLowerCase().trim()
  return sessions.value.filter(session =>
    session.title.toLowerCase().includes(query)
  )
})

const filteredAndSortedSessions = computed(() => {
  const filtered = [...filteredSessions.value]
  
  return filtered.sort((a, b) => {
    const diff = a.popularity - b.popularity
    if (diff !== 0) {
      return sortOrder.value === 'desc' ? -diff : diff
    }
    const indexA = sessions.value.findIndex(s => s.id === a.id)
    const indexB = sessions.value.findIndex(s => s.id === b.id)
    return indexA - indexB
  })
})

onMounted(() => {
  fetchSessions()
})
</script>

<style scoped>
</style>

