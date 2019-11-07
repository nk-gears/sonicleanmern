import { handleActions } from 'redux-actions'
import { SAVE_CUSTOMER, FAILURE_CUSTOMER } from './constants'
import { SELECTED_SHIPPINGINFO,SELECTEDPAYMENT } from '../salesForm'

import { getToken } from '_helpers/token-helpers'

const initialState = {
    isSubmitSuccess: false
};
export const saveCusomter = (request, stateName) => {
    return dispatch => {
        try {
            const token = getToken();
            const appBaseURL = process.env.REACT_APP_API_URL;
            fetch(appBaseURL + "customers",
                {
                    method: "POST",
                    headers: [
                        ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
                        ['Authorization', `Bearer ${token}`],
                        ["Content-Type", "application/json"],
                    ],
                    body: JSON.stringify(request)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        let cusermerInfo = { customerid: data.data, firstName: request.firstname ,lastName :request.lastname, address1: request.address1, city: request.city, state: stateName, zip: request.zip, address2: request.address2,phone:request.phone,name:"" }
                        dispatch({
                            type: SAVE_CUSTOMER,
                            payload: data.data
                        })
                        dispatch({
                            type: SELECTED_SHIPPINGINFO,
                            payload: cusermerInfo
                        })
                        dispatch({
                            type: SELECTEDPAYMENT,
                            payload: ''
                        })
                    }
                    else {
                        dispatch({
                            type: FAILURE_CUSTOMER,
                            payload: data
                        });
                    }
                })
        } catch (error) {
            dispatch({
                type: FAILURE_CUSTOMER,
                payload: error
            });
        }
    }
}

/* Action creators */

export const CustomerReducer = handleActions({
    [SAVE_CUSTOMER]: (state, { payload }) => {
        return {
            ...state,
            response: "Customer added successfully",
            id: payload,
            isSubmitSuccess: true
        };
    },
    [FAILURE_CUSTOMER]: (state, { payload }) => {
        return {
            ...state,
            response: payload,
            isSubmitSuccess: false
        };
    },

}, initialState)