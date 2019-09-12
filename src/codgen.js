import chalk from "chalk";
import fs from "fs";
import { stringOne, functionSignature, endString } from "./codeStrings";
import {
  extractPathParams,
  toCamelCase,
  toTitleCase,
  notEmptyObj
} from "./utils";
export function generateSDK({
  jsonFile,
  jsonFilePath,
  jsFilePath,
  isGoGenerated,
  isSwaggerGenerated,
  transformJson = a => a,
  transformOperations = {},
  baseUrl = "",
  name = "yournameSDK",
  version,
  requiredHeaders,
  optionalHeaders
}) {
  let _jsonFile = jsonFile;
  let _name = toTitleCase(name);
  //reading through cli will only have absolute path
  if (jsonFilePath) {
    _jsonFile = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  }

  let _transformJson = transformJson;
  let _transformOperations = transformOperations;
  if (jsFilePath) {
    const { transformJson, transformOperations } = require(jsFilePath);
    _transformJson = transformJson;
    _transformOperations = transformOperations;
  }
  const storeJsCodeInThisArr = [];
  storeJsCodeInThisArr.push(
    stringOne({
      version,
      sdkName: _name,
      baseUrl,
      requiredHeaders,
      optionalHeaders
    })
  );

  try {
    if (!isGoGenerated && !isSwaggerGenerated) {
      const formatedCode = _transformJson(_jsonFile);
      formatedCode.forEach(
        ({ operationName, url, requestMethod, isFormData }) => {
          const operationFunction = functionSignature({
            hasPathParams: extractPathParams(url).length,
            operationName,
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
          const operationFunction = functionSignature({
            hasPathParams: extractPathParams(url).length,
            operationName,
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
          url,
          requestMethod: requestMethod.toUpperCase(),
          isFormData
        });
        storeJsCodeInThisArr.push(operationFunction);
      });
    }
  } catch (err) {
    if (!(isGoGenerated && isSwaggerGenerated) && !jsFilePath) {
      console.error(
        "%s you have not provided isGo or isSwagger,for that you should provide 'vgen.js' to transform json file if it already not is desired formate, read docs",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    } else if (!(isGoGenerated && isSwaggerGenerated) && jsFilePath) {
      console.error(
        "%s transformJson function from you 'vgen.js' is probably not returning desired json format",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    } else {
      console.log(err);
      console.error("%s error in json", chalk.red.bold("ERROR"));
      process.exit(1);
    }
  }
  storeJsCodeInThisArr.push(endString);

  fs.writeFile(name + ".js", storeJsCodeInThisArr.join(""), err => {
    if (err) throw err;
  });
}
