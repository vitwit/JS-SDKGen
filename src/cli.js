import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  console.log(rawArgs.slice(2), "rawArgs");

  const parseArgs = argArr => {
    const knownArgs = (argArr || []).filter(
      param =>
        param.includes("jsFile") ||
        param.includes("jsonFile") ||
        param.includes("version") ||
        param.includes("name")
    );
    const unKnownArgs = (argArr || []).filter(
      arg => knownArgs.indexOf(arg) < 0
    );
  };
  return {};

  // return {
  //   isGoGenerated: args["--isGo"] || false,
  //   isSwaggerGenerated: args["--isSwagger"] || false,
  //   ...parseArgs(args._)
  // };
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
