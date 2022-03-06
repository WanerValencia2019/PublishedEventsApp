import { createAction, createReducer } from "@reduxjs/toolkit"
import { EventTypes } from "../actionTypes"
import { listEventsReducer } from "./reducers"


interface initialType {
    list: Array<any>
}

const initialState: initialType = {
    list: [],
}

const listEventsAction = createAction<initialType>(EventTypes.listEventsSuccess)

export default createReducer(initialState, (builder)=> {
    builder.addCase(listEventsAction, listEventsReducer)
})

