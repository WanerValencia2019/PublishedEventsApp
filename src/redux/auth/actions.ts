import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { AuthTypes } from "../actionTypes";

import axiosInstance from "./../../helpers/axiosInstance";

interface LoginParams {
  email: String;
  password: String;
}

export const login = createAsyncThunk(
  "auth/login",
 async ({ email, password }: LoginParams, { dispatch }) => {
    const data = {
      username: email,
      password,
    };
    axiosInstance(dispatch).post("http://192.168.1.4:8000/published_events/api/auth/login/", data)
    .then((res: AxiosResponse)=> {
      const { data } = res
      return dispatch({
        type: AuthTypes.loginSuccess,
        payload: {
          data: data,
        },
      });
    })
    .catch((error: AxiosError)=> {
      console.log( error.response?.status)
      return dispatch({
        type: AuthTypes.loginFailed,
        payload: {
          message: "Logrado",
        },
      });
    })
  }
);
