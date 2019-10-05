import { createAction, handleActions } from 'redux-actions'

import {
    SALESFORM_ORDERTYPE,
    SELECT_INVENTORY,
    SELECT_SHIP,
    SELECT_SHIPPINGINFO, SELECTED_SHIPPINGINFO,SELECTED_INVENTORYDATA,DISCOUNT,SELECTEDPAYMENT
} from './constants'



const initialState = {
    orderType: -1,
    inventory: [],
    inventoryData:[],
    ship: [],
    shippinginfor: -1,
    customerinfo:{},
    discontValue:{},
    paymentId:''
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
    }
}, initialState)