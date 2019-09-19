
import axios from "axios";
import { transformOperations } from './transformOperations'
export default class Yash {
  constructor( headersObj ={}) {
    this.version ='1.0.0'
    this.requiredHeaders = 'name,lastname';
    this.optionalHeaders = 'token';
    this.name = "Yash";
    if(this.requiredHeaders){
      this.requiredHeaders.split(',').forEach(header => {
        if (Object.keys(headersObj).indexOf(header) < 0) {
          throw Error("All required header to initiate not passed");
        }
      });
    }
    this.configs = {
      baseURL: "https://yash.ocm",
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

    
  addFundsRequest({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      isFormData: true,
      _url: '/transfer-requests',
      _data,
      _params,
    });
  }
  
  createWallet({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/wallets',
      _data,
      _params,
    });
  }
  
  getAllFundRequestsStatusOfZone({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/zones/{zoneId}/fund-requests/all',
      _params,
      _pathParams,
    });
  }
  
  getEscrows({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/wallets/{walletAddress}/escrows',
      _params,
      _pathParams,
    });
  }
  
  getFundsRequests({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/fund-requests',
      _params,
    });
  }
  
  getPendingFundRequestsStatusByZone({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/zones/{zoneId}/fund-requests/pending',
      _params,
      _pathParams,
    });
  }
  
  getTransferRequests({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/transfer-requests/{transferRequestId}',
      _params,
      _pathParams,
    });
  }
  
  getWalletInfo({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/wallets',
      _params,
    });
  }
  
  getWalletTransactions({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/wallets/{walletAddress}/transactions',
      _params,
      _pathParams,
    });
  }
  
  rejectTransferRequestStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/zones/{zoneId}/transfer-requests/{transferRequestId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  rejectWithdrawRequestStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/transfer-requests/withdraw/{transferRequestId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateTransferRequestStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/zones/{zoneId}/transfer-requests/{transferRequestId}/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateWithdrawRequestStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/transfer-requests/withdraw/{transferRequestId}/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  withdrawRequest({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/transfer-requests/withdraw',
      _data,
      _params,
    });
  }
  
  acceptInvitation({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/invitation/{code}/accept',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getMyTraders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/me/traders',
      _params,
    });
  }
  
  getRoles({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/roles',
      _params,
    });
  }
  
  getTraders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organization/{organizationId}/traders',
      _params,
      _pathParams,
    });
  }
  
  pendingInvitation({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/invitations',
      _params,
      _pathParams,
    });
  }
  
  registrationStep({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/step/{stepNo}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sendInvitation({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/organizations/{organizationId}/invitations',
      _data,
      _params,
      _pathParams,
    });
  }
  
  verifyInvitation({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/verify/{code}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  acceptNegotiation({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/negotiations/{negotiationId}/accept',
      _data,
      _params,
      _pathParams,
    });
  }
  
  acceptOffer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/accept',
      _data,
      _params,
      _pathParams,
    });
  }
  
  addCommodityDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/organizations/{organizationId}/commodity',
      _data,
      _params,
      _pathParams,
    });
  }
  
  addOblDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/obl',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveBuyerContractDocumnet({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/orders/{orderId}/offers/{offerId}/contract/document/seller/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveContractDocBySeller({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/seller/contract/doc/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  buyerFeedback({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/buyer/feedback',
      _data,
      _params,
      _pathParams,
    });
  }
  
  buyerOrgApprovesAcceptOffer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  buyerSendsAssetsToCso({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/buyer/assets/cso',
      _data,
      _params,
      _pathParams,
    });
  }
  
  buyerUploadsProofOfFiat({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/orders/{orderId}/buyer/fiat',
      _data,
      _params,
      _pathParams,
    });
  }
  
  cBOUpdatesPhysicalObl({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/obl',
      _data,
      _params,
      _pathParams,
    });
  }
  
  cBOUploadsTransactionReceipt({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/cbo/transaction/receipt',
      _data,
      _params,
      _pathParams,
    });
  }
  
  cSOApproveTransactionReceipt({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/cso/transaction/receipt/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  cSoSendsDollarPegToCBo({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/cso/assets/cbo',
      _data,
      _params,
      _pathParams,
    });
  }
  
  confirmOblDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/obl/docs/confirm',
      _data,
      _params,
      _pathParams,
    });
  }
  
  confirmOrderByBuyer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/buyer/confirm',
      _data,
      _params,
      _pathParams,
    });
  }
  
  confirmOrderBySeller({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/seller/confirm',
      _data,
      _params,
      _pathParams,
    });
  }
  
  confirmsBuyerContractDocumnet({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/orders/{orderId}/offers/{offerId}/contract/document/seller/confirm',
      _data,
      _params,
      _pathParams,
    });
  }
  
  crateCounterOffer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/orders/{orderId}/offers/{offerId}/negotiations',
      _data,
      _params,
      _pathParams,
    });
  }
  
  createNegotiationOffer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/orders/{orderId}/negotiations/{negotiationId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  createNewOffer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/orders/{orderId}/offers',
      _data,
      _params,
      _pathParams,
    });
  }
  
  createOrder({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/organizations/{organizationId}/orders',
      _data,
      _params,
      _pathParams,
    });
  }
  
  getAllOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/admin/orders',
      _params,
    });
  }
  
  getAssetTypeReports({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/users/{usersId}/asset/reports',
      _params,
      _pathParams,
    });
  }
  
  getCommodityAnalytics({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/commodity/analytics',
      _params,
      _pathParams,
    });
  }
  
  getContractId({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/contractId',
      _params,
    });
  }
  
  getCounterPartyBuyAndSellOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/counterparties/{counterPartyId}/orders',
      _params,
      _pathParams,
    });
  }
  
  getGraphDetails({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/graphs/{assetType}',
      _params,
      _pathParams,
    });
  }
  
  getMarketDetails({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/markets/assets',
      _params,
    });
  }
  
  getMyOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/me/orders',
      _params,
    });
  }
  
  getOffer({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/orders/{orderId}/offers/{offerId}',
      _params,
      _pathParams,
    });
  }
  
  getOrder({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/orders/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  getOrderNegotiations({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/orders/{orderId}/negotiations',
      _params,
      _pathParams,
    });
  }
  
  getOrderOffers({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/orders/{orderId}/offers',
      _params,
      _pathParams,
    });
  }
  
  getOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/orders',
      _params,
    });
  }
  
  getOrgOrder({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/orders/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  getOrgOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/orders',
      _params,
      _pathParams,
    });
  }
  
  getOrganizationCounterPartyReports({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/counterparty/reports',
      _params,
      _pathParams,
    });
  }
  
  getOrganizationOrdersCount({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/orders/count/all',
      _params,
      _pathParams,
    });
  }
  
  getOrganizationTeamReports({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/team/reports',
      _params,
      _pathParams,
    });
  }
  
  getParticularOrderInvoice({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/orders/{orderId}/invoice',
      _params,
      _pathParams,
    });
  }
  
  getTeamSellAndBuyOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/users/{userId}/orders',
      _params,
      _pathParams,
    });
  }
  
  getUserOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/orders',
      _params,
      _pathParams,
    });
  }
  
  getUserOrdersCount({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/orders/count/all',
      _params,
      _pathParams,
    });
  }
  
  rejectNegotiation({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/negotiations/{negotiationId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sellerApprovesProofOfFiat({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/orders/{orderId}/seller/fiat/document/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sellerFeedback({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/seller/feedback',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sendToEscrow({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/escrow',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateCommodityDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/commodity',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateDocStatusByBuyer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/buyer/docs/status/receive',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateDocStatusByCBO({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/cbo/docs/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateDocStatusByCSO({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/cso/docs/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateDocStatusByCSO({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/cso/docs/receive',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrderCourierDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/couriers/{from}/{to}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrderDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/details',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrderStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/review',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateReceiveDocStatusByCBO({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/cbo/docs/receive',
      _data,
      _params,
      _pathParams,
    });
  }
  
  addBankDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organization/bankprofile',
      _data,
      _params,
    });
  }
  
  addOrganizationProfile({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/organizations',
      _data,
      _params,
    });
  }
  
  getBankDetails({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/bankdetails/{zoneId}',
      _params,
      _pathParams,
    });
  }
  
  getOrgAddress({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/address',
      _params,
      _pathParams,
    });
  }
  
  getOrganizationBankDetails({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/bank/details',
      _params,
      _pathParams,
    });
  }
  
  getZoneOrganization({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/zones/{zoneId}/organizations/{organizationId}',
      _params,
      _pathParams,
    });
  }
  
  getZoneOrganizations({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/zones/{zoneId}/organizations',
      _params,
      _pathParams,
    });
  }
  
  organizationProfileReview({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/profile/review',
      _data,
      _params,
      _pathParams,
    });
  }
  
  termsAndConditions({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/terms',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateAllKycDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc/details',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateKYCSingleDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc/docs/{docId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateKycDocByDocType({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc-docs/{docType}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrganizationLogo({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/logo',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrganizationProfile({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/profile',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveFundsStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/transferRequests/{transferRequestId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteInvitation({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/organizations/invitations/{invitationId}',
      _params,
      _pathParams,
    });
  }
  
  deleteTrader({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/organization/{organizationId}/trader/{traderId}',
      _params,
      _pathParams,
    });
  }
  
  approveContractDocByCso({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/cso/contract/doc/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteOrder({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/orders/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  deleteOrderDoc({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/orders/{orderId}/docs/{docType}',
      _params,
      _pathParams,
    });
  }
  
  getMyOrder({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/me/orders/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  getUserOrder({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/orders/{orderId}',
      _params,
      _pathParams,
    });
  }
  
  getUserOrders({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/orders',
      _params,
      _pathParams,
    });
  }
  
  updateBuyerCboEscrowStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/orders/{orderId}/buyer/cbo/escrow/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateBuyerEscrowStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/buyer/escrow/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrderDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/docs',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveOrderStatus({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/orders/{orderId}/approve',
      _params,
      _pathParams,
    });
  }
  
  comdexAdminKYC({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/zones/{zoneId}/organizations/{organizationId}kyc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteKycDoc({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/organizations/{organizationId}/kyc/docs/{docId}',
      _params,
      _pathParams,
    });
  }
  
  getKycDocs({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/organizations/{organizationId}/kyc',
      _params,
      _pathParams,
    });
  }
  
  updateKycDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  changePassword({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/auth/password/',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteUser({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/users',
      _params,
    });
  }
  
  getKycDocs({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/kyc/docs',
      _params,
      _pathParams,
    });
  }
  
  getProfile({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/{userId}/profile',
      _params,
      _pathParams,
    });
  }
  
  updateProfile({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/profile',
      _data,
      _params,
    });
  }
  
  uploadKycDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/{userId}/kyc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  createPassword({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/{userId}/password/create',
      _data,
      _params,
      _pathParams,
    });
  }
  
  deleteKycDoc({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "DELETE",
      _url: '/users/{userId}/kyc/docs/{docId}',
      _params,
      _pathParams,
    });
  }
  
  forgotPassword({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/auth/password/forgot',
      _data,
      _params,
    });
  }
  
  forgotPasswordVerify({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/users/auth/password/forgot/verify?email=""&code=""',
      _params,
    });
  }
  
  getMyProfile({ _params,_pathParams, } = {}) {
    return this.fetchApi({
      method: "GET",
      _url: '/me',
      _params,
    });
  }
  
  reSendOTP({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/auth/otp/resend',
      _data,
      _params,
    });
  }
  
  resetForgotPassword({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/auth/password/reset',
      _data,
      _params,
    });
  }
  
  sendOTP({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/auth/otp/send',
      _data,
      _params,
    });
  }
  
  signin({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/user/auth/signin',
      _data,
      _params,
    });
  }
  
  signout({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/users/auth/signout',
      _data,
      _params,
    });
  }
  
  updateACLOfAnUser({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/users/{userId}/acl/permissions',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateKycDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/kyc/docs',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateSingeKycDocsbyDocType({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/kyc-docs/{docType}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateSingleKycDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/kyc/docs/{docId}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateUserKycDetails({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/{userId}/kyc/docs/all/details',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateUserProfilePicture({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/users/{userId}/profile/pic',
      _data,
      _params,
      _pathParams,
    });
  }
  
  verifyOTP({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/users/auth/otp/verify',
      _data,
      _params,
    });
  }
  
  approveContractDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/offers/{offerId}/contract/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveKycDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveOBLDocs({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/docs/{docId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveOrder({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/zones/{zoneId}/organizations/{organizationId}/orders/{orderId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveOrganization({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  approveSingleKycDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc/docs/{docId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  buyerUploadSettlementDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/orders/{orderId}/buyer/settlement/doc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  cboConfirmTransactionWithAttachment({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/orders/{orderId}/cbo/confirm',
      _data,
      _params,
      _pathParams,
    });
  }
  
  comdexApprovesSettleMentDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  comdexBuyerOfficeOrderStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/comdex/buyers/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  comdexSellerOfficeOrderStatus({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/comdex/seller/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  comdexUpdatesSettleMentDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc/reupload',
      _data,
      _params,
      _pathParams,
    });
  }
  
  comdexUploadsSettleMentDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  courierFromSellerToBuyer({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/courier/obl/{from}/{to}',
      _data,
      _params,
      _pathParams,
    });
  }
  
  organizationApprovesOrder({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/approve',
      _data,
      _params,
      _pathParams,
    });
  }
  
  rejectOrder({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/orders/{orderId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  rejectOrganization({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  rejectSingelKycDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/kyc/docs/{docId}/reject',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sellerUpdatesSettlementDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/orders/{orderId}/seller/settlement/doc/reupload',
      _data,
      _params,
      _pathParams,
    });
  }
  
  sellerUploadSettlementDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      isFormData: true,
      _url: '/organizations/{organizationId}/orders/{orderId}/seller/settlement/doc',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateBuyerContractDoc({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/orders/{orderId}/offers/{offerId}/contract/document',
      _data,
      _params,
      _pathParams,
    });
  }
  
  updateOrgStatusByComdex({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "PUT",
      _url: '/organizations/{organizationId}/status',
      _data,
      _params,
      _pathParams,
    });
  }
  
  createZone({ _params,_pathParams,..._data } = {}) {
    return this.fetchApi({
      method: "POST",
      _url: '/zones',
      _data,
      _params,
    });
  }
  
}
