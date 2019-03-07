# babel-plugin-import-components-style

Some components js and css need to be separated, using this plugin allows you to automatically load css.

## Instructions

You need to configure the babel as follows:

```json
{
  "plugins": [
    [
      "babel-plugin-import-components-style",
      {
        "components": {
          "moduleName1": "style/moduleName1.css",
          "moduleName2": "style/moduleName2.css" 
        }
      }
    ]
  ]
}
```

The plugin will automatically perform the following conversion:

```javascript
import moduleName1 from 'moduleName1';
import { func1, func2 } from 'moduleName2';
```

Convert into

```javascript
import moduleName1 from 'moduleName1';
import 'moduleName1/style/moduleName1.css';
import { func1, func2 } from 'moduleName2';
import 'moduleName2/style/moduleName2.css';
```
## options

* components<object>:
  * key: Module name.
  * value<string>: The address of the style file such as css, less, sass, scss, styl, etc. in the module (no need to write the module name, the plugin will automatically add it for you)。