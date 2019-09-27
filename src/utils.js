import chalk from "chalk";

/**
 *
 *
 * @export
 * @param {string} [s=""]
 * @returns String with camel case
 */
export function toCamelCase(s = "") {
  if (!s) {
    return;
  }

  return s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

/**
 *
 *
 * toTitleCase Converts given string to Title case
 * i.e., Converts to lowercase and then
 *
 * @export
 * @param {string} [s=""]
 * @returns String with capitalized case
 */
export function toTitleCase(s = "") {
  if (!s) {
    return;
  }

  return s.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  });
}

/**
 *
 *
 * fn extractPathParams Extracts path parameters from given path string
 *
 * @export
 * @param {string} path
 * @returns {array} path params
 */
export function extractPathParams(path) {
  if (!path) {
    return;
  }

  const paramsArr = path.match(/{\w+}/g);

  return (paramsArr || []).map(param => param.replace(/{|}/g, "")) || [];
}

export const notEmptyObj = obj => Object.keys(obj).length;

/**
 *
 *
 * Help Manual
 */
export const printManPage = () => {
  console.log(
    `
    
    ${chalk.gray.bold("Flags")}             ${chalk.gray.bold("Usage")}
    `
  );

  const manPage = `  --json-file:         String, --jsonFile filename.json or --jsonFile=filename.json or --jsonFile ../Downloads/filename.json

  --js-file:           String   
  
  --version:          String
  
  --name:             String
  
  --baseUrl:          String
  
  --requiredHeaders: [String] --requiredHeaders token,key,account or --requiredHeaders=token,key,account
  
  --optionalHeaders: [String]
  
  --help: Boolean

 ${chalk.gray.bold("or you can you use the following aliases")}

  -f: --json-file
  -j: --js-file
  -v: --version
  -b: --baseUrl
  -o: --optionalHeaders
  -r: --requiredHeaders
  -h: --help
  -n: --name
  `;

  console.log(manPage);
};

export const getDefinitionKey = a =>
  (a.$ref && a.$ref && a.$ref.split("#/definitions/")[1]) ||
  (a &&
    a.items &&
    a.items.$ref &&
    a.items.$ref.split("#/definitions/")[1]);

/**
 *
 * removeKeys Removes keys from given object
 * @param {*} obj
 * @param {*} a
 * @returns
 */
export const removeKeys = (obj, ...a) => {
  const abc = {};

  Object.keys(obj).forEach(key =>
    (a || []).includes(key) ? undefined : (abc[key] = obj[key])
  );

  return abc;
};

/**
 *
 * fn isDocJson
 * Checks if the given json is of apidocjs style
 *
 * @param {*} json
 * @returns true / false
 */
export const isApidocJs = json => {
  const api = json && json[0];

  return api && api.type && api.url && api.name && api.parameter.fields;
};

/**
 *
 * fn isSwaggerJson
 * Checks if given json file is of swagger style
 *
 * @param {*} json
 * @returns true / false
 */
export const isSwaggerJson = json => {
  return json && json.swagger;
};

/**
 *
 *
 * fn stringifyObj
 * Stringifies the given object (multi-level)
 *
 * @param {*} obj
 */
export const stringifyObj = obj =>
  Object.keys(obj)
    .map(key => {
      return `${key}:${
        typeof obj[key] !== "object" ? obj[key] : JSON.stringify(obj[key])
      }`;
    })
    .join()
    .replace(/:/g, "-");
