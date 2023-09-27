import { ActionTypes } from "../constants/actionTypes";

export const userLogin = (result) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: result,
    });
    localStorage.setItem("userInfo", JSON.stringify(result));
  } catch (error) {
    dispatch({
      type: ActionTypes.LOGIN_FAILED,
      payload: result.response.error,
    });
  }
};
