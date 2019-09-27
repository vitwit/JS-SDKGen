import chalk from "chalk";
import fs from "fs";
import Listr from "listr";
import path from "path";
import { promisify } from "util";
import {
  stringOne as sdkClassStartString,
  endString as sdkClassEndString,
  functionSignature as apiMethodSignatureString
} from "./code-strings/sdk-strings";
import { CodePlusDocGen } from "./docgen.js";
import { CodeGen } from "./codgen";

const access = promisify(fs.access);

class Schedular {
  constructor(options) {
    this.options = { ...this.options };

    this.jsonFile = options.jsonFile;

    this.jsonFileDir = path.resolve(process.cwd(), this.jsonFile);

    this.options.jsonFile = this.jsonFileDir;

    this.jsFile = options.jsFile;

    if (this.jsFile) {
      const jsFileDir = path.resolve(process.cwd(), this.jsFile);

      this.options.jsFile = jsFileDir;
    }
  }

  async checkFileAccess() {
    try {
      await access(this.jsonFileDir, fs.constants.R_OK);

      if (this.jsFile) {
        await access(this.jsFile, fs.constants.R_OK);
      }
    } catch (err) {
      console.error(
        "%s does not exist or invalid or no permission to read",
        chalk.red.bold("ERROR")
      );

      process.exit(1);
    }
  }

  // will just overide this function to use CodeGen or CodePlusDocGen or anythings
  queueCodeGenerationTask() {
    this.checkFileAccess();

    return new CodePlusDocGen({
      ...this.options,
      apiMethodSignatureString,
      sdkClassStartString,
      sdkClassEndString
    }).generateCode()
  }

  async generateSDK() {
    const tasks = new Listr(
      [
        {
          title: "Generating Sdk...",
          task: () => this.queueCodeGenerationTask()
        }
      ],
      {
        exitOnError: false
      }
    );

    await tasks.run();

    console.log(
      `
      %s sdk folder generated successfully with required files
      `,
      chalk.green.bold("DONE")
    );

    return true;
  }
}

export {
  Schedular,
  CodeGen,
  CodePlusDocGen
}
