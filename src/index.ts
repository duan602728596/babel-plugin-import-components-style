import type { PluginObj } from '@babel/core';
import type { BabelTypes, Options, Components, ComponentsFunc } from './types';
import plugin from './plugin';

function babelPluginImportComponentsStyle({ types: t }: BabelTypes, options: Options): PluginObj {
  const components: Components | ComponentsFunc = options?.components ?? {};

  return {
    visitor: plugin(t, components)
  };
}

export default babelPluginImportComponentsStyle;