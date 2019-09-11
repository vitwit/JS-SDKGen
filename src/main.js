import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import gitignore from "gitignore";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { projectInstall } from "pkg-install";
import { promisify } from "util";

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);
const { generateSDK } = require("./gen.js");

async function generateJs(options) {
  generateSDK(options);
}

export async function createProject(options) {
  options = {
    ...options
  };
  const jsonFilePath = options.jsonFilePath;
  const jsFilePath = options.jsFilePath;
  const jsonFileDir = path.resolve(
    new URL(import.meta.url).pathname,
    "../../",
    jsonFilePath
  );
  options.jsonFilePath = jsonFileDir;
  let jsFileDir;
  if (options.jsFilePath) {
    jsFileDir = path.resolve(
      new URL(import.meta.url).pathname,
      "../../",
      jsFilePath
    );
  }
  options.jsFilePath = jsFileDir;
  try {
    await access(jsonFileDir, fs.constants.R_OK);
    if (jsFileDir) {
      await access(jsFileDir, fs.constants.R_OK);
    }
  } catch (err) {
    console.log(jsonFilePath, chalk.yellow.bold("json file path"));
    if (jsFilePath === "vgen.js") {
      console.error(
        "%s vgen.js does not exist in root of this directory or invalid",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    }
    if (jsonFilePath === "api-docs.json") {
      console.error(
        "api-docs.json does not exist in root of this directory or invalid",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    }
    console.log(err);
    console.error("%s file is invalid", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: "Generating Sdk...",
        task: () => generateJs(options)
      }
    ],
    {
      exitOnError: false
    }
  );

  await tasks.run();
  console.log("%s file generated", chalk.green.bold("DONE"));
  return true;
}
false;
