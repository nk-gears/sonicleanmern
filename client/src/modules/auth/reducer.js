import { handleActions, createAction } from 'redux-actions'
import jwt_decode from "jwt-decode";
import { setToken, getToken, removeToken } from '_helpers/token-helpers'
import { REQUEST_STATUS } from '_config/constants'

import setAuthToken from 'utils/setAuthToken'

import { apiAction } from 'utils/apiCall'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'

import {
    LOGIN,
    REGISTER,
    LOGOUT,
    RESTPASSWORD
 } from './constants'

const initialState = {
    token: '',
    isLoggedIn: !!getToken(),
    user: {},
    registerState: REQUEST_STATUS.INITIAL,
    loginState: REQUEST_STATUS.INITIAL,
    resetPasswordState: REQUEST_STATUS.INITIAL,
    error: {}
}

export const {
    start: register,
    success: registerSuccess,
    fail: registerFail,
    reset: registerResetState
} = defineLoopActions(REGISTER)

export const {
    start: login,
    success: loginSuccess,
    fail: loginFail,
    reset: loginResetState
} = defineLoopActions(LOGIN)

export const {
    start: resetPassword,
    success: resetPasswordSuccess,
    fail: resetPasswordFail,
} = defineLoopActions(RESTPASSWORD)

export const logout = createAction(LOGOUT)

export const fetchRegister = (data) => {

        // const appBaseURL = process.env.REACT_APP_API_URL;
        const apiUrl = `/api/users/register`

        return apiAction({
            url: apiUrl,
            method: 'POST',
            data: data,
            onStart: register,
            onSuccess: registerSuccess,
            onFailure: registerFail,
            label: REGISTER
        });
}

export const fetchLogin = (data) => {
    // const appBaseURL = process.env.REACT_APP_API_URL;
        const apiUrl = `/api/users/login`

        return apiAction({
            url: apiUrl,
            method: 'POST',
            data: data,
            onStart: login,
            onSuccess: loginSuccess,
            onFailure: loginFail,
            label: LOGIN
        });
}

export const fetchResetPassword = (data) => {

    const apiUrl = `/api/users/confirmation`

    return apiAction({
        url: apiUrl,
        method: 'POST',
        data: data,
        onStart: resetPassword,
        onSuccess: resetPasswordSuccess,
        onFailure: resetPasswordFail,
        label: RESTPASSWORD
    });
}

export const authReducer = handleActions({
    ...requestLoopHandlers({
        action: REGISTER, 
        onStart: (state, payload) => {
            return {
                ...state,
                registerState: REQUEST_STATUS.PENDING
            }
        },
        onSuccess: (state, payload) => {
            return {
                ...state,
                error: {},
                registerState: REQUEST_STATUS.SUCCESS
            }
        },
        onFail: (state, payload) => {
            return {
                ...state,
                error: payload,
                isLoggedIn: false,
                registerState: REQUEST_STATUS.FAIL
            }
        },
        initialValue: initialState
    }),

    ...requestLoopHandlers({
        action: LOGIN,
        onStart: (state, payload) => {
            return {
                ...state,
                isLoggedIn: false,
                loginState: REQUEST_STATUS.PENDING
            }
        },
        onSuccess: (state, payload) => {
            const {token} = payload
            localStorage.setItem("jwtToken", token);
            setToken(token)
            setAuthToken(token);
            const decoded = jwt_decode(token);
            return {
                ...state,
                token: payload.token,
                user: decoded,
                isLoggedIn: true,
                error: {},
                loginState: REQUEST_STATUS.SUCCESS
            }
        },
        onFail: (state, payload) => {
            return {
                ...state,
                error: payload,
                isLoggedIn: false,
                loginState: REQUEST_STATUS.FAIL
            }
        },
        initialValue: initialState
    }),

    ...requestLoopHandlers({
        action: RESTPASSWORD, 
        onStart: (state, payload) => {
            return {
                ...state,
                resetPasswordState: REQUEST_STATUS.PENDING
            }
        },
        onSuccess: (state, payload) => {
            return {
                ...state,
                error: {},
                resetPasswordState: REQUEST_STATUS.SUCCESS
            }
        },
        initialValue: initialState
    }),

    [LOGOUT]: (state) => {
        removeToken()
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        return {
            ...state,
            token: '',
            user: {},
            loginState: REQUEST_STATUS.INITIAL,
            isLoggedIn: false,
        }
    }
}, initialState)