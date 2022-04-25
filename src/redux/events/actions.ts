import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { EventTypes } from "../actionTypes";
import { startLoading, stopLoading } from "../loading/actions";

import axiosInstance from "./../../helpers/axiosInstance";


export const getAllEvents = createAsyncThunk(
  "events/list",
 async (props,{ dispatch }) => {
    axiosInstance(dispatch).get("/events/list/")
    .then((res: AxiosResponse)=> {
      dispatch(startLoading())
      const { data } = res.data      
      return dispatch({
        type: EventTypes.listEventsSuccess,
        payload: {
          list: data,
        },
      });
    })
    .catch((error: AxiosError)=> {
      console.log(error)
      return dispatch({
        type: EventTypes.listEventsFailed,
        payload: {
          message: "Error en los eventos",
        },
      });
    })
    .finally(()=>dispatch(stopLoading()))
  }
);

interface nearEventsParams {
  latitude: number;
  longitude: number;
}

export const getNearEvents = createAsyncThunk(
  "events/list",
 async ({ latitude, longitude }:nearEventsParams,{ dispatch }) => {
    axiosInstance(dispatch).get(`/events/nearby?latitude=${latitude}&longitude=${longitude}`)
    .then((res: AxiosResponse)=> {
      dispatch(startLoading())
      const { data } = res.data
      console.log(data);
            
      return dispatch({
        type: EventTypes.listNearEventsSuccess,
        payload: {
          list: data,
        },
      });
    })
    .catch((error: AxiosError)=> {
      return dispatch({
        type: EventTypes.listNearEventsFailed,
        payload: {
          message: "Error en los eventos",
        },
      });
    })
    .finally(()=>dispatch(stopLoading()))
  }
);