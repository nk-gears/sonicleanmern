import { createAction } from 'redux-actions'
import { REQUEST_STATUS } from '_config/constants'

export const requestSuccess = (actionType) => `${actionType}/success`

export const requestFail = (actionType) => `${actionType}/fail`

export const requestResetState = (actionType) => `${actionType}/reset`

export const requestEnd = (actionType) => `${actionType}/end`

export const defineLoopActions = (actionType) => ({
    start: createAction(actionType),
    success: createAction(requestSuccess(actionType)),
    fail: createAction(requestFail(actionType)),
    end: createAction(requestEnd(actionType)),
    reset: createAction(requestResetState(actionType))
})

export function requestLoopHandlers(config) {
    /*
     * This function will be used for registering async request loop handlers for update request
     * such as GET, POST, PUT and DELETE RESTful API calls.
     * It'll handle initial, success and fail cases.
     * `action` and `stateField` are required as config values.
     */
    let {
        action,
        onStart, onSuccess, onFail, onEnd,
    } = config

    if (!action ) {
        throw new Error('action and stateField should be set for generating update request loop handlers')
    }

    return {
        [action]: (state, { payload }) => {
            if (onStart) {
                return onStart(state, payload)
            } else {
                return {
                    ...state,
                    state: REQUEST_STATUS.PENDING
                }
            }
        },
        [requestSuccess(action)]: (state, { payload }) => {
            if (onSuccess) {
               return onSuccess(state, payload)
            } else {
                return {
                    ...state,
                    state: REQUEST_STATUS.SUCCESS
                }
            }
        },
        [requestFail(action)]: (state, { payload }) => {
            console.log(payload)
            if (onFail) {
                return onFail(state, payload)
            } else {
                return {
                    ...state,
                    error: payload,
                    state: REQUEST_STATUS.FAIL
                }
            }
        },
    }
}
