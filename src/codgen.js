import chalk from "chalk";
import fs from "fs";
import {
  extractPathParams,
  toCamelCase,
  toTitleCase,
  isApidocJs,
  isSwaggerJson
} from "./utils";
import cp from "cp";
import {
  stringOne,
  endString,
  functionSignature
} from "./code-strings/sdk-strings";

export class CodeGen {
  constructor({
    jsonFile,
    jsFile,
    baseUrl = "",
    name = "yournameSDK",
    version,
    requiredHeaders = [],
    optionalHeaders = [],
    rawCliArgs,
    output,
    //
    apiMethodSignatureString = functionSignature,
    sdkClassStartString = stringOne,
    sdkClassEndString = endString
  }) {
    this.jsonFilePath = jsonFile;

    this.jsFilePath = jsFile;

    this.baseUrl = baseUrl;

    this.name = toTitleCase(name);

    this.version = version;

    this.requiredHeaders = requiredHeaders;

    this.optionalHeaders = optionalHeaders;

    this.rawCliArgs = rawCliArgs;

    this.parsedJson = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

    this.transformJson = a => a;

    if (jsFile) {
      const { transformOperations, transformJson } = require(jsFile);

      this.transformJson = transformJson;

      this.transformOperations = transformOperations;
    }

    this.isSwaggerGenerated = isSwaggerJson(this.parsedJson);

    this.isApiDocGenerated = isApidocJs(this.parsedJson);

    this.isOurKindJson = !(isSwaggerJson && this.isGoGenerated);

    this.apiMethodSignatureString = apiMethodSignatureString;

    this.sdkClassStartString = sdkClassStartString;

    this.sdkClassEndString = sdkClassEndString;

    this.generatedJsCodeStrings = [];

    // ahh, just to reuse
    this.sdkClassStartStringParams = {
      version,
      sdkName: this.name,
      baseUrl,
      transformOperations: !!this.transformOperations,
      requiredHeaders,
      optionalHeaders
    };

    //
    this.dirPathForGeneratedSdk = output ? output + "/sdk" : "sdk";
  }

  justBeforeLoopingOverJson() {
    this.generatedJsCodeStrings.push(
      this.sdkClassStartString(this.sdkClassStartStringParams)
    );
  }

  whileLoopinOverJson(apiMethodDetailsWeKnowAhead) {
    this.generatedJsCodeStrings.push(
      this.apiMethodSignatureString(apiMethodDetailsWeKnowAhead)
    );
  }

  justAfterLoopingOverJson() {
    this.generatedJsCodeStrings.push(this.sdkClassEndString);
  }

  boomBoomGenerateTheFiles() {
    if (!fs.existsSync(this.dirPathForGeneratedSdk)) {
      console.log("directory not exist");

      fs.mkdirSync(this.dirPathForGeneratedSdk);
    }

    if (this.jsFilePath) {
      cp(
        this.jsFilePath,
        this.dirPathForGeneratedSdk + "/transformOperations.js",
        (err, res) => {
          if (err) throw err;
        }
      );
    }

    fs.writeFile(
      this.dirPathForGeneratedSdk + "/" + toCamelCase(this.name) + ".js",
      this.generatedJsCodeStrings.join(""),
      err => {
        if (err) throw err;
      }
    );
  }

  loopOverJsonIfNotInSwaggerAndApidocjsFormat() {
    // if a formatter function passed down to format json
    const formatedJson = this.transformJson(this.parsedJson);

    this.justBeforeLoopingOverJson();

    formatedJson.forEach(
      ({ operationName, url, requestMethod, isFormData }) => {
        const apiMethodDetailsWeKnowAhead = {
          operationName,
          transformResponse:
            this.transformOperations && this.transformOperations[operationName],
          url,
          requestMethod: requestMethod.toUpperCase(),
          isFormData
        };

        this.whileLoopinOverJson(apiMethodDetailsWeKnowAhead);
      }
    );

    this.justAfterLoopingOverJson();
  }

  loopOverIfSwaggerGenerated() {
    const pathsData = this.parsedJson.paths || {};

    this.justBeforeLoopingOverJson(); // ok

    Object.entries(pathsData).map(path => {
      const url = path[0];

      const httpVerbs = [
        "put",
        "post",
        "get",
        "delete",
        "head",
        "options",
        "patch",
        "connect",
        "trace"
      ];

      Object.entries(path[1])
        .filter(arr => httpVerbs.indexOf(arr[0].toLowerCase()) > -1)
        .forEach(method => {
          const requestMethod = method[0];

          const methodData = method[1];

          const operationName = methodData.operationId;

          const consumes = methodData.consumes || [];

          const isFormData = consumes.includes("multipart/form-data");

          const apiMethodDetailsWeKnowAhead = {
            operationName,
            transformResponse:
              this.transformOperations &&
              this.transformOperations[operationName],
            url,
            requestMethod: requestMethod.toUpperCase(),
            isFormData,
            parameters: methodData.parameters,
            responses: methodData.responses
          };

          this.whileLoopinOverJson(apiMethodDetailsWeKnowAhead);
        });
    });

    this.justAfterLoopingOverJson();
  }

  loopOverIfApidocJsGenerated() {
    this.justBeforeLoopingOverJson();

    this.parsedJson.map(api => {
      const url = api.url;

      const requestMethod = api.type;

      const operationName = toCamelCase(api.name);

      const isFormData =
        api.parameter &&
        api.parameter.fields &&
        Object.entries(api.parameter.fields)
          .map(arr => arr[0])
          .includes("Request formdata"); // TODO: this need to standardize bcoz user can group them by any name;

      const apiMethodDetailsWeKnowAhead = {
        hasPathParams: extractPathParams(url).length,
        operationName,
        transformResponse:
          this.transformOperations && this.transformOperations[operationName],
        url,
        requestMethod: requestMethod.toUpperCase(),
        isFormData
      };

      this.whileLoopinOverJson(apiMethodDetailsWeKnowAhead);
    });

    this.justBeforeLoopingOverJson();
  }

  generateCode() {
    try {
      if (this.isOurKindJson) {
        this.loopOverJsonIfNotInSwaggerAndApidocjsFormat();
      }

      if (this.isSwaggerGenerated) {
        this.loopOverIfSwaggerGenerated();
      }

      if (this.isApiDocGenerated) {
        this.loopOverIfApidocJsGenerated();
      }

      this.boomBoomGenerateTheFiles();
    } catch (err) {
      console.log(err);

      if (this.isOurKindJson) {
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
  }
}
