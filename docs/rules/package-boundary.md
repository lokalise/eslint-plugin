# Package Boundary

Ensures boundaries for modules are enforced. Boundaries are defined by presence of index file in the directory. 

Anything that can be consumed outside module boundary should be exported from the index file.

Examples of **incorrect** code for this rule.

```jsx
import x from '../utils/main'
```

Examples of **correct** code for this rule.

```jsx
import x from '../utils'
```