import { createAction, createReducer } from "@reduxjs/toolkit";
import { AuthTypes } from "../actionTypes";
import { loginSuccessReducer, registerSuccessReducer } from "./reducers";


export interface AuthTypeData {
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    token: any,
    isAuthenticated: Boolean,
}

const initialState: AuthTypeData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    token: null,
    isAuthenticated: false
} 

const loginSuccess = createAction<any>(AuthTypes.loginSuccess)
const loginFailed = createAction<any>(AuthTypes.loginFailed)

const registerSuccess = createAction<any>(AuthTypes.registerSuccess)
const registerFailed = createAction<any>(AuthTypes.registerFailed)


export default createReducer(initialState, (builder)=> {
    builder.addCase(loginSuccess, loginSuccessReducer)
    builder.addCase(loginFailed, (state, action) => {
        state.isAuthenticated = false
        state.token = null
    })
    builder.addCase(registerSuccess, registerSuccessReducer);
})


