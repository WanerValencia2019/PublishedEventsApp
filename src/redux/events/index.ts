import { createAction, createReducer } from "@reduxjs/toolkit"
import { EventTypes } from "../actionTypes"
import { listEventsReducer, listNearEventsReducer } from "./reducers"


export interface eventInitialType {
    list: Array<any>,
    nearEvents: Array<any>,
}

const initialState: eventInitialType = {
    list: [],
    nearEvents: [],
}

const listEventsAction = createAction<eventInitialType>(EventTypes.listEventsSuccess)
const listNearEventsAction = createAction<eventInitialType>(EventTypes.listNearEventsSuccess)

export default createReducer(initialState, (builder)=> {
    builder.addCase(listEventsAction, listEventsReducer)
    builder.addCase(listNearEventsAction, listNearEventsReducer)

})

