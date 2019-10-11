import chalk from "chalk";
import fs from "fs";
import Listr from "listr";
import path from "path";
import { promisify } from "util";
import { CodePlusDocGen } from "./docgen.js";
import { ShellScriptGen } from "./shellScriptGen.js";

const access = promisify(fs.access);

export class Schedular {
  constructor(options = {}, parsedArgs = {}, other = {}) {
    this.options = { ...options };

    this.otherArgs = { ...other }

    this.parsedArgs = parsedArgs;

    this.jsonFile = options.jsonFile;

    this.jsonFileDir = path.resolve(process.cwd(), this.jsonFile);

    this.options.jsonFile = this.jsonFileDir;

    this.jsFile = options.jsFile;

    if (this.jsFile) {
      const jsFileDir = path.resolve(process.cwd(), this.jsFile);

      this.options.jsFile = jsFileDir;
    }

    this.CodeGenToUse = CodePlusDocGen;

    this.ShellScriptGen = ShellScriptGen;

    this.checkFileAccess();
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

  async generateSDK() {
    const tasks = new Listr(
      [
        {
          title: "Generating Sdk...",
          task: () =>
            new this.CodeGenToUse({
              ...this.options
            }, this.otherArgs).generateCode()
        },
        {
          title: "Generating Shell Script...",
          task: () =>
            new this.ShellScriptGen(this.parsedArgs, this.otherArgs).generateShellScript()
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
