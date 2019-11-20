import { handleActions } from 'redux-actions';
import { GET_CARDS, ADD_CARD, DELETE_CARD } from './constants';
import { getToken } from '_helpers/token-helpers';

import { REQUEST_STATUS } from '_config/constants';
import { apiAction } from 'utils/apiCall';
import { defineLoopActions, requestLoopHandlers } from 'utils/state';

const initialState = {
  cardsData: [],
  isSubmitSuccess: false,
  error: {},
  state: REQUEST_STATUS.INITIAL,
};

/* Action creators */
export const {
  start: getCards,
  success: getCardsSuccess,
  fail: getCardsFail,
  end: endCards,
} = defineLoopActions(GET_CARDS);

export const {
  start: addCard,
  success: addCardSuccess,
  fail: addCardFail,
} = defineLoopActions(ADD_CARD);

export const {
  start: deleteCard,
  success: deleteCardSuccess,
  fail: deleteCardFail,
} = defineLoopActions(DELETE_CARD);

export const fetchCards = id => {
  const apiUrl = `/api/payment/list/${id}`;
  const token = getToken();
  return apiAction({
    url: apiUrl,
    accessToken: token,
    onStart: getCards,
    onSuccess: getCardsSuccess,
    onFailure: getCardsFail,
    label: GET_CARDS,
  });
};

export const saveCard = (data, id) => {
  const apiUrl = `/api/payment/add/${id}`;
  const token = getToken();

  return apiAction({
    url: apiUrl,
    method: 'POST',
    accessToken: token,
    onStart: addCard,
    onSuccess: addCardSuccess,
    onFailure: addCardFail,
    data: data,
    label: ADD_CARD,
  });
};

export const deleteCardRequest = (id, dealer) => {
  console.log(id);

  const apiUrl = `/api/payment/delete/${id}/${dealer}`;
  const token = getToken();

  return apiAction({
    url: apiUrl,
    method: 'DELETE',
    accessToken: token,
    onStart: deleteCard,
    onSuccess: deleteCardSuccess,
    onFailure: deleteCardFail,
    label: DELETE_CARD,
  });
};

export const CardReducer = handleActions(
  {
    ...requestLoopHandlers({
      action: ADD_CARD,
      onSuccess: (state, payload) => {
        return {
          ...state,
          cardsData: payload,
          error: {},
          isSubmitSuccess: payload.success,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),

    ...requestLoopHandlers({
      action: GET_CARDS,
      onSuccess: (state, payload) => {
        return {
          ...state,
          cardsData: payload,
          error: {},
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),

    ...requestLoopHandlers({
      action: DELETE_CARD,
      onSuccess: (state, payload) => {
        return {
          ...state,
          error: {},
          cardsData: payload,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
    }),
  },
  initialState
);
