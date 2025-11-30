# Decision Log

## Where do you coerce mins to a number and why there?

I coerce `mins` to a number in the template at line 104: `Number(session.mins)`. This happens during rendering because the JSON data provides `mins` as a string, but we need it as a number for display logic (pluralization). I chose the template because it's the only place we need the numeric value, and it keeps the coercion close to where it's used, making the code more readable and avoiding unnecessary data transformation in the component logic.

## How did you implement the debounce and why did you choose that approach?

I implemented debounce using a `setTimeout` with a 300ms delay in the `updateDebouncedSearch` function. When `searchQuery` changes, I clear any existing timer and set a new one. I chose this approach because it's simple, doesn't require external dependencies, and provides race-condition safety through a request ID counter that ensures only the latest search query update is applied, preventing older in-flight searches from overwriting newer results.

## If two sessions share the same popularity, what guarantees their relative order?

When two sessions have the same popularity, their relative order is guaranteed by a stable sort that uses the original index position in the `sessions` array as a tiebreaker. The sort compares popularity first, and if equal, it falls back to comparing the original indices (`indexA - indexB`), ensuring that sessions with equal popularity maintain their original relative order from the JSON data.

## What's your approach to accessibility for the toggle?

For the toggle accessibility, I use the existing `Toggle` component from the library which already implements `role="switch"`, `aria-checked`, and `aria-label`. I enhance this by providing descriptive labels in the template (e.g., "Mark [session title] as [complete/incomplete]") and ensure keyboard support through the component's built-in `@keydown` handler that responds to Space and Enter keys. The component also includes proper focus styles with `focus-visible` for keyboard navigation visibility.

