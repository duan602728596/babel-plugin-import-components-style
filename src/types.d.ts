import type { types } from '@babel/core';

interface BabelTypes {
  types: typeof types;
}

// 插件的options
interface Components {
  [key: string]: string | Array<string>;
}

interface ComponentsFunc {
  (moduleName: string): string | Array<string>;
}

interface Options {
  components: Components | ComponentsFunc;
}