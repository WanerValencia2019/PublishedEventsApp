import { initialLoadingType } from ".";

export const showLoadingReducer = (state: initialLoadingType, action: any) => {
  state.show = true;
};

export const hideLoadingReducer = (state: initialLoadingType, action: any) => {
  state.show = false;
};
