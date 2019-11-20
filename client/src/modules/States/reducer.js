import { createAction, handleActions } from 'redux-actions';
import { STATE, FAILURE_STATE } from './constants';

const initialState = {
  stateData: [],
};

export const fetchStates = () => {
  return dispatch => {
    try {
      const appBaseURL = process.env.REACT_APP_API_URL;
      fetch(appBaseURL + 'states/1', {
        method: 'GET',
        headers: [['Content-Type', 'application/json']],
      })
        .then(response => response.json())
        .then(data => {
          var stateOptions = data.data.map(state => {
            return { value: state.id, label: state.name };
          });
          dispatch({
            type: STATE,
            payload: stateOptions,
          });
        });
    } catch (error) {
      dispatch(failurestate());
    }
  };
};
/* Action creators */
export const failurestate = createAction(FAILURE_STATE);

export const StateReducer = handleActions(
  {
    [STATE]: (state, { payload }) => {
      return {
        ...state,
        stateData: payload,
      };
    },
    [FAILURE_STATE]: state => {
      return {
        ...state,
      };
    },
  },
  initialState
);
