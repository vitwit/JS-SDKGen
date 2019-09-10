const startString = `
export default class SdkGen {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async fetchApi({
    resolve,
    isFormData,
    method,
    _data,
    _url,
    _params = {},
    _pathParams = [],
    headerConfigs = {}
  }) {
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
  }
`;
const endString = `}`;
function functionSignature({ operationName, url, methodName, isFormData }) {
  return `
${operationName}({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'${url}',
      method:'${methodName}',
      _data,
      isFormData:${isFormData},
      _params,
      _pathParams
    });
  });
}
  `;
}
module.exports = {
  startString,
  endString,
  functionSignature
};
