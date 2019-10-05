import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_USERS,
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
    state: REQUEST_STATUS.INITIAL
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
} = defineLoopActions(FETCH_USERS)

export const {
    start: deleteUser,
    success: deleteUserSuccess,
    fail: deleteUserFail
} = defineLoopActions(DELETE_USER)

/* Actions  */

export const fetchUsers = () => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}dealerusers`

    return apiAction({
        url: apiUrl,
        accessToken: token,
        onStart: getUsers,
        onSuccess: getUsersSuccess,
        onFailure: getUsersFail,
        label: FETCH_USERS
    });

}

export const saveUser = (data) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}dealerusers`

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

export const deleteUserRequest = (id) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}dealerusers/${id}`

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
            state: REQUEST_STATUS.PENDING
        }),
        onSuccess: (state, payload) => {
            console.log(payload)
            return {
                ...state,
                isSubmitSuccess: payload.success,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: FETCH_USERS,
        onSuccess: (state, payload) => {
            return {
                ...state,
                usersData: payload.data,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: DELETE_USER,
        onStart: (state, payload) => ({
            ...state,
            isSubmitSuccess: false,
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                storesData: state.usersData.filter(user => user.id !== parseInt(payload.data)),
                state: REQUEST_STATUS.SUCCESS
            }
        }
    })

}, initialState)
