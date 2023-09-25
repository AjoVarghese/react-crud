import { ActionTypes } from "../constants/actionTypes";

export const imageUpload = (result) => async(dispatch) => {
    console.log('imageuploadAction ddata', result);
    try {
        dispatch({
            type : ActionTypes.IMAGE_UPLOAD_SUCCESS,
            payload : result
        })
    } catch (error) {
        dispatch({
            type : ActionTypes.IMAGE_UPLOAD_FAILED,
            payload : result
        })
    }
}

export const editProfileAction = (result) => async(dispatch) => {
    console.log('edit prf',result);
    try {
        dispatch({
            type : ActionTypes.EDIT_PROFILE_SUCCESS,
            payload : result
        })
    } catch (error) {
        dispatch({
            type : ActionTypes.EDIT_PROFILE_FAILED,
            payload : result
        })
    }
}