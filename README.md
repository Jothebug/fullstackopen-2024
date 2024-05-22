# npm 7+, extra double-dash is needed:

npm create vite@latest part1 -- --template react

# stop warning

"react/prop-types": 0,

# Running tests one by one

npm test -- --test-only
npm test -- tests/note_api.test.js
