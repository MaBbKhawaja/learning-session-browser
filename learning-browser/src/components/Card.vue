<template>
  <div class="flex items-start justify-between gap-4">
    <div class="flex-1 min-w-0">
      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        {{ session.title }}
      </h2>
      
      <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
        <span>
          <span class="font-medium">Tags:</span>
          {{ session.tags.length > 0 ? session.tags.join(', ') : '-' }}
        </span>
        <span>
          <span class="font-medium">Duration:</span>
          {{ Number(session.mins) }} min{{ Number(session.mins) !== 1 ? 's' : '' }}
        </span>
        <span>
          <span class="font-medium">Difficulty:</span>
          <span
            :class="[
              'ml-1 px-2 py-0.5 rounded text-xs font-medium',
              getDifficultyClass(session.difficulty)
            ]"
          >
            {{ session.difficulty || 'N/A' }}
          </span>
        </span>
        <span>
          <span class="font-medium">Popularity:</span>
          {{ session.popularity }}
        </span>
      </div>
    </div>
    
    <div class="flex items-center gap-2 flex-shrink-0">
      <label :for="`toggle-${session.id}`" class="sr-only">
        Mark {{ session.title }} as {{ session.completed ? 'incomplete' : 'complete' }}
      </label>
      <Toggle
        :id="`toggle-${session.id}`"
        :model-value="session.completed"
        :label="`Toggle completion for ${session.title}`"
        @update:model-value="handleToggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toggle } from 'learning-browser-library'
import type { Session } from '../types'

const props = defineProps<{
  session: Session
}>()

const emit = defineEmits<{
  'update:completed': [value: boolean]
}>()

const handleToggle = (value: boolean) => {
  emit('update:completed', value)
}

const getDifficultyClass = (difficulty: string | null) => {
  if (!difficulty) return 'bg-gray-100 text-gray-700'
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-800'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800'
    case 'advanced':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>

<style scoped>
</style>

