# Learning Sessions Browser

A Vue 3 + TypeScript application for browsing AI learning sessions with search, sort, and completion tracking.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

- ✅ Render sessions list with all required fields
- ✅ Search by title with 300ms debounce (case-insensitive)
- ✅ Sort by popularity (default: descending) with toggle
- ✅ Loading state with 500ms delay simulation
- ✅ Error state with "Simulate error" control and retry
- ✅ Accessibility: proper roles, keyboard support, aria-busy, color contrast
- ✅ Race-condition safe search (prevents older searches from overwriting newer results)
- ✅ Stable sort (maintains order for equal popularity values)

## Project Structure

- `src/App.vue` - Main application component
- `src/types.ts` - TypeScript type definitions
- `public/sessions.json` - Session data
- `DECISION_LOG.md` - Design decisions and implementation details

