import { Dispatch } from "@reduxjs/toolkit";
import { DispatchProp } from "react-redux";
import { ToastTypes } from "../actionTypes";
import { initialToastType } from ".";

interface actionToast {
  type: String;
  payload: initialToastType;
}

export const showToast =
  ({ message, message_two, type }: initialToastType) =>
  (dispatch: Dispatch) => {
    dispatch<actionToast>({
      type: ToastTypes.showToast,
      payload: { show: true, message, message_two, type },
    });
  };
export const hideToat = (dispatch: Dispatch) => {
  dispatch({ type: ToastTypes.hideToast });
};
