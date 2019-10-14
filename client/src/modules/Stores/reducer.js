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
    storebyId: [],
    state: REQUEST_STATUS.INITIAL,
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

    const apiUrl = `/api/store/list`
    const token = getToken();

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

    const apiUrl = `/api/store/add`
    const token = getToken();

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


export const putstore = (data, id) => {

    const apiUrl = `/api/store/update/${id}`
    const token = getToken();

    return apiAction({
        url: apiUrl,
        method: 'PUT',
        accessToken: token,
        data: data,
        onStart: updateStore,
        onSuccess: updateStoreSuccess,
        onFailure: updateStoreFail,
        label: UPDATESTORE
    });
}

export const deleteStoreRequest = (id) => {

    const apiUrl = `/api/store/delete/${id}`
    const token = getToken();

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
        onSuccess: (state, payload) => {
            return {
                ...state,
                storesData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: UPDATESTORE,
        onSuccess: (state, payload) => {
            console.log(payload)
            return {
                ...state,
                storesData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: GETSTORES,
        onSuccess: (state, payload) => {
            return {
                ...state,
                storesData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: DELETESTORE,
        onSuccess: (state, payload) => {
            return {
                ...state,
                storesData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    })

}, initialState)
