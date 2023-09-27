import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
  userLoginReducer: { userLoginDetails: userInfo },
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
