import { ActionTypes } from "../constants/actionTypes";

export const userRegister = (result) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (error) {}
};
