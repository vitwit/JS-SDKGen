
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

addFundsRequest({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transfer-requests',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
createWallet({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/wallets',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getAllFundRequestsStatusOfZone({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/fund-requests/all',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getEscrows({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/wallets/{walletAddress}/escrows',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getFundsRequests({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/fund-requests',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getPendingFundRequestsStatusByZone({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/fund-requests/pending',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getTransferRequests({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transfer-requests/{transferRequestId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getWalletInfo({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/wallets',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getWalletTransactions({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/wallets/{walletAddress}/transactions',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectTransferRequestStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/transfer-requests/{transferRequestId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectWithdrawRequestStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transfer-requests/withdraw/{transferRequestId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateTransferRequestStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/transfer-requests/{transferRequestId}/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateWithdrawRequestStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transfer-requests/withdraw/{transferRequestId}/status',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
withdrawRequest({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transfer-requests/withdraw',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
acceptInvitation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/invitation/{code}/accept',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getMyTraders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/me/traders',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getRoles({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/roles',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getTraders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organization/{organizationId}/traders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
pendingInvitation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/invitations',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
registrationStep({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/step/{stepNo}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
sendInvitation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/invitations',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
verifyInvitation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/verify/{code}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
acceptNegotiation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/negotiations/{negotiationId}/accept',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
acceptOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/accept',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
addCommodityDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/commodity',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
addOblDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/obl',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveBuyerContractDocumnet({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/contract/document/seller/approve',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
approveContractDocBySeller({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/seller/contract/doc/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
buyerFeedback({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/buyer/feedback',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
buyerOrgApprovesAcceptOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
buyerSendsAssetsToCso({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/buyer/assets/cso',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
buyerUploadsProofOfFiat({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/buyer/fiat',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
cBOUpdatesPhysicalObl({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/obl',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
cBOUploadsTransactionReceipt({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/cbo/transaction/receipt',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
cSOApproveTransactionReceipt({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/cso/transaction/receipt/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
cSoSendsDollarPegToCBo({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/cso/assets/cbo',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
confirmOblDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/obl/docs/confirm',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
confirmOrderByBuyer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/buyer/confirm',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
confirmOrderBySeller({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/seller/confirm',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
confirmsBuyerContractDocumnet({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/contract/document/seller/confirm',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
crateCounterOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/negotiations',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
createNegotiationOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/negotiations/{negotiationId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
createNewOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
createOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getAllOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/admin/orders',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getAssetTypeReports({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/users/{usersId}/asset/reports',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getCommodityAnalytics({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/commodity/analytics',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getContractId({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/contractId',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getCounterPartyBuyAndSellOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/counterparties/{counterPartyId}/orders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getGraphDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/graphs/{assetType}',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getMarketDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/markets/assets',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getMyOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/me/orders',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getOffer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrderNegotiations({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/negotiations',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrderOffers({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getOrgOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrgOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrganizationCounterPartyReports({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/counterparty/reports',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrganizationOrdersCount({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/count/all',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrganizationTeamReports({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/team/reports',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getParticularOrderInvoice({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/invoice',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getTeamSellAndBuyOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/users/{userId}/orders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getUserOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/orders',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getUserOrdersCount({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/orders/count/all',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectNegotiation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/negotiations/{negotiationId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
sellerApprovesProofOfFiat({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/seller/fiat/document/approve',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
sellerFeedback({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/seller/feedback',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
sendToEscrow({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/escrow',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateCommodityDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/commodity',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateDocStatusByBuyer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/buyer/docs/status/receive',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateDocStatusByCBO({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/cbo/docs/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateDocStatusByCSO({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/cso/docs/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateDocStatusByCSO({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/cso/docs/receive',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateOrderCourierDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/couriers/{from}/{to}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateOrderDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/details',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateOrderStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/review',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateReceiveDocStatusByCBO({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/cbo/docs/receive',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
addBankDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organization/bankprofile',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
addOrganizationProfile({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getBankDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/bankdetails/{zoneId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrgAddress({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/address',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getOrganizationBankDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/bank/details',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getZoneOrganization({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/organizations/{organizationId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getZoneOrganizations({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/organizations',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
organizationProfileReview({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/profile/review',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
termsAndConditions({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/terms',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
updateAllKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/details',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateKYCSingleDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/docs/{docId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateKycDocByDocType({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc-docs/{docType}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateOrganizationLogo({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/logo',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
updateOrganizationProfile({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/profile',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveFundsStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/transferRequests/{transferRequestId}/approve',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
deleteInvitation({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/invitations/{invitationId}',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
deleteTrader({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organization/{organizationId}/trader/{traderId}',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
approveContractDocByCso({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/cso/contract/doc/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
deleteOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
deleteOrderDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/docs/{docType}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getMyOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/me/orders/{orderId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getUserOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/orders/{orderId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getUserOrders({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/orders',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateBuyerCboEscrowStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/buyer/cbo/escrow/status',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
updateBuyerEscrowStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/buyer/escrow/status',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
updateOrderDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/docs',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveOrderStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/approve',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
comdexAdminKYC({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/organizations/{organizationId}kyc',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
deleteKycDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/docs/{docId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
updateKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
changePassword({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/auth/password/',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
deleteUser({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
getKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc/docs',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getProfile({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/profile',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateProfile({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/profile',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
uploadKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
createPassword({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/password/create',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
deleteKycDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc/docs/{docId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
forgotPassword({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/password/forgot',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
forgotPasswordVerify({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/password/forgot/verify?email=""&code=""',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
getMyProfile({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/me',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
reSendOTP({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/otp/resend',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
resetForgotPassword({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/password/reset',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
sendOTP({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/otp/send',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
signin({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/user/auth/signin',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
signout({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/signout',
      method:'undefined',
      _data,
      isFormData:undefined,
      _params,
      _pathParams
    });
  });
}
  
updateACLOfAnUser({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/users/{userId}/acl/permissions',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc/docs',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateSingeKycDocsbyDocType({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc-docs/{docType}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateSingleKycDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc/docs/{docId}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateUserKycDetails({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/kyc/docs/all/details',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateUserProfilePicture({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/{userId}/profile/pic',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
verifyOTP({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/users/auth/otp/verify',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveContractDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/offers/{offerId}/contract/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveKycDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveOBLDocs({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/docs/{docId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/organizations/{organizationId}/orders/{orderId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveOrganization({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
approveSingleKycDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/docs/{docId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
buyerUploadSettlementDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/buyer/settlement/doc',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
cboConfirmTransactionWithAttachment({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/cbo/confirm',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
comdexApprovesSettleMentDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc/approve',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
comdexBuyerOfficeOrderStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/comdex/buyers/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
comdexSellerOfficeOrderStatus({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/comdex/seller/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
comdexUpdatesSettleMentDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc/reupload',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
comdexUploadsSettleMentDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones/{zoneId}/orders/{orderId}/comdex/settlement/doc',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
courierFromSellerToBuyer({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/courier/obl/{from}/{to}',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
organizationApprovesOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/approve',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectOrder({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectOrganization({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
rejectSingelKycDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/kyc/docs/{docId}/reject',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
sellerUpdatesSettlementDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/seller/settlement/doc/reupload',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
sellerUploadSettlementDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/orders/{orderId}/seller/settlement/doc',
      method:'undefined',
      _data,
      isFormData:true,
      _params,
      _pathParams
    });
  });
}
  
updateBuyerContractDoc({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/orders/{orderId}/offers/{offerId}/contract/document',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
updateOrgStatusByComdex({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/organizations/{organizationId}/status',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  
createZone({ _params, _pathParams, ..._data }) {
  return new Promise((resolve, reject) => {
    this.fetchApi({
      resolve,
      _url:'/zones',
      method:'undefined',
      _data,
      isFormData:false,
      _params,
      _pathParams
    });
  });
}
  }