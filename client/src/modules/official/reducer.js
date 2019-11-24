import { handleActions } from 'redux-actions';
import { GETDEALERSLIST, DELETEDEALER, DEALERACTIVATION } from './constants';
import { getToken } from '_helpers/token-helpers';

import { REQUEST_STATUS } from '_config/constants';
import { apiAction } from 'utils/apiCall';
import { defineLoopActions, requestLoopHandlers } from 'utils/state';

const initialState = {
  dealersList: [],
  totalCount: 0,
  currentPage: 1,
  sizePerPage: 5,
  error: {},
  activationToken: false,
  state: REQUEST_STATUS.INITIAL,
};

/* Action creators */
export const {
  start: getDealersList,
  success: getDealersListSuccess,
  fail: getDealersListFail,
} = defineLoopActions(GETDEALERSLIST);

export const {
  start: deleteDealer,
  success: deleteDealerSuccess,
  fail: deleteDealerFail,
} = defineLoopActions(DELETEDEALER);

export const {
  start: dealerActivation,
  success: dealerActivationSuccess,
  fail: dealerActivationFail,
} = defineLoopActions(DEALERACTIVATION);

export const fetchDealersList = (page, size, email) => {
  console.log(page, size);

  const apiUrl = `/api/official/dealers?page=${page}&size=${size}&email=${email}`;
  const token = getToken();
  return apiAction({
    url: apiUrl,
    accessToken: token,
    onStart: getDealersList,
    onSuccess: getDealersListSuccess,
    onFailure: getDealersListFail,
    label: GETDEALERSLIST,
  });
};

export const deleteDealerById = id => {
  const apiUrl = `/api/official/delete/${id}`;
  const token = getToken();
  return apiAction({
    url: apiUrl,
    method: 'DELETE',
    accessToken: token,
    onStart: deleteDealer,
    onSuccess: deleteDealerSuccess,
    onFailure: deleteDealerFail,
    label: DELETEDEALER,
  });
};

export const dealerActivationRequest = id => {
  const apiUrl = `/api/users/active/${id}`;
  const token = getToken();
  return apiAction({
    url: apiUrl,
    method: 'POST',
    accessToken: token,
    onStart: dealerActivation,
    onSuccess: dealerActivationSuccess,
    onFailure: dealerActivationFail,
    label: DEALERACTIVATION,
  });
};

export const officialReducer = handleActions(
  {
    ...requestLoopHandlers({
      action: GETDEALERSLIST,
      onSuccess: (state, payload) => {
        return {
          ...state,
          dealersList: payload.data,
          totalCount: payload.pages,
          currentPage: payload.currentPage,
          sizePerPage: payload.sizePerPage,
          error: {},
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),

    ...requestLoopHandlers({
      action: DELETEDEALER,
      onSuccess: (state, payload) => {
        return {
          ...state,
          dealersList: [],
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),

    ...requestLoopHandlers({
      action: DEALERACTIVATION,
      onSuccess: (state, payload) => {
        return {
          ...state,
          activationToken: payload !== '' ? true : false,
          dealersList: [],
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),
  },
  initialState
);
