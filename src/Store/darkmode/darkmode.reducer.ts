import { DarkModeState, DarkModeActionTypes, TOGGLE_DARK_MODE } from './darkmode.types';

const initialState: DarkModeState = {
  enabled: false,
};

export const darkModeReducer = (state = initialState, action: DarkModeActionTypes): DarkModeState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...{
          enabled: action.newStatus,
        },
        ...state,
      };
    default:
      return state;
  }
};
