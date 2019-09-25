import chalk from "chalk";
import fs from "fs";
import {
  stringOne,
  functionSignature,
  endString,
  markdownStartString,
  appendModalLink,
  markdownCodeBlockEnd,
  operationMarkdownEnd,
  responseMarkdown
} from "./codeStrings";

import {
  extractPathParams,
  toCamelCase,
  toTitleCase,
  notEmptyObj,
  getDefinitionKey,
  removeKeys
} from "./utils";

import cp from "cp";

const isGoJson = json => {
  const api = json && json[0];

  return api && api.type && api.url && api.name && api.parameter.fields;
};
const isSwaggerJson = json => {
  return json && json.swagger;
};
const stringifyObj = obj =>
  Object.keys(obj)
    .map(key => {
      return `${key}:${
        typeof obj[key] !== "object" ? obj[key] : JSON.stringify(obj[key])
        }`;
    })
    .join()
    .replace(/:/g, "-");

export function generateSDK({
  jsonFile,
  jsFile,
  baseUrl = "",
  name = "yournameSDK",
  version,
  requiredHeaders = [],
  optionalHeaders = []
}) {
  let _jsonFile;
  let _name = toTitleCase(name);

  //reading through cli will only have absolute path
  if (jsonFile) {
    _jsonFile = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  }
  let _transformJson = a => a;
  let _transformOperations = {};

  if (jsFile) {
    const { transformOperations, transformJson } = require(jsFile);
    _transformJson = transformJson;
    _transformOperations = transformOperations;
  }
  let isSwaggerGenerated = isSwaggerJson(_jsonFile);
  let isGoGenerated = isGoJson(_jsonFile);
  const storeJsCodeInThisArr = [];
  let storeMarkdown = [];

  storeJsCodeInThisArr.push(
    stringOne({
      version,
      sdkName: _name,
      baseUrl,
      transformOperations: _transformOperations ? true : false,
      requiredHeaders,
      optionalHeaders
    })
  );

  try {
    if (!isGoGenerated && !isSwaggerGenerated) {
      const formatedJson = transformJson(_jsonFile);
      formatedJson.forEach(
        ({ operationName, url, requestMethod, isFormData }) => {
          const operationFunction = functionSignature({
            hasPathParams: extractPathParams(url).length,
            operationName,
            transformResponse: _transformOperations[operationName],
            url,
            requestMethod: requestMethod.toUpperCase(),
            isFormData
          });
          storeJsCodeInThisArr.push(operationFunction);
        }
      );
    }
    if (isSwaggerGenerated) {
      const tags = _jsonFile.tags;
      const pathsData = _jsonFile.paths;
      Object.entries(pathsData).map(path => {
        const url = path[0];
        Object.entries(path[1]).forEach(method => {
          const requestMethod = method[0];
          const methodData = method[1];
          const apiGroup = (methodData.tags || ["common"])[0];
          const operationName = methodData.operationId;
          const consumes = methodData.consumes || [];
          const isFormData = consumes.includes("multipart/form-data");
          const thisOperationBodyParamsModals = [];
          const thisOperationResponesModals = [];

          const bodyParamsDocGenerators = params => {
            // lets group body/formData params,path params and query params together
            //
            const body = params.filter(param =>
              ["body", "formData"].includes(param.in) ? param : false
            );
            const pathParams = params.filter(param => param.in === "path");
            const qparams = params.filter(param => param.in === "query");
            //
            storeMarkdown.push(markdownStartString({ operationName, name }));

            // can't destruct "in" params bcoz a reserved keyword;
            body.forEach(({ name, schema, type, ...other }) => {
              // if name is body indicates it has a params for which a modal exist in definations
              //  so we just comment meta info here and link to that modal below example code

              if (name === "body") {
                const definition =
                  _jsonFile.definitions[getDefinitionKey(schema)];
                storeMarkdown.push(
                  `  /** ${getDefinitionKey(schema)} modal,${
                  schema.type ? "type - " + schema.type + "," : ""
                  } ${stringifyObj(removeKeys(other, "in"))} */`
                );
                thisOperationBodyParamsModals.push(getDefinitionKey(schema));
              } else {
                // else just name: type of param, stringify other info and comment // if there is a object in other info just JSON.stringify
                storeMarkdown.push(
                  ` ${name}:${type}, /** ${stringifyObj({
                    ...removeKeys(other, "in")
                  })} */\n`
                );
              }
            });
            if (pathParams.length) {
              storeMarkdown.push("  _pathParams: {\n");
              pathParams.forEach(({ name, type, ...other }) => {
                storeMarkdown.push(
                  `   ${name}:${type}, /** ${stringifyObj({
                    ...removeKeys(other, "in")
                  })} */ \n`
                );
              });
              storeMarkdown.push("  }");
            }
            if (qparams.length) {
              storeMarkdown.push("  _params: {\n");
              qparams.forEach(({ name, type, ...other }) => {
                storeMarkdown.push(
                  `   ${name}:${type}, /** ${stringifyObj({
                    ...removeKeys(other, "in")
                  })} */ \n`
                );
              });
              storeMarkdown.push("  }");
            }
            storeMarkdown.push(markdownCodeBlockEnd());
          };
          const responsesDocsGenerators = responses => {
            const twoXX = {};
            const fourXX = {};
            const fiveXX = {};
            const defaultResponse = {};
            Object.keys(responses).forEach(key => {
              if (responses[key] && responses[key].schema) {
                thisOperationResponesModals.push(
                  getDefinitionKey(responses[key].schema)
                );
              }
              if (key.includes("20")) {
                twoXX[key] = responses[key];
              }
              if (key.includes("40")) {
                fourXX[key] = responses[key];
              }
              if (key.includes("50")) {
                fiveXX[key] = responses[key];
              }
              if (key.includes("default")) {
                defaultResponse[key] = responses[key];
              }
            });
            storeMarkdown.push(
              `\n**Responses**\n
              `
            );
            if (Object.keys(defaultResponse).length) {
              storeMarkdown.push(
                responseMarkdown({ resCode: "Default", json: defaultResponse })
              );
            }
            if (Object.keys(twoXX).length) {
              storeMarkdown.push(
                responseMarkdown({ resCode: "Success 2XX", json: twoXX })
              );
            }
            if (Object.keys(fourXX).length) {
              storeMarkdown.push(
                responseMarkdown({ resCode: "Error 4XX", json: fourXX })
              );
            }
            if (Object.keys(fiveXX).length) {
              storeMarkdown.push(
                responseMarkdown({ resCode: "Error 5XX", json: fivXX })
              );
            }
          };

          bodyParamsDocGenerators(methodData.parameters);
          responsesDocsGenerators(methodData.responses);
          const thisOperationsModals = [
            ...thisOperationBodyParamsModals,
            ...thisOperationResponesModals
          ];
          if (thisOperationsModals.length) {
            storeMarkdown.push("\n###### ");
            thisOperationsModals.forEach(a =>
              storeMarkdown.push(appendModalLink(a))
            );
          }

          storeMarkdown.push(operationMarkdownEnd());

          const operationFunction = functionSignature({
            hasPathParams: extractPathParams(url).length,
            operationName,
            transformResponse: _transformOperations[operationName],
            url,
            requestMethod: requestMethod.toUpperCase(),
            isFormData
          });
          storeJsCodeInThisArr.push(operationFunction);
        });
      });
    }
    if (isGoGenerated) {
      _jsonFile.map(api => {
        const url = api.url;
        const requestMethod = api.type;
        const apiGroup = api.group;
        const operationName = toCamelCase(api.name);
        const isFormData =
          api.parameter &&
          api.parameter.fields &&
          Object.entries(api.parameter.fields)
            .map(arr => arr[0])
            .includes("Request formdata");
        const operationFunction = functionSignature({
          hasPathParams: extractPathParams(url).length,
          operationName,
          transformResponse: _transformOperations[operationName],
          url,
          requestMethod: requestMethod.toUpperCase(),
          isFormData
        });
        storeJsCodeInThisArr.push(operationFunction);
      });
    }
  } catch (err) {
    console.log(err);
    if (!(isGoGenerated && isSwaggerGenerated)) {
      console.error(
        "%s The file doesn't seem to be generated by swagger or godocs, you can provide a js file with custom funtion to resolve given json.",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    } else {
      console.log(err);
      console.error("%s error in json", chalk.red.bold("ERROR"));
      process.exit(1);
    }
  }

  if (isSwaggerGenerated) {
    const generateModalsReadeMe = json => {
      const definitions = json.definitions;
      storeMarkdown.push("\n# Modal Definations\n");
      Object.keys(definitions).forEach(key => {
        storeMarkdown.push(
          `\n ### ${key}-modal\n \`\`\`json\n${JSON.stringify(
            definitions[key],
            null,
            2
          )}\n\`\`\`\n`
        );
      });
    };
    generateModalsReadeMe(_jsonFile);
  }
  storeJsCodeInThisArr.push(endString);
  const dir = "sdk";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (jsFile) {
    cp(jsFile, "sdk/transformOperations.js", (err, res) => {
      if (err) throw err;
    });
  }
  fs.writeFile("sdk/README.md", storeMarkdown.join(""), err => {
    if (err) throw err;
  });

  fs.writeFile("sdk/" + name + ".js", storeJsCodeInThisArr.join(""), err => {
    if (err) throw err;
  });
}
