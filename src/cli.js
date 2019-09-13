import chalk from "chalk";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  let flagsArr = []; // --isSwagger and --isGo
  let headerParams = []; // any param after --headers
  let requiredHeaders = []; // i.e --headers appid=true,
  let optionalHeaders = [];
  let othersArgs = {}; // all params before --headers except flags

  const parseArgs = argArr => {
    // here push complete "param=valueifany", later we modify this array to have only param, because value is just to know if it a required field
    headerParams =
      argArr.indexOf("--headers") >= 0
        ? argArr.splice(argArr.indexOf("--headers") + 1)
        : [];

    flagsArr = (argArr || []).filter(arg =>
      ["--isSwagger", "--isGo"].includes(arg)
    );

    const otherParams = (argArr || []).filter((arg, index) =>
      argArr.indexOf("--headers") === -1
        ? true
        : index < argArr.indexOf("--headers") && !arg.includes("--")
    );
    // get required fields
    headerParams.forEach((arg, index) => {
      const splitted = headerParams[index].split("=");
      if (splitted[1]) {
        requiredHeaders.push(splitted[0]);
      }
    });
    // keep only params remove value
    headerParams = headerParams.map(arg => arg.split("=")[0]);
    optionalHeaders = headerParams.filter(
      arg => requiredHeaders.indexOf(arg) < 0
    );

    // make a key-value obj of all other params before --headers
    othersArgs = (otherParams || []).reduce(
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
  };
  parseArgs(rawArgs.slice(2));

  return {
    ...othersArgs,
    requiredHeaders,
    optionalHeaders,
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
