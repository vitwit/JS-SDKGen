
/**
 *
 *
 * @param {*} {
 *   sdkName,
 *   version,
 *   baseUrl,
 *   requiredHeaders,
 *   optionalHeaders,
 *   transformOperations
 * }
 * @returns
 */
const stringOne = ({
  sdkName,
  version,
  baseUrl,
  requiredHeaders,
  optionalHeaders,
  transformOperations
}) => {
  return `
import axios from "axios";
${
    transformOperations ?
      "import { transformOperations } from './transformOperations'"
      : ""
    }

export default class ${sdkName} {
  constructor( headersObj ={}) {${
    version ? "\n    this.version =" : ""
    }'${version}'
    this.requiredHeaders = '${requiredHeaders}';
    this.optionalHeaders = '${optionalHeaders}';
    this.name = "${sdkName}";

    if(this.requiredHeaders){
      this.requiredHeaders.split(',').forEach(header => {
        if (Object.keys(headersObj).indexOf(header) < 0) {
          throw Error("All required header to initiate not passed");
        }
      });
    }

    this.configs = {
      baseURL: "${baseUrl}",
      headers: {
        ...headersObj,
      }
    }

    const instance = axios.create({
      ...this.configs
    });

    // get authorization on every request
    instance.interceptors.request.use(
      configs => {
        if(this.optionalHeaders){
          this.optionalHeaders.split(',').forEach(header => {
            this.configs.headers[header] = this.getHeader(header);
          });
        }
        configs.headers = this.configs.headers
        configs.baseURL = this.configs.baseURL

        return configs
      },
      error => Promise.reject(error)
    );

    this.axiosInstance = instance;
  }
  
  fetchApi({
    isFormData,
    method,
    _data,
    _url,
    _params = {},
    transformResponse,
    _pathParams = [],
    headerConfigs = {}
  }) {
    return new Promise(async resolve => {
      const obj = {
        error: null,
        data: null
      };

      let data = _data;

      if (isFormData) {
        const formdata = new FormData();
        Object.entries(_data).forEach(arr => {
          formdata.append(arr[0], arr[1]);
        });
        data = formdata;
      }
      let url = _url;
      if (Object.keys(_pathParams).length) {
        Object.entries(_pathParams).forEach(
          arr => (url = url.replace("{" + arr[0] + "}", arr[1]))
        );
      }
      try {
        const resObj = await this.axiosInstance({
          url,
          method,
          data,
          ...(transformResponse ? { transformResponse } : {}),
          ...(Object.keys(_params).length ? { params: _params } : {}),
          ...(isFormData
            ? {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            : {})
        });
        obj.data = resObj.data;
        resolve(obj);
      } catch (error) {
        if (error.response) {
          obj.error = error.response.data;
        } else if (error.request) {
          obj.error = error.request;
        } else {
          obj.error = error.message;
        }
        resolve(obj);
      }
    });
  }

  // --utils method for sdk class
  setHeader(key, value) {
    // Set optional header
    this.configs.header[key] = value;
    window.localStorage.setItem(key, value);
  }

  // eslint-disable-next-line
  getHeader(key) {
    //Get header method
    //Helps to check if the required header is present or not
    return window.localStorage.getItem(key);
  }
  
  // --utils method for sdk class
  clearHeader(key) {
    // Clear optional header
    this.configs.header[key] = '';
    window.localStorage.removeItem(key);
  }

  setBaseUrl(url) {
    //Set BaseUrl
    //Helps when we require to change the base url, without modifying the sdk code

    this.configs = {
      ...this.configs,
      baseURL: url
    };
  }
  // ------All api method----

    `;
};

const getTransformResString = key =>
  `\n      transformResponse:transformOperations['${key}'],`;

function functionSignature({
  hasPathParams,
  operationName,
  transformResponse,
  url,
  requestMethod,
  isFormData
}) {
  return `
  ${operationName}({ _params,_pathParams,${
    requestMethod === "PUT" || requestMethod === "POST" ? "..._data" : ""
    } } = {}) {
    return this.fetchApi({
      method: "${requestMethod}",${
    isFormData ? "\n      isFormData: true," : ""
    }
      _url: '${url}',${
    requestMethod === "PUT" || requestMethod === "POST" ? "\n      _data," : ""
    }
      _params,${hasPathParams ? "\n      _pathParams," : ""}${
    transformResponse ? getTransformResString(operationName) : ""
    }
    });
  }
  `;
}

const endString = `
}
`;

export { stringOne, functionSignature, endString };

//MARKDOWN
export const markdownStartString = ({ name, operationName }) => `
<details>

<summary>${operationName}</summary>

${operationName}
---
 **Example**

 \`\`\`js
 const  { data, error } = await name.${operationName}({
`;

export const markdownCodeBlockEnd = () => `
})
\`\`\``;

export const appendModalLink = modal => ` [${modal}](###${modal}-modal) `;

export const operationMarkdownEnd = () => `
</details>
`;

export const responseMarkdown = ({ resCode, json }) =>
  `\n> ${resCode}\n\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\`\n`;
