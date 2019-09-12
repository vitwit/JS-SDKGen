import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  let flagsArr = [];
  const paramsWithRequiredFlag = [];

  const parseArgs = argArr => {
    flagsArr = (argArr || []).filter(arg =>
      ["--isSwagger", "--isGo"].includes(arg)
    );
    const noFlagsArr = (argArr || []).filter(
      arg => !(arg.includes("--") && !arg.includes("="))
    );
    (argArr || []).forEach((arg, index) => {
      if (arg === "--required") {
        paramsWithRequiredFlag.push(
          ((argArr[index - 1] || "").split("=") || [])[0]
        );
      }
    });

    const argsObj = (noFlagsArr || []).reduce(
      (acc, current) => {
        const splitFromEqual = (current || []).split("=");
        const key = splitFromEqual[0];
        const value = splitFromEqual[1];
        return {
          ...acc,
          [key]: value
        };
      },
      { jsonFilePath: "api-docs.json" }
    );
    return argsObj;
  };
  return {
    ...parseArgs(rawArgs.slice(2)),
    paramsWithRequiredFlag,
    flags: {
      isGoGenerated: flagsArr.includes("--isGo"),
      isSwaggerGenerated: flagsArr.includes("--isSwagger")
    }
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (options.flags.isGoGenerated && options.flags.isSwaggerGenerated) {
    console.error(
      "%s you provided both flags '--isGo' and '--isSwaggerGenerated' ",
      chalk.red.bold("ERROR")
    );
    process.exit(1);
  }
  if (!options.jsonFilePath) {
    console.error(
      "%s json file is required else pass minus character to look for default 'api-docs.json' file",
      chalk.red.bold("ERROR")
    );
    process.exit(1);
  }
  await createProject(options);
}
