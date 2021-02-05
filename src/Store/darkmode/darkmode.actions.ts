import { DarkModeActionTypes, DarkModeState, TOGGLE_DARK_MODE } from './darkmode.types';

export const toggleDarkMode = (newStatus: boolean): DarkModeActionTypes => {
  return {
    type: TOGGLE_DARK_MODE,
    newStatus,
  };
};
