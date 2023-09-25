import { combineReducers } from "redux";
import { registerReducer } from "./user/registerReducer";
import { loginReducer } from "./user/loginReducer";
import { editProfileReducer, imageUploadReducer } from "./user/profileReducer";
import { addressReducer } from "./user/addressReducer";

const reducers = combineReducers({
  registerReducer : registerReducer,
  loginReducer : loginReducer,
  imageUploadReducer : imageUploadReducer,
  editProfileReducer : editProfileReducer,
  addressReducer : addressReducer,
})

export default reducers