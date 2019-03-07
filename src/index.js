import plugin from './plugin';

export default function(babel) {
  const { types } = babel;

  return {
    visitor: plugin(types)
  };
}