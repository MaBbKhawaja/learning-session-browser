# Learning Browser Library

A Vue 3 component library providing reusable UI components.

## Installation

```bash
npm install learning-browser-library
```

## Components

### Input

A search input component with icon.

```vue
<script setup>
import { Input } from 'learning-browser-library'
import { ref } from 'vue'

const search = ref('')
</script>

<template>
  <Input v-model="search" placeholder="Search..." />
</template>
```

### Toggle

An accessible toggle/switch component.

```vue
<script setup>
import { Toggle } from 'learning-browser-library'
import { ref } from 'vue'

const isEnabled = ref(false)
</script>

<template>
  <Toggle v-model="isEnabled" label="Enable feature" />
</template>
```

## Props

### Input

- `modelValue` (String): The input value (v-model)
- `placeholder` (String): Placeholder text
- `id` (String): Input element ID

### Toggle

- `modelValue` (Boolean): The toggle state (v-model)
- `label` (String): Accessible label for the toggle
- `disabled` (Boolean): Whether the toggle is disabled
- `id` (String): Toggle element ID

## License

MIT

