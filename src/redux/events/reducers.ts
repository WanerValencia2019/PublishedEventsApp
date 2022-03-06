export const listEventsReducer = (state: any, action: any)  => {
    state.list = action.payload.list;
}