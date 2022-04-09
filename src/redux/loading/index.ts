import { createAction, createReducer } from "@reduxjs/toolkit"
import { generateString } from "../../utils";
import { EventTypes, LoadingTypes, ToastTypes } from "../actionTypes"
import { hideLoadingReducer, showLoadingReducer } from "./reducers";


export interface initialLoadingType {
    show?: boolean,
}

const initialState: initialLoadingType = {
    show: false,
}

const showLoadingType = createAction<initialLoadingType>(LoadingTypes.startLoading);
const hideLoadingType = createAction<initialLoadingType>(LoadingTypes.stopLoading);

export default createReducer(initialState, (builder)=> {
    builder.addCase(showLoadingType, showLoadingReducer);
    builder.addCase(hideLoadingType, hideLoadingReducer);
})

