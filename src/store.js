import {createStore } from "redux";
import appReducer from './reducers/appReducer'
const  store = createStore(appReducer);
window.store = store
export default store;