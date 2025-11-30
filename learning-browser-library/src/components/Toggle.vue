<template>
  <button
    :class="['toggle', { 'toggle-active': modelValue, 'toggle-disabled': disabled }]"
    :disabled="disabled"
    :aria-checked="modelValue"
    :aria-label="label || 'Toggle'"
    role="switch"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span class="toggle-slider"></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;
  
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    emit("update:modelValue", !props.modelValue);
  }
};
</script>

<style scoped>
.toggle {
  position: relative;
  width: 48px;
  height: 28px;
  border: 2px solid #e1e1e1;
  border-radius: 999px;
  background-color: #ffffff;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  outline: none;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
}

.toggle:focus-visible {
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.toggle-active {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

.toggle-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-active .toggle-slider {
  transform: translateX(20px);
}
</style>
