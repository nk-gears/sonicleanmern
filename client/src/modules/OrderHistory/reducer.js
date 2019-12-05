import { handleActions } from 'redux-actions';
import { GETORDERLIST, GETORDERBYID } from './constants';
import { getToken } from '_helpers/token-helpers';
import { REQUEST_STATUS } from '_config/constants';

import { apiAction } from 'utils/apiCall';
import { defineLoopActions, requestLoopHandlers } from 'utils/state';

const initialState = {
  orderhistorylist: {},
  totalCount: 0,
  currentPage: 1,
  sizePerPage: 5,
  orderDataById: {},
  orderStatus: '',
  state: REQUEST_STATUS.INITIAL,
};

export const {
  start: getOrder,
  success: getOrderSuccess,
  fail: getOrderFail,
} = defineLoopActions(GETORDERLIST);

export const {
  start: getOrderById,
  success: getOrderByIdSuccess,
  fail: getOrderByIdFail,
} = defineLoopActions(GETORDERBYID);

export const fetchOrderHistoryList = (
  page,
  size,
  orderType,
  orderStatus,
  date_from,
  date_to,
  id
) => {
  let apiUrl = `/api/orders/orderslist?page=${page}&size=${size}&ordertype=${orderType}&order_status=${orderStatus}`;

  if (id) {
    apiUrl = `${apiUrl}&id=${id}`;
  }
  if (date_from && date_to) {
    apiUrl = `${apiUrl}&date_from=${date_from}&date_to=${date_to}`;
  }
  const token = getToken();
  console.log(apiUrl);
  return apiAction({
    url: apiUrl,
    method: 'GET',
    accessToken: token,
    onStart: getOrder,
    onSuccess: getOrderSuccess,
    onFailure: getOrderFail,
    label: GETORDERLIST,
  });
};

export const fetchOrderByID = id => {
  const apiUrl = `/api/orders/order/${id}`;
  const token = getToken();

  return apiAction({
    url: apiUrl,
    method: 'GET',
    accessToken: token,
    onStart: getOrderById,
    onSuccess: getOrderByIdSuccess,
    onFailure: getOrderByIdFail,
    label: GETORDERBYID,
  });
};

export const OrderHistoryReducer = handleActions(
  {
    ...requestLoopHandlers({
      action: GETORDERLIST,
      onSuccess: (state, payload) => {
        return {
          ...state,
          orderhistorylist: payload.data,
          totalCount: payload.pages,
          currentPage: payload.currentPage,
          sizePerPage: payload.sizePerPage,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),

    ...requestLoopHandlers({
      action: GETORDERBYID,
      onSuccess: (state, payload) => {
        return {
          ...state,
          orderDataById: payload.orderData,
          orderStatus: payload.orderStatus,
          orderPayment: payload.orderPayment,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),
  },
  initialState
);
