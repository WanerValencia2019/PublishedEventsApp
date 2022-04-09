import { AuthTypeData } from ".";

export const loginSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = true;
    state.token = action.payload.data.access;
}

export const registerSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = true;
    state.token = action.payload.data.token.access;
    state.email = action.payload.data.user.email;
    state.firstName = action.payload.data.user.first_name;
    state.lastName = action.payload.data.user.last_name;
}
