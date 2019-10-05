import { handleActions } from 'redux-actions'
import {FETCH_TAXES,FAILURE_TAXES} from './constants'
import { getToken } from '_helpers/token-helpers'

const initialState = { 
  isSubmitSuccess:false
};
export const fetchTaxes  = (request) => {  
    return dispatch => {
        try {        
        const token =getToken(); 
        const appBaseURL = process.env.REACT_APP_API_URL;     
        fetch(appBaseURL + "taxes", 
        {
            method: "POST",
            headers: [
                ['ACCESS-CONTROL-ALLOW-ORIGIN', '*'],                
                ['Authorization',`Bearer ${token}`],
                ["Content-Type", "application/json"],
              ],
              body: JSON.stringify(request)        
            })
            .then(response => response.json())
            .then(data => { 
                 if(data.success === true)
                 {  
                    dispatch({
                        type: FETCH_TAXES,
                        payload: data.data
                       });
                 }
                else
                {
                dispatch({
                  type: FAILURE_TAXES,
                  payload: data.data
                 });
            }
       })   
    } catch (error) {
        dispatch({
            type: FAILURE_TAXES,
            payload: error
        });   
    }
  }
}

/* Action creators */
export const TaxesReducer = handleActions({
    [FETCH_TAXES]: (state, {payload}) => {        
        return {
            ...state, 
            response: payload,             
            isSubmitSuccess:true
        };
    },
    [FAILURE_TAXES]: (state, {payload}) => {       
          return {
              ...state,
              response: payload,    
              isSubmitSuccess:false                 
          };
      },

}, initialState)