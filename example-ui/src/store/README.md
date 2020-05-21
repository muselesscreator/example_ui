# Redux Store
## What's in this module?

### index.js (default store import!)
This is the default import point for the redux store in the majority of the project, imported as 
```js
import {actions, selectors, thunkActions, global_selectors} from 'store';
```

### store.js
This file is the source for the above index file, specifically separated out so that there can be a family of global selectors and thunkActions without introducing circular dependencies.
 
### global_selectors
This is the home for selectors that want to access multiple store modules.

### thunkActions
This is the home for thunkActions that want to access multiple store modules, particularly between the argus websocket api and the gui store module.
