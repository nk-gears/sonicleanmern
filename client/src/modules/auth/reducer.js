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
    LOGOUT
 } from './constants'

const initialState = {
    token: '',
    isLoggedIn: !!getToken(),
    user: {},
    state: REQUEST_STATUS.INITIAL,
    error: {}
}

export const {
    start: register,
    success: registerSuccess,
    fail: registerFail,
} = defineLoopActions(REGISTER)

export const {
    start: login,
    success: loginSuccess,
    fail: loginFail,
} = defineLoopActions(LOGIN)

export const logout = createAction(LOGOUT)

export const fetchRegister = (data) => {

        const appBaseURL = process.env.REACT_APP_API_URL;
        const apiUrl = `${appBaseURL}/users/register`

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
    const appBaseURL = process.env.REACT_APP_API_URL;
        const apiUrl = `${appBaseURL}/users/login`

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

export const authReducer = handleActions({
    ...requestLoopHandlers({
        action: REGISTER, 
        onSuccess: (state, payload) => {
            console.log(payload)
            return {
                ...state,
                state: REQUEST_STATUS.SUCCESS
            }
        },
    }),
    ...requestLoopHandlers({
        action: LOGIN,
        onSuccess: (state, payload) => {
            console.log(payload)
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
                state: REQUEST_STATUS.SUCCESS
            }
        },
    }),
    [LOGOUT]: (state) => {
        removeToken()
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        return {
            ...state,
            token: '',
            user: {},
            state: REQUEST_STATUS.INITIAL,
            isLoggedIn: false,
        }
    }
}, initialState)