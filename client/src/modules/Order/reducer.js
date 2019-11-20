import { createAction, handleActions } from 'redux-actions';
import { SAVE_ORDER, FAILURE_ORDER } from './constants';
import { getToken } from '_helpers/token-helpers';

const initialState = {
  isSubmitSuccess: false,
};
export const order = data => {
  return dispatch => {
    try {
      const token = getToken();
      const appBaseURL = process.env.REACT_APP_API_URL;
      fetch(appBaseURL + 'orders?data=' + JSON.stringify(data), {
        method: 'POST',
        headers: [
          ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
          ['Authorization', `Bearer ${token}`],
          ['Content-Type', 'application/json'],
        ],
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            dispatch(orderSuccess());
          } else {
            dispatch({
              type: FAILURE_ORDER,
              payload: data.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: FAILURE_ORDER,
        payload: error,
      });
    }
  };
};

/* Action creators */
export const orderSuccess = createAction(SAVE_ORDER);

export const OrderReducer = handleActions(
  {
    [SAVE_ORDER]: state => {
      return {
        ...state,
        isSubmitSuccess: true,
      };
    },
    [FAILURE_ORDER]: (state, { payload }) => {
      return {
        ...state,
        orderResponse: payload,
        isOrder: false,
      };
    },
  },
  initialState
);
