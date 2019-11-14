import { handleActions } from 'redux-actions'
import {
    GETUSERSLIST,
    ADD_USER,
    DELETE_USER
} from './constants'
import { REQUEST_STATUS } from '_config/constants'
import { getToken } from '_helpers/token-helpers'
import { apiAction } from 'utils/apiCall'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'
const initialState = {
    usersData: [],
    isSubmitSuccess: false,
    state: REQUEST_STATUS.INITIAL,
    error: {}
};

/* Action creators */
export const {
    start: addUser,
    success: addUserSuccess,
    fail: addUserFail
} = defineLoopActions(ADD_USER)

export const {
    start: getUsers,
    success: getUsersSuccess,
    fail: getUsersFail
} = defineLoopActions(GETUSERSLIST)

export const {
    start: deleteUser,
    success: deleteUserSuccess,
    fail: deleteUserFail
} = defineLoopActions(DELETE_USER)

/* Actions  */

export const fetchUsers = (id) => {

    const apiUrl = `/api/employee/${id}`
    const token = getToken();

    return apiAction({
        url: apiUrl,
        accessToken: token,
        onStart: getUsers,
        onSuccess: getUsersSuccess,
        onFailure: getUsersFail,
        label: GETUSERSLIST
    });

}

export const saveUser = (data, id) => {

    const apiUrl = `/api/employee/new/${id}`
    const token = getToken();

    return apiAction({
        url: apiUrl,
        method: 'POST',
        accessToken: token,
        data: data,
        onStart: addUser,
        onSuccess: addUserSuccess,
        onFailure: addUserFail,
        label: ADD_USER
    });
}

export const deleteUserRequest = (id, dealer) => {

    const apiUrl = `/api/employee/delete/${id}/${dealer}`
    const token = getToken();

    return apiAction({
        url: apiUrl,
        method: "DELETE",
        accessToken: token,
        onStart: deleteUser,
        onSuccess: deleteUserSuccess,
        onFailure: deleteUserFail,
        label: DELETE_USER
    });
}

/* Reducers  */
export const UserReducer = handleActions({
    ...requestLoopHandlers({
        action: ADD_USER,
        onStart: (state, payload) => ({
            ...state,
            isSubmitSuccess: false,
            error: {},
            state: REQUEST_STATUS.PENDING
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                error: {},
                usersData: payload,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: GETUSERSLIST,
        onSuccess: (state, payload) => {
            return {
                ...state,
                usersData: payload,
                error: {},
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: DELETE_USER,
        onStart: (state, payload) => ({
            ...state,
            state: REQUEST_STATUS.PENDING,
            error: {}
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                usersData: payload,
                state: REQUEST_STATUS.SUCCESS,
                error: {}
            }
        }
    })

}, initialState)
