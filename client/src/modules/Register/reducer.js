import { createAction, handleActions } from 'redux-actions';
import { history } from '_helpers/history';

import { SUCCESS_REGISTER, FAILURE_REGISTER } from './constants';

const initialState = {
  response: {},
  message: '',
  success: false,
  failed: false,
};
export const register = data => {
  return dispatch => {
    try {
      const appBaseURL = process.env.REACT_APP_API_URL;
      fetch(appBaseURL + 'dealers/register', {
        method: 'POST',
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            setTimeout(() => dispatch(registerSuccess()), 2000);
            history.push('/login');
          } else {
            dispatch({
              type: FAILURE_REGISTER,
              payload: data.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: FAILURE_REGISTER,
        payload: error,
      });
    }
  };
};

/* Action creators */

export const registerSuccess = createAction(SUCCESS_REGISTER);

export const RegisterReducer = handleActions(
  {
    [SUCCESS_REGISTER]: state => {
      return {
        ...state,
        message: 'Registered successfully',
        success: true,
        failed: false,
      };
    },
    [FAILURE_REGISTER]: (state, { payload }) => {
      return {
        ...state,
        response: payload,
        success: false,
        failed: true,
      };
    },
  },
  initialState
);
