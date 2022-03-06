import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { EventTypes } from "../actionTypes";

import axiosInstance from "./../../helpers/axiosInstance";


export const getAllEvents = createAsyncThunk(
  "events/list",
 async (props,{ dispatch }) => {
    axiosInstance(dispatch).get("/events/list/")
    .then((res: AxiosResponse)=> {
      const { data } = res.data
      return dispatch({
        type: EventTypes.listEventsSuccess,
        payload: {
          list: data,
        },
      });
    })
    .catch((error: AxiosError)=> {
      console.log( error.response)
      return dispatch({
        type: EventTypes.listEventsFailed,
        payload: {
          message: "Error en los eventos",
        },
      });
    })
  }
);
