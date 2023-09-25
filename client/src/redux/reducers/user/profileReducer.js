import { ActionTypes } from "../../constants/actionTypes";

export const imageUploadReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case ActionTypes.IMAGE_UPLOAD_REQUEST :
            return {
                loading : true
            }
        case ActionTypes.IMAGE_UPLOAD_SUCCESS : 
            return {
                imageData : payload
            }    
        case ActionTypes.IMAGE_UPLOAD_FAILED : 
            return {
                imageUploadError : payload
            }
            default : {
                return state
            }  
    }
}

export const editProfileReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case ActionTypes.EDIT_PROFILE_REQUEST :
            return {
                loading : true
            }
        case ActionTypes.EDIT_PROFILE_SUCCESS : 
            return {
                profileData : payload
            }    
        case ActionTypes.IMAGE_UPLOAD_FAILED : 
            return {
                profileDataError: payload
            }
            default : {
                return state
            }  
    }
}