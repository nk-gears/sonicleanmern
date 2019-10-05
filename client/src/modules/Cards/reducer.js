import { handleActions } from 'redux-actions'
import { 
    GET_CARDS, 
    ADD_CARD,
    DELETE_CARD
} from './constants'
import { getToken } from '_helpers/token-helpers'

import { REQUEST_STATUS } from '_config/constants'
import { apiAction } from 'utils/apiCall'
import { defineLoopActions, requestLoopHandlers } from 'utils/state'

const initialState = {
    cardsData: [],
    isSubmitSuccess: false,
    state: REQUEST_STATUS.INITIAL
};

/* Action creators */
export const {
    start: getCards,
    success: getCardsSuccess,
    fail: getCardsFail
} = defineLoopActions(GET_CARDS)

export const {
    start: addCard,
    success: addCardSuccess,
    fail: addCardFail
} = defineLoopActions(ADD_CARD)

export const {
    start: deleteCard,
    success: deleteCardSuccess,
    fail: deleteCardFail
} = defineLoopActions(DELETE_CARD)

export const fetchCards = (customerid) => {
    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}cards/${customerid}`

    return apiAction({
        url: apiUrl,
        accessToken: token,
        onStart: getCards,
        onSuccess: getCardsSuccess,
        onFailure: getCardsFail,
        label: GET_CARDS
    });
}

export const saveCard = (data) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}cards`

    return apiAction({
        url: apiUrl,
        method: "POST",
        accessToken: token,
        onStart: addCard,
        onSuccess: addCardSuccess,
        onFailure: addCardFail,
        data: data,
        label: ADD_CARD
    });
}

export const deleteCardRequest = (id) => {

    const token = getToken();
    const appBaseURL = process.env.REACT_APP_API_URL;
    const apiUrl = `${appBaseURL}cards/${id}`

    return apiAction({
        url: apiUrl,
        method: "DELETE",
        accessToken: token,
        onStart: deleteCard,
        onSuccess: deleteCardSuccess,
        onFailure: deleteCardFail,
        label: DELETE_CARD
    });
}

export const CardReducer = handleActions({
    ...requestLoopHandlers({
        action: ADD_CARD,
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
        action: GET_CARDS,
        onSuccess: (state, payload) => {
            return {
                ...state,
                cardsData: payload.data,
                state: REQUEST_STATUS.SUCCESS
            }
        }
    }),

    ...requestLoopHandlers({
        action: DELETE_CARD,
        onStart: (state, payload) => ({
            ...state,
            isSubmitSuccess: false,
        }),
        onSuccess: (state, payload) => {
            return {
                ...state,
                cardsData: state.cardsData.filter(card => card.id !== parseInt(payload.data)),
            }
        }
    })

}, initialState)
