/* 判断数据类型 */

export function isObject(data) {
  return typeof data === 'object' && Object.prototype.toString.call(data) === '[object Object]';
}

export function isString(data) {
  return typeof data === 'string';
}