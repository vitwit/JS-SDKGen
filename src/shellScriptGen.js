import fs from "fs";
import path from 'path';

export class ShellScriptGen {
  constructor(parsedArgs, { pkg = "js-sdkgen", ...otherArgs } = {}) {
    this.pkg = pkg;

    this.otherArgs = otherArgs;

    this.parsedArgs = parsedArgs;

    this.dirPathForGeneratedSdk = this.parsedArgs["--output"]
      ? `${this.parsedArgs["--output"]}/sdk`
      : "sdk";
  }

  convertBackParsedArgsIntoCliScript() {
    let unParsedStr = `curl ${this.parsedArgs['--base-url']}/api-doc.json -o ${path.resolve('', this.parsedArgs['--json-file'])} && ${this.pkg} `;

    Object.entries(this.parsedArgs)
      .filter(arr => arr[0] !== "_")
      .forEach(arr => {
        if (typeof arr[1] === "string") {
          if (arr[0] === '--json-file') {
            unParsedStr += arr[0] + ' ' + path.resolve('', this.parsedArgs['--json-file']) + " ";
          } else if (arr[0] === '--output') {
            unParsedStr += arr[0] + ' ' + path.resolve('', this.dirPathForGeneratedSdk) + " ";
          } else {
            unParsedStr += arr[0] + " " + arr[1] + " ";
          }
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
    const shellScript = this.convertBackParsedArgsIntoCliScript(
      this.parsedArgs
    );

    fs.writeFile(this.dirPathForGeneratedSdk + "/sdk.sh", shellScript, err => {
      if (err) {
        console.log(this.dirPathForGeneratedSdk, 'dir')

        throw err;
      }
    });
  }
}
