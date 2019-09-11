import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--isGo": Boolean,
      "--isSwagger": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  const getPath = (arg, defaultFileName) => {
    if (arg === "-") {
      return defaultFileName;
    }
    if (arg) {
      return arg;
    }
    return undefined;
  };
  return {
    isGoGenerated: args["--isGo"] || false,
    isSwaggerGenerated: args["--isSwagger"] || false,
    jsonFilePath: getPath(args._[0], "api-docs.json"),
    jsFilePath: getPath(args._[1], "vgen.js")
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (!options.jsonFilePath) {
    console.error(
      "%s json file is required else pass minus character to look for default 'api-docs.json' file",
      chalk.red.bold("ERROR")
    );
    process.exit(1);
  }
  await createProject(options);
}
