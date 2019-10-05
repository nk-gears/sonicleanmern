import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_PRICELIST,
    FETCH_PERPRICELIST,
    FAILURE_PRICELIST
} from './constants'
import { getToken } from '_helpers/token-helpers'


const initialState = {
    priceListItem: [],
    perPriceListItem: []
};

export const fetchPricelist = () => {
    return dispatch => {
        try {
            const appBaseURL = process.env.REACT_APP_API_URL;
            const token = getToken();
            fetch(appBaseURL + "pricelists", {
                method: "GET",
                headers: [
                    ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
                    ['Authorization', `Bearer ${token}`],
                    ['Accept', 'application/json']
                ]
            })
                .then(response => response.json())
                .then(data => {
                    if (data.data != null && data.data != undefined) {
                        dispatch({
                            type: FETCH_PRICELIST,
                            payload: data.data
                        });
                        dispatch({
                            type: FETCH_PRICELIST,
                            payload: data.data
                        });
                    }
                    else {
                        dispatch(failurePricelist());
                    }
                });
        } catch (error) {
            dispatch(failurePricelist());
        }
    }
}


export const fetchPerPriceList = (orderType) => {
    return dispatch => {
        try {
            const appBaseURL = process.env.REACT_APP_API_URL;
            const token = getToken();
            fetch(appBaseURL + "prices/" + orderType, {
                method: "GET",
                headers: [
                    ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
                    ['Authorization', `Bearer ${token}`],
                    ['Accept', 'application/json']
                ]
            })
                .then(response => response.json())
                .then(data => {
                    if (data.data != null && data.data != undefined) {                        
                        dispatch({
                            type: FETCH_PERPRICELIST,
                            payload: data.data
                        });
                    }
                    else{
                        dispatch(failurePricelist());
                    }
                });
        } catch (error) {
            dispatch(failurePricelist());
        }
    }
}

/* Action creators */
export const failurePricelist = createAction(FAILURE_PRICELIST)

export const PriceListReducer = handleActions({
    [FETCH_PRICELIST]: (state, { payload }) => {
        return {
            ...state,
            priceListItem: payload
        };
    },
    [FETCH_PERPRICELIST]: (state, { payload }) => {
        return {
            ...state,
            perPriceListItem: payload,
        };
    },
    [FAILURE_PRICELIST]: (state) => {
        return {
            ...state
        };
    },
}, initialState)