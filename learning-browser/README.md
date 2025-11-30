# Learning Sessions Browser

A Vue 3 + TypeScript app for browsing AI learning sessions. You can search through sessions, sort them by popularity, and mark them as complete.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then start the dev server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## A Note on the Architecture

Since the job description mentioned experience with design systems and component libraries, I decided to go a bit further and create my own component library. I built two reusable components (Toggle and Input), published them to npm, and then used them in this project. I also used Vue's Composition API and TypeScript throughout to keep things modern and type-safe.

## What It Does

- Shows a list of learning sessions with all the details (title, tags, duration, difficulty, popularity)
- Search by title - waits 300ms after you stop typing before filtering (case-insensitive)
- Sort by popularity - defaults to highest first, but you can flip it
- Loading state - simulates a 500ms network delay on first load
- Error handling - there's a toggle to simulate errors and a retry button
- Accessibility - proper ARIA labels, keyboard navigation, screen reader support, good color contrast
- Smart search - handles race conditions so fast typing doesn't show weird results
- Stable sorting - sessions with the same popularity stay in their original order

## Project Structure

- `src/App.vue` - The main app component that ties everything together
- `src/components` - Card component for displaying each session (keeps things organized)
- `src/types.ts` - TypeScript types so we know what our data looks like
- `public/sessions.json` - The session data
- `DECISION_LOG.md` - My notes on why I made certain decisions

