import { createAction, handleActions } from 'redux-actions';
import { SAVE_REFERRAL, FAILURE_REFERRAL } from './constants';
import { getToken } from '_helpers/token-helpers';

const initialState = {
  response: {},
  isSubmitSuccess: false,
};
export const referral = data => {
  return dispatch => {
    try {
      const token = getToken();
      const appBaseURL = process.env.REACT_APP_API_URL;
      fetch(appBaseURL + 'referrals', {
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
            dispatch(referralSuccess());
          } else {
            dispatch({
              type: FAILURE_REFERRAL,
              payload: data.data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: FAILURE_REFERRAL,
        payload: error,
      });
    }
  };
};

/* Action creators */
export const referralSuccess = createAction(SAVE_REFERRAL);

export const ReferralReducer = handleActions(
  {
    [SAVE_REFERRAL]: state => {
      return {
        ...state,
        isSubmitSuccess: true,
      };
    },
    [FAILURE_REFERRAL]: (state, { payload }) => {
      return {
        ...state,
        response: payload,
        isSubmitSuccess: false,
      };
    },
  },
  initialState
);
