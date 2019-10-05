import { handleActions } from 'redux-actions'
import { GETORDERLIST } from './constants'
import { getToken } from '_helpers/token-helpers'
import { REQUEST_STATUS } from '_config/constants'

import { apiAction } from 'utils/apiCall'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'

const initialState = {
    orderhistorylist: {},
    state: REQUEST_STATUS.INITIAL
}

export const {
    start: getOrder,
    success: getOrderSuccess,
    fail: getOrderFail,
} = defineLoopActions(GETORDERLIST)

export const fetchOrderHistoryList = (search, page) => {
    
        const token = getToken();
        const appBaseURL = process.env.REACT_APP_API_URL;
        const apiUrl = `${appBaseURL}orders?search=${search}&limit=${page}`

        return apiAction({
            url: apiUrl,
            accessToken: token,
            onStart: getOrder,
            onSuccess: getOrderSuccess,
            onFailure: getOrderFail,
            label: GETORDERLIST
         });
}

export const OrderHistoryReducer = handleActions({
    ...requestLoopHandlers({
        action: GETORDERLIST, 
        onSuccess: (state, payload) => {
            console.log(payload)
            return {
                ...state,
                orderhistorylist: payload.data.data,
                state: REQUEST_STATUS.SUCCESS
            }
        },
    })
}, initialState)