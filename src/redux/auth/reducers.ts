import { AuthTypeData } from ".";
import { generateString } from "../../utils";

export const loginSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = true;
    state.token = action.payload.data.access;
}

export const registerSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = true;
    state.token = action.payload.data.token.access;
    state.user.email = action.payload.data.user.email;
    state.user.firstName = action.payload.data.user.first_name;
    state.user.lastName = action.payload.data.user.last_name;
}

export const loadProfileSuccessReducer = (state: AuthTypeData, action: any)  => {   
    state.user.username = action.payload.data.username;
    state.user.firstName = action.payload.data.first_name;
    state.user.lastName = action.payload.data.last_name;
    state.user.email = action.payload.data.email;
    state.user.imageUrl = action.payload.data.image;
    state.user.description = action.payload.data.description  || "";
    state.user.identification = action.payload.data.identification  || "";
}

export const updateProfileSuccessReducer = (state: AuthTypeData, action: any)  => {
    state.user.firstName = action.payload.data.first_name;
    state.user.lastName = action.payload.data.last_name;
    state.user.description = action.payload.data.description  || "";
    state.user.identification = action.payload.data.identification  || "";
    state.id_log = generateString();
}

export const logoutReducer = (state: AuthTypeData, action: any)  => {
    state.isAuthenticated = false;
    state.token = null;
    state.user.username = "";
    state.user.firstName = "";
    state.user.lastName = "";
    state.user.email = "";
    state.user.imageUrl = "";
    state.user.description = "";
    state.user.identification = "";
}
