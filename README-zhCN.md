# babel-plugin-import-components-style

某些组件js和css是需要分离的，使用该插件可以让你自动加载css。

## 使用方法

你需要对babel进行如下配置：

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

插件会自动进行如下转换：

```javascript
import moduleName1 from 'moduleName1';
import { func1, func2 } from 'moduleName2';
```

转换成

```javascript
import moduleName1 from 'moduleName1';
import 'moduleName1/style/moduleName1.css';
import { func1, func2 } from 'moduleName2';
import 'moduleName2/style/moduleName2.css';
```

## 配置

* components<object>：
  * key：模块名称。
  * value<string>：模块内css、less、sass、scss、styl等样式文件的地址（不需要写模块名，插件会自动帮你添加）。 