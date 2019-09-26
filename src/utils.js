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
    w = w.toLocaleLowerCase();

    return w[0].toUpperCase();
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
const printManPage = () => {
  console.log(
    `
    
    ${chalk.gray.bold("Flags")}             ${chalk.gray.bold("Usage")}
    `
  );

  const manPage = `  --jsonFile:         String, --jsonFile filename.json or --jsonFile=filename.json or --jsonFile ../Downloads/filename.json

  --jsFile:           String   
  
  --version:          String
  
  --name:             String
  
  --baseUrl:          String
  
  --requiredHeaders: [String] --requiredHeaders token,key,account or --requiredHeaders=token,key,account
  
  --optionalHeaders: [String]
  
  --help: Boolean

 ${chalk.gray.bold("or you can you use the following aliases")}

  -f: --jsonFile
  -j: --jsFile
  -v: --version
  -b: --baseUrl
  -o: --optionalHeaders
  -r: --requiredHeaders
  -h: --help
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
const removeKeys = (obj, ...a) => {
  const abc = {};

  Object.keys(obj).forEach(key =>
    (a || []).includes(key) ? undefined : (abc[key] = obj[key])
  );

  return abc;
};
