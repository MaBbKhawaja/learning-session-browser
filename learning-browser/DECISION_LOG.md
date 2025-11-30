# Decision Log

## Where do you coerce mins to a number and why there?

I convert mins to a number right in the template where it's displayed. The JSON gives us mins as a string like "8", but I need it as a number to handle the pluralization logic (showing "min" vs "mins"). I do it in the template because that's the only place I actually need the number so far I could find, and it keeps things simple, no need to transform the data elsewhere when it's only used for display.

## How did you implement the debounce and why did you choose that approach?

I used a simple `setTimeout` with a 300ms delay. Every time someone types, I clear the previous timer and start a new one. This way the search only runs after they stop typing for 300ms. I went with this approach because it's straightforward, doesn't need any extra libraries, and I added a request ID counter to handle race conditions - so if someone types really fast, only the latest search actually updates the results. This prevents weird flickering or showing outdated results.

## If two sessions share the same popularity, what guarantees their relative order?

When two sessions have the same popularity score, I use a stable sort that falls back to their original position in the array. So if session A and B both have popularity 100, and A came before B in the original JSON, they'll stay in that order even after sorting. The sort first compares popularity, and if those are equal, it uses the original index as a tiebreaker to keep things consistent.

## What's your approach to accessibility for the toggle?

The Toggle component I'm using already has good accessibility built in - it uses role="switch", aria-checked, and aria-label. I made sure to add clear labels like "Mark [session title] as complete" so screen readers know exactly what each toggle does. The component also handles keyboard navigation (Space and Enter keys work) and has visible focus styles so you can see which toggle you're on when navigating with the keyboard.
