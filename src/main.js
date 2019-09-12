import chalk from "chalk";
import fs from "fs";
import Listr from "listr";
import path from "path";
import { promisify } from "util";
const access = promisify(fs.access);
const { generateSDK } = require("./codgen.js");

async function generateJs({
  flags,
  requiredHeaders = [],
  optionalHeaders = [],
  ...options
}) {
  generateSDK({
    ...flags,
    ...options,
    optionalHeaders,
    requiredHeaders
  });
}

export async function createProject(options) {
  options = {
    ...options
  };

  const jsonFilePath = options.jsonFilePath;
  const jsFilePath = options.jsFilePath;
  const jsonFileDir = path.resolve(jsonFilePath);

  options.jsonFilePath = jsonFileDir;
  let jsFileDir;

  if (options.jsFilePath) {
    jsFileDir = path.resolve(jsFilePath);
  }
  options.jsFilePath = jsFileDir;

  try {
    await access(jsonFileDir, fs.constants.R_OK);
    if (jsFileDir) {
      await access(jsFileDir, fs.constants.R_OK);
    }
  } catch (err) {
    if (jsonFilePath === "api-docs.json") {
      console.error(
        "api-docs.json does not exist in root of this directory or invalid",
        chalk.red.bold("ERROR")
      );
      process.exit(1);
    }
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
  console.log(
    `%s ${
      options.name ? options.name + ".js" : ""
    } file generated successfully`,
    chalk.green.bold("DONE")
  );
  return true;
}
