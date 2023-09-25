import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
// import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './reducers'

const userInfo = JSON.parse(localStorage.getItem("userInfo"))


const initialState = {
    userLoginReducer : {userLoginDetails : userInfo}
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
    // composeWithDevTools(applyMiddleware(thunk))
)

export default store