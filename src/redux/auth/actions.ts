import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { toastTypeValues } from "../../constants";
import { AuthTypes } from "../actionTypes";
import { startLoading, stopLoading } from "../loading/actions";
import { showToast } from "../toast/actions";

import axiosInstance from "./../../helpers/axiosInstance";

interface LoginParams {
  email: String;
  password: String;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams, { dispatch }) => {
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
}


export const register = createAsyncThunk(
  "auth/register",
  async (data:registerParams, { dispatch }) => {
    dispatch(startLoading());
    console.log(data);
    
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
