import { Dispatch } from "@reduxjs/toolkit";
import { DispatchProp } from "react-redux";
import { LoadingTypes, ToastTypes } from "../actionTypes";


export const startLoading = () => (dispatch: Dispatch) => {
    dispatch({
      type: LoadingTypes.startLoading
    });
  };
export const stopLoading = () => (dispatch: Dispatch) => {
  dispatch({ type: LoadingTypes.stopLoading });
};
