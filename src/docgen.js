import fs from "fs";
import { CodeGen } from "./codgen";
import {
  markdownStartString,
  markdownCodeBlockEnd,
  responseMarkdown,
  appendModalLink,
  operationMarkdownEnd
} from "./code-strings/docs-strings";
import { getDefinitionKey, stringifyObj, removeKeys } from "./utils";

// TODO: - right now only generating for swagger, to do for apidocjs

export class CodePlusDocGen extends CodeGen {
  constructor(...args) {
    super(...args);

    this.arrSDKDoc = [];

    this.thisOperationBodyParamsModals = [];

    this.thisOperationResponesModals = [];
  }

  whileLoopinOverJson({ operationName, responses, parameters, ...rest }) {
    super.whileLoopinOverJson({ operationName, ...rest });

    this.bodyParamsDocGenerators(parameters, operationName, this.name);

    this.responsesDocsGenerators(responses);

    this.appendModalsLinkBelowExampleIfAny();
  }

  bodyParamsDocGenerators(params = [], operationName = "", name = "") {
    // lets group body/formData params,path params and query params together
    const body = params.filter((param = {}) =>
      ["body", "formData"].includes(param.in) ? param : false
    );

    const pathParams = params.filter((param = {}) => param.in === "path");

    const qparams = params.filter((param = {}) => param.in === "query");

    //
    this.arrSDKDoc.push(markdownStartString({ operationName, name }));

    // can't destruct "in" params bcoz a reserved keyword;
    body.forEach(({ name, schema, type, ...other }) => {
      // if name is body indicates it has a params for which a modal exist in definations
      //  so we just comment meta info here and link to that modal below example code

      if (name === "body") {
        this.arrSDKDoc.push(
          `  /** ${getDefinitionKey(schema)} modal,${
            schema.type ? "type - " + schema.type + "," : ""
          } ${stringifyObj(removeKeys(other, "in"))} */`
        );

        this.thisOperationBodyParamsModals.push(getDefinitionKey(schema));
      } else {
        // else just name: type of param, stringify other info and comment // if there is a object in other info just JSON.stringify
        this.arrSDKDoc.push(
          ` ${name}:${type}, /** ${stringifyObj({
            ...removeKeys(other, "in")
          })} */\n`
        );
      }
    });

    if (pathParams.length) {
      this.arrSDKDoc.push("  _pathParams: {\n");

      pathParams.forEach(({ name, type, ...other }) => {
        this.arrSDKDoc.push(
          `   ${name}:${type}, /** ${stringifyObj({
            ...removeKeys(other, "in")
          })} */ \n`
        );
      });

      this.arrSDKDoc.push("  }");
    }

    if (qparams.length) {
      this.arrSDKDoc.push("  _params: {\n");

      qparams.forEach(({ name, type, ...other }) => {
        this.arrSDKDoc.push(
          `   ${name}:${type}, /** ${stringifyObj({
            ...removeKeys(other, "in")
          })} */ \n`
        );
      });

      this.arrSDKDoc.push("  }");
    }

    this.arrSDKDoc.push(markdownCodeBlockEnd());
  }

  responsesDocsGenerators(responses) {
    const twoXX = {};

    const fourXX = {};

    const fiveXX = {};

    const defaultResponse = {};

    Object.keys(responses).forEach(key => {
      if (responses[key] && responses[key].schema) {
        this.thisOperationResponesModals.push(
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

    this.arrSDKDoc.push(
      `\n**Responses**\n
          `
    );

    if (Object.keys(defaultResponse).length) {
      this.arrSDKDoc.push(
        responseMarkdown({ resCode: "Default", json: defaultResponse })
      );
    }

    if (Object.keys(twoXX).length) {
      this.arrSDKDoc.push(
        responseMarkdown({ resCode: "Success 2XX", json: twoXX })
      );
    }

    if (Object.keys(fourXX).length) {
      this.arrSDKDoc.push(
        responseMarkdown({ resCode: "Error 4XX", json: fourXX })
      );
    }

    if (Object.keys(fiveXX).length) {
      this.arrSDKDoc.push(
        responseMarkdown({ resCode: "Error 5XX", json: fiveXX })
      );
    }
  }

  appendModalsLinkBelowExampleIfAny() {
    const thisOperationsModals = [
      ...this.thisOperationBodyParamsModals,
      ...this.thisOperationResponesModals
    ];

    if (thisOperationsModals.length) {
      this.arrSDKDoc.push("\n###### ");

      thisOperationsModals.forEach(a =>
        this.arrSDKDoc.push(appendModalLink(a))
      );
    }

    this.arrSDKDoc.push(operationMarkdownEnd());
  }

  addModalDefinitionsForSwagger() {
    const definitions = this.parsedJson.definitions;

    this.arrSDKDoc.push("\n# Modal Definations\n");

    Object.keys(definitions).forEach(key => {
      this.arrSDKDoc.push(
        `\n ### ${key}-modal\n \`\`\`json\n${JSON.stringify(
          definitions[key],
          null,
          2
        )}\n\`\`\`\n`
      );
    });
  }

  generateCode() {
    super.generateCode();

    if (this.isSwaggerGenerated) {
      this.addModalDefinitionsForSwagger();
    }

    // Save the documentation to README.md file inside sdk folder
    fs.writeFile(
      this.dirPathForGeneratedSdk + "/README.md",
      this.arrSDKDoc.join(""),
      err => {
        if (err) {
          throw err;
        }
      }
    );
  }
}
