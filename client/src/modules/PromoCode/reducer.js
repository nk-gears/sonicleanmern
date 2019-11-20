import { handleActions } from 'redux-actions';
import { SAVE_PROMOCODE, FAILURE_PROMOCODE } from './constants';
import { getToken, getDealerId } from '_helpers/token-helpers';
import { DISCOUNT } from '../salesForm';
const initialState = {
  response: {},
  isSubmitSuccess: false,
};
export const promocode = (promocodeValue, customerid) => {
  return dispatch => {
    try {
      const token = getToken();
      const dealerId = getDealerId();
      const appBaseURL = process.env.REACT_APP_API_URL;
      const data = {
        promocode: promocodeValue,
        dealerid: dealerId,
        customerid: customerid,
      };

      fetch(appBaseURL + 'promocodes', {
        method: 'POST',
        headers: [
          ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
          ['Authorization', `Bearer ${token}`],
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            if (data.data.discount === 0) {
              let invalidPromoCode = {};
              invalidPromoCode.error = 'Invalid Promo Code.';
              dispatch({
                type: FAILURE_PROMOCODE,
                payload: invalidPromoCode,
              });
            } else {
              dispatch({
                type: SAVE_PROMOCODE,
                payload: data.data,
              });
              const discount = {
                discount: data.data.discount,
                promocode: promocodeValue,
              };
              dispatch({
                type: DISCOUNT,
                payload: discount,
              });
            }
          } else {
            dispatch({
              type: FAILURE_PROMOCODE,
              payload: data.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: FAILURE_PROMOCODE,
        payload: error,
      });
    }
  };
};

export const PromoCodeReducer = handleActions(
  {
    [SAVE_PROMOCODE]: (state, { payload }) => {
      return {
        ...state,
        response: payload,
        isSubmitSuccess: true,
      };
    },
    [FAILURE_PROMOCODE]: (state, { payload }) => {
      return {
        ...state,
        response: payload,
        isSubmitSuccess: false,
      };
    },
  },
  initialState
);
