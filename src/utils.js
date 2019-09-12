export function toCamelCase(s = "") {
  return s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
export function toTitleCase(s = "") {
  return s.replace(/\w+/g, function(w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
}
export function extractPathParams(path) {
  const paramsArr = path.match(/{\w+}/g);
  return (paramsArr || []).map(param => param.replace(/{|}/g, "")) || [];
}
export const notEmptyObj = obj => Object.keys(obj).length;
