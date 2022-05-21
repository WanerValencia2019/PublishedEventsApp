import { createAction, createReducer } from "@reduxjs/toolkit";
import { generateString } from "../../utils";
import { AuthTypes } from "../actionTypes";
import { loadProfileSuccessReducer, loginSuccessReducer, logoutReducer, registerSuccessReducer } from "./reducers";

export interface AuthTypeData {
  user: {
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string,
    description?: string,
    identification: string,
    image?:string,
  };
  token: any;
  isAuthenticated: Boolean;
  id_log: string;
}

const initialState: AuthTypeData = {
  user: {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    identification: "",
  },
  token: null,
  isAuthenticated: false,
  id_log: '',
};

const loginSuccess = createAction<AuthTypeData>(AuthTypes.loginSuccess);
const loginFailed = createAction<AuthTypeData>(AuthTypes.loginFailed);

const registerSuccess = createAction<AuthTypeData>(AuthTypes.registerSuccess);
const registerFailed = createAction<AuthTypeData>(AuthTypes.registerFailed);

const loadProfileSuccess = createAction<AuthTypeData>(AuthTypes.loadProfileSuccess);
const loadProfileFailed = createAction<AuthTypeData>(AuthTypes.loadProfileFailed);

const logout = createAction<AuthTypeData>(AuthTypes.logout);

const updateProfileSuccess = createAction<AuthTypeData>(AuthTypes.updateProfileSuccess);
const updateProfileFailed = createAction<AuthTypeData>(AuthTypes.updateProfileFailed);

export default createReducer(initialState, (builder) => {
  builder.addCase(loginSuccess, loginSuccessReducer);
  builder.addCase(loginFailed, (state, action) => {
    state.isAuthenticated = false;
    state.token = null;
  });
  builder.addCase(registerSuccess, registerSuccessReducer);
  builder.addCase(loadProfileSuccess, loadProfileSuccessReducer);
  builder.addCase(loadProfileFailed, () => {});
  builder.addCase(logout, logoutReducer);
});
