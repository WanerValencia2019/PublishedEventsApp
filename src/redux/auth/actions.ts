import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { AxiosBasicCredentials, AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { toastTypeValues } from "../../constants";
import { AuthTypes } from "../actionTypes";
import { startLoading, stopLoading } from "../loading/actions";
import { showToast } from "../toast/actions";

import axiosInstance from "./../../helpers/axiosInstance";

interface LoginParams {
  email: String;
  password: String;
  navigate: any
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }: LoginParams, { dispatch }) => {
    dispatch(startLoading());
    const data = {
      username: email,
      password,
    };
    axiosInstance(dispatch)
      .post("/auth/login/", data)
      .then((res: AxiosResponse) => {
        const { data } = res;
        dispatch(
          showToast({ message: "Bienvenido", type: toastTypeValues.success })
        );
        navigate("Drawer", { screen: "initial" })
        return dispatch({
          type: AuthTypes.loginSuccess,
          payload: {
            data: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        const { response } = error;
        if (error.response?.status === 401) {
          dispatch(
            showToast({
              message: response?.data?.detail,
              type: toastTypeValues.error,
            })
          );
        }
        return dispatch({
          type: AuthTypes.loginFailed,
          payload: {
            message: "Logrado",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);


type registerParams = {
  //username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  navigate: any
}


export const register = createAsyncThunk(
  "auth/register",
  async (data:registerParams, { dispatch }) => {
    dispatch(startLoading());    
    const dataToSend = { 
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    }
    axiosInstance(dispatch)
      .post("/auth/register/", dataToSend)
      .then((res: AxiosResponse) => {
        const { data } = res;
        dispatch(
          showToast({ message: "Bienvenido a la familia", type: toastTypeValues.success })
        );
        data?.navigate("Drawer", { screen: "initial" })
        return dispatch({
          type: AuthTypes.registerSuccess,
          payload: {
            data: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        const { response } = error;        
        if (error.response?.status === 400) {
          dispatch(
            showToast({
              message: response?.data?.message[0],
              type: toastTypeValues.error,
            })
          );
        }
        return dispatch({
          type: AuthTypes.registerFailed,
          payload: {
            message: "Logrado",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);


interface loadProfileParams {
  token: string;
}

export const loadProfile = createAsyncThunk(
  "auth/register",
  async ({ token }:loadProfileParams, { dispatch }) => {
    dispatch(startLoading());

    const headers:AxiosRequestHeaders = {
       Authorization: `Bearer ${token}`,
    }
    
    axiosInstance(dispatch)
      .get("/user/profile/",{headers})
      .then((res: AxiosResponse) => {
        const { data: { user } } = res.data;
        return dispatch({
          type: AuthTypes.loadProfileSuccess,
          payload: {
            data: user,
          },
        });
      })
      .catch((error: AxiosError) => {
        const { response } = error;        
        if (error.response?.status === 400) {
          dispatch(
            showToast({
              message: response?.data?.message[0],
              type: toastTypeValues.error,
            })
          );
        }
        return dispatch({
          type: AuthTypes.loadProfileFailed,
          payload: {
            message: "Logrado",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);

export const logout = () => (dispatch: Dispatch) => {
  return dispatch({
    type: AuthTypes.logout,
  });
}