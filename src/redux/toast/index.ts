import { createAction, createReducer } from "@reduxjs/toolkit"
import { generateString } from "../../utils";
import { EventTypes, ToastTypes } from "../actionTypes"
import { hideToastReducer, showToastReducer } from "./reducers";


enum typeValues {
    success = 'success',
    error = 'error',
    info = 'info',
}

export interface initialToastType {
    show?: boolean,
    type: string,
    message: string,
    message_two?: string,
    idLog?: string,
}

const initialState: initialToastType = {
    show: false,
    type: typeValues.success,
    message: "Hola",
    message_two: "",
    idLog: generateString()
}

const showToastType = createAction<initialToastType>(ToastTypes.showToast);
const hideToastType = createAction<initialToastType>(ToastTypes.hideToast);

export default createReducer(initialState, (builder)=> {
    builder.addCase(showToastType, showToastReducer);
    builder.addCase(hideToastType, hideToastReducer);
})

