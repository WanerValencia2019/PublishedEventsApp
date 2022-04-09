import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./auth";
import eventReducers from "./events";
import toastReducers from "./toast";
import loadingReducers from "./loading";

export default combineReducers({
    auth: authReducers,
    events: eventReducers,
    toast: toastReducers,
    loading: loadingReducers
});