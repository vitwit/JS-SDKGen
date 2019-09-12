
import axios from "axios";

export default class Yash {
  constructor( headersObj ={}) {
    this.requiredHeaders = 'api,param1';
    this.optionalHeaders = 'id';
    this.requiredHeaders.split(',').forEach(header => {
      if (Object.keys(headersObj).indexOf(header) < 0) {
        throw Error("All required header to initiate not passed");
      }
    });
    this.name = "Yash";
    this.configs = {
      baseURL: "https://google.com",
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
        this.optionalHeaders.split(',').forEach(header => {
          this.configs.headers[header] = this.getHeader(header);
        });

        return this.config.headers;
      },
      error => {
        return Promise.reject(error);
      }
    );
    this.axiosInstance = instance;
  }
  
  fetchApi({
    resolve,
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
  setHeader(key, value) {
    //Set optional header
    this.configs.header[key] = value;

    window.localStorage.setItem(key, value);
  }

  getHeader(key) {
    return window.localStorage.getItem(key);
  }

    setBaseUrl(url) {
      this.configs = {
        ...this.configs,
        baseURL: url
      };
    }
    
  addPet({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/pet',
      _data,
      _params,
    });
  }
  
  updatePet({ _params,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/pet',
      _data,
      _params,
    });
  }
  
  findPetsByStatus({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/pet/findByStatus',
      _params,
    });
  }
  
  findPetsByTags({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/pet/findByTags',
      _params,
    });
  }
  
  getPetById({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/pet/{petId}',
      _params,
      _pathParams,
    });
  }
  
  updatePetWithForm({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/pet/{petId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deletePet({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/pet/{petId}',
      _params,
      _pathParams,
    });
  }
  
  uploadFile({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/pet/{petId}/uploadImage',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getInventory({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/store/inventory',
      _params,
    });
  }
  
  placeOrder({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/store/order',
      _data,
      _params,
    });
  }
  
  getOrderById({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/store/order/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  deleteOrder({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/store/order/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  createUser({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/user',
      _data,
      _params,
    });
  }
  
  createUsersWithArrayInput({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/user/createWithArray',
      _data,
      _params,
    });
  }
  
  createUsersWithListInput({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/user/createWithList',
      _data,
      _params,
    });
  }
  
  loginUser({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/user/login',
      _params,
    });
  }
  
  logoutUser({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/user/logout',
      _params,
    });
  }
  
  getUserByName({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/user/{username}',
      _params,
      _pathParams,
    });
  }
  
  updateUser({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/user/{username}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteUser({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/user/{username}',
      _params,
      _pathParams,
    });
  }
  
}
