import { ActionTypes } from "../constants/actionTypes";

export const imageUpload = (result) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.IMAGE_UPLOAD_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.IMAGE_UPLOAD_FAILED,
      payload: result,
    });
  }
};

export const editProfileAction = (result) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.EDIT_PROFILE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.EDIT_PROFILE_FAILED,
      payload: result,
    });
  }
};
