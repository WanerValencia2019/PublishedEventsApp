import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./auth";
import eventReducers from "./events";


export default combineReducers({
    auth: authReducers,
    events: eventReducers
});