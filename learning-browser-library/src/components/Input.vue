<template>
  <div class="search-wrapper">
    <span class="search-icon">🔍</span>

    <input
      type="search"
      class="search-input"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  id: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1.6px solid #e1e1e1;
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.search-icon {
  font-size: 16px;
  opacity: 0.7;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: #333;
}

.search-input::placeholder {
  color: #aaaaaa;
}
</style>
