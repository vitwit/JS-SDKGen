import chalk from "chalk";
import arg from "arg";
import { createProject } from "./main";
import { printManPage } from "./utils";

/**
 *
 *
 * @param {*} rawArgs
 * @returns
 */
function parseArgumentsIntoOptions(rawArgs) {
  let args;

  try {
    args = arg({
      // Types
      "--json-file": String, // --jsonFile <string> or --jsonFile=<string>
      "--version": String,
      "--js-file": String,
      "--name": String,
      "--base-url": String,
      "--required-headers": [String],
      "--optional-headers": [String],
      "--help": Boolean,
      // Aliases
      "-f": "--json-file",
      "-j": "--js-file",
      "-v": "--version",
      "-b": "--base-url",
      "-o": "--optional-headers",
      "-r": "--required-headers",
      "-n": "--name"
    });
  } catch (err) {
    if (err.code === "ARG_UNKNOWN_OPTION") {
      console.log(
        `
      %s ${err.message}
      `,
        chalk.red.bold("ERROR")
      );

      process.exit(1);
    } else {
      throw err;
    }
  }

  if (args["--help"]) {
    printManPage();

    process.exit(1);
  }

  return {
    requiredHeaders: args["--required-headers"],
    optionalHeaders: args["--optional-headers"],
    name: args["--name"],
    baseUrl: args["--base-url"],
    version: args["--version"],
    jsonFile: args["--json-file"],
    jsFile: args["--js-file"]
  };
}

/**
 *
 *
 * @export
 * @param {*} args
 */
export async function cli(args) {
  const options = parseArgumentsIntoOptions(args);

  if (!options.jsonFile) {
    console.error("%s --json-file is required", chalk.red.bold("ERROR"));

    process.exit(1);
  }

  await createProject(options);
}
