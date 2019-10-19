import { toTitleCase, getTransformResString } from "../utils";

export const stringOne = ({
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
  transformOperations
    ? "import { transformOperations } from './transformOperations'"
    : ""
}

export default class ${toTitleCase(sdkName)} {
  constructor( headersObj ={}) {${
    version ? "\n    this.version =" + "'" + version + "'" : ""
  }
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
            if(this.getHeader(header)){
            this.configs.headers[header] = this.getHeader(header);
            }
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
    data = {},
    _url,
    transformResponse
  }) {
    const { _params = {}, _pathParams = {}, ..._data } = data;
    // eslint-disable-next-line
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
  // intercept response
  interceptResponse(cb) {
    // just want to make user provide only one callback,so merging two callbacks
    const cb1 = r => cb(r);
    const cb2 = e => cb(undefined, e);
    this.axiosInstance.interceptors.response.use(cb1, cb2);
  }

  interceptRequest(cb) {
    // first we need to eject the callback we are already using

    this.axiosInstance.interceptors.request.eject(this.requestInterceptor);
    const cb1 = c => cb(c, undefined);
    const cb2 = e => cb(undefined, e);
    this.requestInterceptor = this.axiosInstance.interceptors.request.use(
      cb1,
      cb2
    );
  }


  // utils method for sdk class
  setHeader(key, value) {
    // Set optional header
    this.configs.header[key] = value;

    // storing in local storage to retrieve after reloads
    // if you are managing refresh token and just storing token in memory
    // than instead of using set Headers, just use interceptRequest and interceptResponse methods
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

export function functionSignature({
  hasPathParams,
  operationName,
  transformResponse,
  url,
  requestMethod,
  isFormData
}) {
  return `
  ${operationName}(data) {
    return this.fetchApi({
      method: "${requestMethod}",${
    isFormData ? "\n      isFormData: true," : ""
  }
      _url: '${url}',
      data,${transformResponse ? getTransformResString(operationName) : ""}
    });
  }
  `;
}

export const endString = `
}
`;
