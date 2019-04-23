# babel-plugin-import-components-style

[中文文档](README-zhCN.md)

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
          "moduleName2": "style/moduleName2.css",
          "moduleName3/dist": "~moduleName3/style/moduleName3.css",
        }
      }
    ]
  ]
}
```

The plugin will automatically perform the following conversion:

```javascript
import module1 from 'moduleName1';
import { func1, func2 } from 'moduleName2';
import module3 from 'moduleName3/dist';
```

Convert into
```javascript
import module1 from 'moduleName1';
import 'moduleName1/style/moduleName1.css';
import { func1, func2 } from 'moduleName2';
import 'moduleName2/style/moduleName2.css';
import module3 from 'moduleName3/dist';
import 'moduleName3/style/moduleName3.css';
```
## options

* components<object>:
  * `key: string`: Module name.
  * `value: string | Array<string>`: The address of the style file such as css, less, sass, scss, styl, etc. in the module (no need to write the module name, the plugin will automatically add it for you. If your path starts with ` ~ `, the plugin won't add the module name for you.).