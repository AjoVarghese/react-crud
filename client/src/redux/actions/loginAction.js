import { ActionTypes } from "../constants/actionTypes";

export const userLogin = (result) => async(dispatch) => {
    console.log('login res',result);
    try {
        console.log('login result',result);
        dispatch({
            type : ActionTypes.LOGIN_SUCCESS,
            payload : result
        })
        localStorage.setItem("userInfo",JSON.stringify(result))
    } catch (error) {
        console.log(result.response.error);
        dispatch({
            type : ActionTypes.LOGIN_FAILED,
            payload : result.response.error
        })
    }
}