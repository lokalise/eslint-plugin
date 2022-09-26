# Relative internal imports

Ensures that files from within the module (a directory containing `index` file) are imported using relative paths,
instead of absolute.

Examples of **incorrect** code for this rule.

```jsx
// top/level/with/module/index.js
import x from 'top/level/with/module/path'
```

Examples of **correct** code for this rule.

```jsx
// top/level/with/module/index.js
import x from './path'
```
