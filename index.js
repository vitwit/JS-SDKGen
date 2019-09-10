const { startString, endString, functionSignature } = require("./codeStrings");
const fs = require("fs");

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function generateSDK({
  jsonFile,
  isGoGenerated,
  isSwaggerGenerated,
  transformFunction = a => a
}) {
  const storeJsCodeInThisArr = [];
  storeJsCodeInThisArr.push(startString);
  if (!isGoGenerated && !isSwaggerGenerated) {
    const formatedCode = transformFunction(jsonFile);
    formatedCode.forEach(
      ({ operationName, url, requestMethod, isFormData }) => {
        const operationFunction = functionSignature({
          operationName,
          url,
          requestMethod,
          isFormData
        });
        storeJsCodeInThisArr.push(operationFunction);
      }
    );
  }
  if (isSwaggerGenerated) {
    const tags = jsonFile.tags;
    const pathsData = jsonFile.paths;
    Object.entries(pathsData).map(path => {
      const pathName = path[0];
      Object.entries(path[1]).forEach(method => {
        const requestMethod = method[0];
        const methodData = method[1];
        const apiGroup = (methodData.tags || ["common"])[0];
        const operationName = methodData.operationId;
        const consumes = methodData.consumes || [];
        const isFormData = consumes.includes("multipart/form-data");
        const operationFunction = functionSignature({
          operationName,
          url,
          requestMethod,
          isFormData
        });
        storeJsCodeInThisArr.push(operationFunction);
      });
    });
  }
  if (isGoGenerated) {
    jsonFile.map(api => {
      const url = api.url;
      const requestMethod = api.type;
      const apiGroup = api.group;
      const operationName = camelCase(api.name);
      const isFormData =
        api.parameter &&
        api.parameter.fields &&
        Object.entries(api.parameter.fields)
          .map(arr => arr[0])
          .includes("Request formdata");
      const operationFunction = functionSignature({
        operationName,
        url,
        requestMethod,
        isFormData
      });
      storeJsCodeInThisArr.push(operationFunction);
    });
  }
  storeJsCodeInThisArr.push(endString);

  const fs = require("fs");
  fs.writeFile("apiSDK.js", storeJsCodeInThisArr.join(""), err => {
    if (err) throw err;
    console.log("done");
  });
}
module.exports = {
  generateSDK
};
