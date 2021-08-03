import type { types, Visitor } from '@babel/core';
import type { NodePath } from '@babel/traverse';
import type { ImportDeclaration, StringLiteral } from '@babel/types';
import type { Components, ComponentsFunc } from './types';

function plugin(t: typeof types, c: Components | ComponentsFunc): Visitor {
  return {
    ImportDeclaration(path: NodePath<ImportDeclaration>): void {
      const { node }: NodePath<ImportDeclaration> = path;
      const { value }: StringLiteral = node.source; // 获取模块名称
      const componentValue: string | Array<string> = typeof c === 'function' ? c(value) : c[value];

      if (!componentValue) {
        return;
      }

      const importValue: Array<string> = Array.isArray(componentValue) ? componentValue : [componentValue];

      for (let i: number = importValue.length - 1; i >= 0; i--) {
        const addPath: string = importValue[i];

        // 约定以~开头的路径，不添加moduleName
        const stringLiteralValue: string = addPath[0] !== '~' ? `${ value }/${ addPath }` : addPath.substr(1);
        const stringLiteral: StringLiteral = t.stringLiteral(stringLiteralValue);
        const importDeclaration: ImportDeclaration = t.importDeclaration([], stringLiteral);

        path.insertAfter([importDeclaration]);
      }
    }
  };
}

export default plugin;