import { createAction, handleActions } from 'redux-actions'
import { 
    SUCCESS_SAVE_STORES, 
    FAILURE_SAVE_STORES, 
    FAILURE_FETCH_STORES,
    GETSTORES,
    DELETESTORE,
    ADDSTORE,
    UPDATESTORE
} from './constants'
import { REQUEST_STATUS } from '_config/constants'
import { getToken } from '_helpers/token-helpers'
import { apiAction } from 'utils/apiCall'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'
const initialState = {
    storesData: [],
    isSubmitSuccess: false,
    state: REQUEST_STATUS.INITIAL
};

/* Action creators */
export const {
    start: addStore,
    success: addStoreSuccess,
    fail: addStoreFail
} = defineLoopActions(ADDSTORE)

export const {
    start: getStores,
    success: getStoresSuccess,
    fail: getStoresFail
} = defineLoopActions(GETSTORES)

export const {
    start: updateStore,
    success: updateStoreSuccess,
    fail: updateStoreFail
} = defineLoopActions(UPDATESTORE)

export const {
    start: deleteStore,
    success: deleteStoreSuccess,
    fail: deleteStoreFail
} = defineLoopActions(DELETESTORE)

export const successSaveStores = createAction(SUCCESS_SAVE_STORES)
export const failurefetchstore = createAction(FAILURE_FETCH_STORES)

/* Actions  */
export const fetchStores = () => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}stores`

    return apiAction({
        url: apiUrl,
        accessToken: token,
        onStart: getStores,
        onSuccess: getStoresSuccess,
        onFailure: getStoresFail,
        label: GETSTORES
    });

}

export const savestore = (data) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}stores`

    return apiAction({
        url: apiUrl,
        method: 'POST',
        accessToken: token,
        data: data,
        onStart: addStore,
        onSuccess: addStoreSuccess,
        onFailure: addStoreFail,
        label: ADDSTORE
    });
}


export const updatestore = (data, id) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}stores/${id}`

    return apiAction({
        url: apiUrl,
        method: 'PUT',
        accessToken: token,
        data: data,
        onStart: addStore,
        onSuccess: addStoreSuccess,
        onFailure: addStoreFail,
        label: ADDSTORE
    });
}

export const deleteStoreRequest = (id) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}stores/${id}`

    return apiAction({
        url: apiUrl,
        method: "DELETE",
        accessToken: token,
        onStart: deleteStore,
        onSuccess: deleteStoreSuccess,
        onFailure: deleteStoreFail,
        label: DELETESTORE
    });
}

/* Reducers  */
export const StoreReducer = handleActions({
    ...requestLoopHandlers({
        action: ADDSTORE,
        onStart: (state, payload) => ({
            ...state,
            isSubmitSuccess: false,
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                isSubmitSuccess: payload.success,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: GETSTORES,
        onSuccess: (state, payload) => {
            var stores = payload.data.map(store => { return { id: store.id, customerid: store.customer_id, name: store.name, address1: store.shippingaddress1, city: store.shippingcity, state: store.shippingstate, zip: store.shippingzip, address2: store.shippingaddress2, phone: store.storephone, firstName: "", lastName: "", } })
           
            return {
                ...state,
                storesData: stores,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: DELETESTORE,
        onStart: (state, payload) => ({
            ...state,
            isSubmitSuccess: false,
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                storesData: state.storesData.filter(store => store.id !== parseInt(payload.data)),
                state: REQUEST_STATUS.SUCCESS
            }
        }
    })

}, initialState)
