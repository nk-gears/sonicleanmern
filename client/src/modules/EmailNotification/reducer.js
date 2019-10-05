import { createAction, handleActions } from 'redux-actions'
import { FETCH_EMAILNOTIFICATION, FAILURE_EMAILNOTIFICATION } from './constants'
import { getToken } from '_helpers/token-helpers'

const initialState = {
    emailNotificationData: []
};

export const fetchEmailNotification = () => {
    return dispatch => {
        try {
            const appBaseURL = process.env.REACT_APP_API_URL;
            const token = getToken();
            fetch(appBaseURL + "dealerusers", {
                method: "GET",
                headers: [
                    ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],
                    ['Authorization', `Bearer ${token}`],
                    ["Content-Type", "application/json"],
                ]
            })
                .then(response => response.json())
                .then(data => {
                    var emailOption = data.data.map(x => { return { value: x.id, label: x.name } })
                    dispatch({
                        type: FETCH_EMAILNOTIFICATION,
                        payload: emailOption
                    });
                });
        } catch (error) {
            dispatch(failureEmail());
        }
    }
}
/* Action creators */
export const failureEmail = createAction(FAILURE_EMAILNOTIFICATION)

export const EmailNotificationReducer = handleActions({
    [FETCH_EMAILNOTIFICATION]: (state, { payload }) => {
        return {
            ...state,
            emailNotificationData: payload,
        };
    },
    [FAILURE_EMAILNOTIFICATION]: (state) => {
        return {
            ...state
        };
    },
}, initialState)
