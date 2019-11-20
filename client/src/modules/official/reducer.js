import { handleActions } from 'redux-actions';
import { GETDEALERSLIST } from './constants';
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
  state: REQUEST_STATUS.INITIAL,
};

/* Action creators */
export const {
  start: getDealersList,
  success: getDealersListSuccess,
  fail: getDealersListFail,
} = defineLoopActions(GETDEALERSLIST);

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
  },
  initialState
);
