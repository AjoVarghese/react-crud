import { deleteAddressApi, getAddressApi } from "../../api/api";
import { ActionTypes } from "../constants/actionTypes";

export const addAddressAction = (result) => async(dispatch) => {
    console.log('add address action fun',result);
    try {
        dispatch({
            type : ActionTypes.ADD_ADDRESS_SUCCESS,
            payload : result
        })
    } catch (error) {
        console.log('add address err',result.response.error);
        dispatch({
            type : ActionTypes.ADD_ADDRESS_FAILED,
            payload : result.response.error
        })
    }
}

export const getAddressAction = (userId) => async(dispatch) => {
    getAddressApi(userId).then((data) => {
        console.log('get address api',data.data);
        dispatch({
            type : ActionTypes.GET_ADDRESS_SUCCESS,
            payload: data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : ActionTypes.GET_ADDRESS_FAILED,
            payload : err
        })
    })
}

export const deleteAddressAction = (addressId,userId) => async(dispatch) =>{
    deleteAddressApi(addressId,userId).then((data) => {
        console.log('delete address api',data);
        dispatch({
            type : ActionTypes.DELETE_ADDRESS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : ActionTypes.DELETE_ADDRESS_FAILED,
            payload : err
        })
    })
}