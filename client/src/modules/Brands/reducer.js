import { createAction, handleActions } from 'redux-actions';
import { BRANDS, FAILURE_BRANDS } from './constants';

const initialState = {
  brandData: [],
};

export const fetchBrands = () => {
  return dispatch => {
    try {
      const appBaseURL = process.env.REACT_APP_API_URL;
      fetch(appBaseURL + 'brands', {
        method: 'GET',
        headers: [['Content-Type', 'application/json']],
      })
        .then(response => response.json())
        .then(data => {
          var new_data = data.data.map(brand => {
            return { value: brand.id, label: brand.brandname };
          });
          dispatch({
            type: BRANDS,
            payload: new_data,
          });
        });
    } catch (error) {
      dispatch(failurebrands());
    }
  };
};
/* Action creators */
export const failurebrands = createAction(FAILURE_BRANDS);

export const BrandReducer = handleActions(
  {
    [BRANDS]: (state, { payload }) => {
      return {
        ...state,
        brandData: payload,
      };
    },
    [FAILURE_BRANDS]: state => {
      return {
        ...state,
      };
    },
  },
  initialState
);
