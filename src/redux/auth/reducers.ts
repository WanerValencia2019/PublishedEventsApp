import { AuthTypeData } from ".";

export const loginSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = true;
    state.token = action.payload.data.access;
}