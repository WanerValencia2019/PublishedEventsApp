import { eventInitialType } from ".";

export const listEventsReducer = (state: eventInitialType, action: any)  => {
    state.list = action.payload.list;
}

export const listNearEventsReducer = (state: eventInitialType, action: any)  => {
    state.nearEvents = action.payload.list;
}