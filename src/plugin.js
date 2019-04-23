import * as _ from 'lodash';

/**
 * 检查类型是否为字符串
 */
function check(componentValue) {
  if (!_.isArray(componentValue)) return false;

  let result = true;

  for (const item of componentValue) {
    if (!_.isString(item)) {
      result = false;
      break;
    }
  }

  return result;
}

export default function(types) {
  return {
    ImportDeclaration(path, state) {
      const { node } = path;

      if (!node) return;

      if (!types.isImportDeclaration(node)) return;

      const opts = state.opts || {}; // 获取配置
      const { specifiers, source } = node;
      const { value } = source; // 获取模块名称
      const components = opts.components; // 获取配置项目

      // components配置项必须存在
      if (!components) {
        console.warn('Components configuration must exist');

        return;
      }

      // components配置项必须是object类型
      if (!_.isPlainObject(components)) {
        console.warn('The type of components configuration must be object type.');

        return;
      }

      // 获取键值
      const componentValue = components[value];

      if (!componentValue) return;

      if (!(_.isString(componentValue) || _.isArray(componentValue) || check(componentValue))) {
        console.warn('The key value in components must be string type or Array<string> type.');

        return;
      }

      const importValue = _.isArray(componentValue) ? componentValue : [componentValue];

      for (let i = importValue.length - 1; i >= 0; i--) {
        const item = importValue[i];
        let stringLiteralValue = item;

        // 约定以~开头的路径，不添加moduleName
        if (stringLiteralValue[0] !== '~') {
          stringLiteralValue = `${ value }/${ item }`;
        } else {
          stringLiteralValue = stringLiteralValue.substr(1);
        }

        const stringLiteral = types.stringLiteral(stringLiteralValue);
        const importDeclaration = types.importDeclaration([], stringLiteral);

        path.insertAfter([importDeclaration]);
      }
    }
  };
}