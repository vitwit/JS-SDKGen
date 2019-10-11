import fs from "fs";

export class ShellScriptGen {
  constructor(parsedArgs, { pkg = "js-sdkgen", ...otherArgs } = {}) {
    this.pkg = pkg;

    this.otherArgs = otherArgs;

    this.parsedArgs = parsedArgs;

    this.dirPathForGeneratedSdk = this.otherArgs['--output'] ? `${this.otherArgs['--output']}/sdk` : 'sdk'
  }

  convertBackParsedArgsIntoCliScript() {
    let unParsedStr = `${this.pkg} `;

    Object.entries(this.parsedArgs)
      .filter(arr => arr[0] !== "_")
      .forEach(arr => {
        if (typeof arr[1] === "string") {
          unParsedStr += arr[0] + " " + arr[1] + " ";
        } else {
          unParsedStr += arr[0] + " ";

          (arr[1] || []).forEach(str => {
            unParsedStr += str + " ";
          });
        }
      });

    return unParsedStr;
  }

  generateShellScript() {
    const shellScript = this.convertBackParsedArgsIntoCliScript(this.parsedArgs)

    fs.writeFile(
      this.dirPathForGeneratedSdk + "/sdk.sh",
      shellScript,
      err => {
        if (err) {
          throw err;
        }
      }
    );
  }
}
