import { ActionTypes } from "../../constants/actionTypes";

export const registerReducer = (state = {}, {type,payload}) => {
    switch(type){
        case ActionTypes.REGISTER_REQUEST:
            return {
                loading : true
            }
        case ActionTypes.REGISTER_SUCCESS:
                return {
                    registerData : payload
                }
        case ActionTypes.REGISTER_FAILED:
               return {
                loading : true,
                registerError : payload
               }
        default : {
            return state
        }
    }
}