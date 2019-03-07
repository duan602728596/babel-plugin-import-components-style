import { isObject, isString } from './type';

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
      if (!isObject(components)) {
        console.warn('The type of components configuration must be object type.');

        return;
      }

      // 获取键值
      const componentValue = components[value];

      if (!componentValue) return;

      if (!isString(componentValue)) {
        console.warn('The key value in components must be string type.');

        return;
      }

      // 插入模块
      const stringLiteral = types.stringLiteral(`${ source.value }/${ componentValue }`);
      const importDeclaration = types.importDeclaration([], stringLiteral);

      path.insertAfter([importDeclaration]);
    }
  };
}