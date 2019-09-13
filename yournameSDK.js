
import axios from "axios";

export default class Yournamesdk {
  constructor( headersObj ={}) {
    this.requiredHeaders = '';
    this.optionalHeaders = '';
    this.requiredHeaders.split(',').forEach(header => {
      if (Object.keys(headersObj).indexOf(header) < 0) {
        throw Error("All required header to initiate not passed");
      }
    });
    this.name = "Yournamesdk";
    this.configs = {
      baseURL: "",
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
    
  register({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/register',
      _data,
      _params,
    });
  }
  
  googleRegister({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/google/register',
      _data,
      _params,
    });
  }
  
  facebookRegister({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/facebook/register',
      _data,
      _params,
    });
  }
  
  completeRegister({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/register/update',
      _data,
      _params,
    });
  }
  
  login({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/login',
      _data,
      _params,
    });
  }
  
  validateMobileOTP({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/login/validateotp',
      _data,
      _params,
    });
  }
  
  resendOTP({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/login/resendotp',
      _data,
      _params,
    });
  }
  
  me({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/auth/me',
      _params,
    });
  }
  
  forgotPassword({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/forgot-password',
      _data,
      _params,
    });
  }
  
  validatePasswordOTP({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/forgot-password/validateotp',
      _data,
      _params,
    });
  }
  
  resendPasswordOTP({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/forgot-password/resendotp',
      _data,
      _params,
    });
  }
  
  resetPassword({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/reset-password',
      _data,
      _params,
    });
  }
  
  deleteUser({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/delete',
      _data,
      _params,
    });
  }
  
  refreshToken({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/auth/token/refresh',
      _data,
      _params,
    });
  }
  
  startChat({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/chat/start',
      _data,
      _params,
    });
  }
  
  startGroupChatForClass({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/chat/group/class/:classId/start',
      _data,
      _params,
    });
  }
  
  addStudentToClassChatGroup({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/chat/group/class/:classId/channel/:channelId/add',
      _data,
      _params,
    });
  }
  
  getClassGroupStudentsList({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/chat/group/class/:classId/channel/:channelId/students',
      _params,
    });
  }
  
  startGroupChatForMatch({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/chat/group/match/:matchId/start',
      _data,
      _params,
    });
  }
  
  addStudentToMatchChatGroup({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/chat/group/match/:matchId/channel/:channelId/add',
      _data,
      _params,
    });
  }
  
  getMatchGroupStudentsList({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/chat/group/match/:matchId/channel/:channelId/students',
      _params,
    });
  }
  
  getChatList({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/chat/list',
      _params,
    });
  }
  
  deleteChat({ _params, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/chat/channel/:channelId',
      _params,
    });
  }
  
  getMessages({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/chat/channel/:channelId',
      _params,
    });
  }
  
  addDiscussion({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/discussion',
      _data,
      _params,
    });
  }
  
  viewMedia({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/discussion/content/{fileName}',
      _params,
      _pathParams,
    });
  }
  
  getDiscussions({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/discussion/{classId}',
      _params,
      _pathParams,
    });
  }
  
  getPostDetails({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/discussion/post/{postId}',
      _params,
      _pathParams,
    });
  }
  
  updatePostDetails({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/discussion/post/{postId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deletePost({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/discussion/post/{postId}',
      _params,
      _pathParams,
    });
  }
  
  likePost({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/discussion/post/{postId}/like',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getLikes({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/discussion/post/{postId}/like',
      _params,
      _pathParams,
    });
  }
  
  dislikePost({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/discussion/post/{postId}/dislike',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sharePost({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/discussion/post/{postId}/share',
      _data,
      _params,
      _pathParams,
    });
  }
  
  commentPost({ _params,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/discussion/comment',
      _data,
      _params,
    });
  }
  
  deleteComment({ _params, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/discussion/comment',
      _params,
    });
  }
  
  getComments({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/discussion/post/{postId}/comment',
      _params,
      _pathParams,
    });
  }
  
  sendRequest({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/friend/sendRequest',
      _data,
      _params,
    });
  }
  
  acceptRequest({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/friend/{requestId}/acceptRequest',
      _data,
      _params,
      _pathParams,
    });
  }
  
  acceptRequest({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/friend/{requestId}/deleteRequest',
      _params,
      _pathParams,
    });
  }
  
  getFriends({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/friend/list',
      _params,
    });
  }
  
  getPendingSentRequests({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/friend/pending/sent',
      _params,
    });
  }
  
  getPendingReceivedRequests({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/friend/pending/received',
      _params,
    });
  }
  
  getClassFriends({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/friend/class/{classId}',
      _params,
      _pathParams,
    });
  }
  
  createMatch({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/match',
      _data,
      _params,
    });
  }
  
  getMatchDetails({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/match/{matchId}',
      _params,
      _pathParams,
    });
  }
  
  editMatch({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/match/{matchId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteMatch({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/match/{matchId}',
      _params,
      _pathParams,
    });
  }
  
  joinMatch({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/match/{matchId}/join',
      _params,
      _pathParams,
    });
  }
  
  getAllMatches({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/match/all',
      _data,
      _params,
    });
  }
  
  getAttendees({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/match/{matchId}/attendees',
      _params,
      _pathParams,
    });
  }
  
  inviteUsers({ _params,_pathParams,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/match/{matchId}/invite',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getInvitedMatches({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/match/user/invites',
      _params,
    });
  }
  
  getUniversity({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/university',
      _params,
    });
  }
  
  createAd({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/university/ad',
      _data,
      _params,
    });
  }
  
  getAd({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/university/ad',
      _params,
    });
  }
  
  getUserDetails({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/users',
      _params,
    });
  }
  
  joinClass({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/join',
      _data,
      _params,
    });
  }
  
  getClasses({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/classes/join',
      _params,
    });
  }
  
  getAllClasses({ _params, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/classes',
      _params,
    });
  }
  
  removeClass({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/classes/remove',
      _data,
      _params,
    });
  }
  
  updateProfile({ _params,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/update/profile',
      _data,
      _params,
    });
  }
  
  updateProfilePic({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/users/update/profile',
      _data,
      _params,
    });
  }
  
  updateMatch({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/update/match',
      _data,
      _params,
    });
  }
  
  deleteAccount({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/delete',
      _data,
      _params,
    });
  }
  
  updateNotificationPreference({ _params,..._data }) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/notification',
      _data,
      _params,
    });
  }
  
  createContact({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/users/message',
      _data,
      _params,
    });
  }
  
  updatePassword({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/update/password',
      _data,
      _params,
    });
  }
  
  requestOtp({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/request/otp',
      _data,
      _params,
    });
  }
  
  updateMobile({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/update/phonenumber',
      _data,
      _params,
    });
  }
  
  getUserDetailsById({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{id}/details',
      _params,
      _pathParams,
    });
  }
  
  getCommunity({ _params,_pathParams, }) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/community/{classId}',
      _params,
      _pathParams,
    });
  }
  
  getContactsOnStudyr({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/contacts/studyr',
      _data,
      _params,
    });
  }
  
  inviteUser({ _params,..._data }) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/invite/sms',
      _data,
      _params,
    });
  }
  
}
