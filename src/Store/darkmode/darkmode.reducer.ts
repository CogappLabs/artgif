import { DarkModeState, DarkModeActionTypes, TOGGLE_DARK_MODE } from './darkmode.types';

const initialState: DarkModeState = {
  enabled: false,
};

export const darkModeReducer = (state = initialState, action: DarkModeActionTypes): DarkModeState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        enabled: action.newStatus,
      };
    default:
      return state;
  }
};
