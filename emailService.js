
import axios from "axios";

export default class Emailservice {
  constructor( headersObj ={}) {
    this.version ='1.0.0'
    this.requiredHeaders = '';
    this.optionalHeaders = '';
    this.name = "Emailservice";
    if(this.requiredHeaders){
      this.requiredHeaders.split(',').forEach(header => {
        if (Object.keys(headersObj).indexOf(header) < 0) {
          throw Error("All required header to initiate not passed");
        }
      });
    }
    this.configs = {
      baseURL: "fsk",
      headers: {
        ...headersObj,
      }
    }
    const instance = axios.create({
      ...this.configs
    });
    // get authorization on every request
    instance.interceptors.request.use(
      config => {
        if(this.optionalHeaders){
          this.optionalHeaders.split(',').forEach(header => {
            this.configs.headers[header] = this.getHeader(header);
          });
        }
        return this.configs.headers;
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
    return window.localStorage.getItem(key);
  }

  setBaseUrl(url) {
    this.configs = {
      ...this.configs,
      baseURL: url
    };
  }
  // ------All api method----

    
  createProject({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/projects',
      _data,
      _params,
    });
  }
  
  getProjects({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/projects',
      _params,
    });
  }
  
  updateProject({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/projects/{projectId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteProject({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/projects/{projectId}',
      _params,
      _pathParams,
    });
  }
  
  createTemplate({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/projects/{projectId}/templates',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getTemplate({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/projects/{projectId}/templates',
      _params,
      _pathParams,
    });
  }
  
  updateTemplate({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/templates/{templateId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteTemplates({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/templates/{templateId}',
      _params,
      _pathParams,
    });
  }
  
}
