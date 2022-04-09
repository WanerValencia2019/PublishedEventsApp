import { initialToastType } from ".";
import { generateString } from "../../utils";

export const showToastReducer = (
  state: initialToastType,
  action:{ payload:initialToastType  } 
) => {
  state.idLog = generateString()
  state.show = true;
  state.type = action.payload.type;
  state.message = action.payload.message;
  if (action.payload.message_two) {
    state.message_two = action.payload.message_two;
  }
};

export const hideToastReducer = (state: initialToastType, action: any) => {
  state.show = false;
  state.idLog = generateString()
};
