import { createAction, handleActions } from 'redux-actions'
import { REQUEST_STATUS } from '_config/constants'
import { apiAction } from 'utils/apiCall'
import { getToken } from '_helpers/token-helpers'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'
import {
    SALESFORM_ORDERTYPE,
    SELECT_INVENTORY,
    SELECT_SHIP,
    SELECT_SHIPPINGINFO, 
    SELECTED_SHIPPINGINFO,
    SELECTED_INVENTORYDATA,
    DISCOUNT,
    SELECTEDPAYMENT,
    SELECTSTORELOCATION,
    SELECTCARD,
    SELECTUSERS,
    SETEMPLOYEENAME,
    SUBMITORDER,
    SETCUSTOMERINFO,
    RESTORDER
} from './constants'

const initialState = {
    orderType: -1,
    inventory: [],
    inventoryData:[],
    ship: [],
    shippinginfor: -1,
    customerinfo:{},
    customerInformation: {},
    discontValue:{},
    selectedStore: '',
    selectedCard: '',
    selectedUsers: [],
    employeeName: '',
    paymentId:'',
    orderResponseData: {},
    submitSuccess: false,
    state: REQUEST_STATUS.INITIAL
};

/* Action creators */

export const selectOrderType = createAction(SALESFORM_ORDERTYPE)
export const selectInventory = createAction(SELECT_INVENTORY)
export const selectShip = createAction(SELECT_SHIP)
export const selectShippingInfor = createAction(SELECT_SHIPPINGINFO)
export const selectedShippingInfor = createAction(SELECTED_SHIPPINGINFO)
export const selectedInventoryData = createAction(SELECTED_INVENTORYDATA)
export const discount = createAction(DISCOUNT)
export const selectedPayment = createAction(SELECTEDPAYMENT)
export const onSelectStoreLocation = createAction(SELECTSTORELOCATION)
export const onSelectCard = createAction(SELECTCARD)
export const onSelectUsers = createAction(SELECTUSERS)
export const onSetEmployeeName = createAction(SETEMPLOYEENAME)
export const onSetCustomerInfo = createAction(SETCUSTOMERINFO)

export const {
    start: submitOrder,
    success: submitOrderSuccess,
    fail: submitOrderFail,
} = defineLoopActions(SUBMITORDER)

export const onSubmitOrder = (data) => {

    const apiUrl = `/api/salesform/order`
    const token = getToken();

    return apiAction({
        url: apiUrl,
        method: "POST",
        accessToken: token,
        onStart: submitOrder,
        onSuccess: submitOrderSuccess,
        onFailure: submitOrderFail,
        data: data,
        label: SUBMITORDER
    });
}

export const submitOrderReset = createAction(RESTORDER)

export const SalesFormReducer = handleActions({

    [SALESFORM_ORDERTYPE]: (state, { payload }) => {
        return {
            ...state,
            orderType: payload
        };
    },

    [SELECT_INVENTORY]: (state, { payload }) => {
        return {
            ...state,
            inventory: payload
        };
    },
    [SELECT_SHIP]: (state, { payload }) => {
        return {
            ...state,
            ship: payload
        };
    },
    [SELECT_SHIPPINGINFO]: (state, { payload }) => {
        return {
            ...state,
            shippinginfor: payload
        };
    },
    [SELECTED_SHIPPINGINFO]: (state, { payload }) => {     
        return {
            ...state,
            customerinfo: payload
        };
    },
    [SELECTED_INVENTORYDATA]: (state, { payload }) => {
        return {
            ...state,
            inventoryData: payload
        };
    },
    [DISCOUNT]: (state, { payload }) => {
        return {
            ...state,
            discontValue: payload
        };
    },
    [SELECTEDPAYMENT]: (state, { payload }) => {
        return {
            ...state,
            paymentId: payload
        };
    },
    [SELECTSTORELOCATION]: (state, {payload}) => {
        return {
            ...state,
            selectedStore: payload
        }
    },
    [SELECTCARD]: (state, {payload}) => {
        return {
            ...state,
            selectedCard: payload
        }
    },
    [SELECTUSERS]: (state, {payload}) => {
        return{
            ...state,
            selectedUsers: payload
        }
    },
    [SETEMPLOYEENAME]: (state, {payload}) => {
        return {
            ...state,
            employeeName: payload
        }
    },

    [SETCUSTOMERINFO]: (state, { payload }) => {
        return {
            ...state,
            customerInformation: payload
        }
    },
    [RESTORDER]: (state, {payload}) => {
        return {
            ...initialState,
            ship: [],
            inventory: []
        }
    },

    ...requestLoopHandlers({
        action: SUBMITORDER,
        onSuccess: (state, payload) => {
            return {
                ...state,
                submitSuccess: true,
                error: {},
                orderResponseData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        },
        onFail: (state, payload) => {
            return {
                ...state,
                error: payload,
                submitSuccess: false,
                state: REQUEST_STATUS.FAIL
            }
        },
    }),

}, initialState)