import { registerApi } from "../../api/api";
import { ActionTypes } from "../constants/actionTypes";
import { useNavigate } from "react-router-dom"


export const userRegister = (result) => async(dispatch) => {
    console.log('called');
    console.log(result.data);
    try {
        // registerApi(Name, Email, Password).then((data) => {
        //     console.log('register',data.data);
        //     dispatch({
        //         type : ActionTypes.REGISTER_SUCCESS,
        //         payload : data.data
        //     })
        // }).catch((err) => {
        //     console.log('error in reg:',err);
        //     dispatch({
        //         type : ActionTypes.REGISTER_FAILED,
        //         payload : err
        //     })
        // })
        dispatch ({
            type : ActionTypes.REGISTER_SUCCESS,
            payload : result.data
        })

    } catch (error) {
        console.log('err in reg',error);
    }
    
    
}