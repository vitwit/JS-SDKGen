
export default class SdkGen {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
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


  addPet({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/pet',
      _data,
      _params,
      _pathParams
    });
  }
  
  updatePet({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "put",
      isFormData: false,
      _url: '/pet',
      _data,
      _params,
      _pathParams
    });
  }
  
  findPetsByStatus({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/pet/findByStatus',
      _data,
      _params,
      _pathParams
    });
  }
  
  findPetsByTags({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/pet/findByTags',
      _data,
      _params,
      _pathParams
    });
  }
  
  getPetById({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/pet/{petId}',
      _data,
      _params,
      _pathParams
    });
  }
  
  updatePetWithForm({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/pet/{petId}',
      _data,
      _params,
      _pathParams
    });
  }
  
  deletePet({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "delete",
      isFormData: false,
      _url: '/pet/{petId}',
      _data,
      _params,
      _pathParams
    });
  }
  
  uploadFile({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: true,
      _url: '/pet/{petId}/uploadImage',
      _data,
      _params,
      _pathParams
    });
  }
  
  getInventory({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/store/inventory',
      _data,
      _params,
      _pathParams
    });
  }
  
  placeOrder({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/store/order',
      _data,
      _params,
      _pathParams
    });
  }
  
  getOrderById({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/store/order/{orderId}',
      _data,
      _params,
      _pathParams
    });
  }
  
  deleteOrder({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "delete",
      isFormData: false,
      _url: '/store/order/{orderId}',
      _data,
      _params,
      _pathParams
    });
  }
  
  createUser({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/user',
      _data,
      _params,
      _pathParams
    });
  }
  
  createUsersWithArrayInput({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/user/createWithArray',
      _data,
      _params,
      _pathParams
    });
  }
  
  createUsersWithListInput({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "post",
      isFormData: false,
      _url: '/user/createWithList',
      _data,
      _params,
      _pathParams
    });
  }
  
  loginUser({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/user/login',
      _data,
      _params,
      _pathParams
    });
  }
  
  logoutUser({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/user/logout',
      _data,
      _params,
      _pathParams
    });
  }
  
  getUserByName({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "get",
      isFormData: false,
      _url: '/user/{username}',
      _data,
      _params,
      _pathParams
    });
  }
  
  updateUser({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "put",
      isFormData: false,
      _url: '/user/{username}',
      _data,
      _params,
      _pathParams
    });
  }
  
  deleteUser({ _params, _pathParams, ..._data }) {
    return this.fetchApi({
      method: "delete",
      isFormData: false,
      _url: '/user/{username}',
      _data,
      _params,
      _pathParams
    });
  }
  }