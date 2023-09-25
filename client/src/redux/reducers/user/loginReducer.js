import { ActionTypes } from "../../constants/actionTypes";

export const loginReducer = (state = {}, {type,payload}) => {
    switch(type){
        case ActionTypes.LOGIN_REQUEST:
            return {
                loading : true
            }
        case ActionTypes.LOGIN_SUCCESS:
                return {
                    loginData : payload
                }
        case ActionTypes.LOGIN_FAILED:
               return {
                loading : true,
                loginError : payload
               }
        default : {
            return state
        }
    }
}