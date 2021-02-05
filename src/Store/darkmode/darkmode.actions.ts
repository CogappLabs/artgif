import { DarkModeActionTypes, TOGGLE_DARK_MODE } from './darkmode.types';

export const toggleDarkModeAction = (newStatus: boolean): DarkModeActionTypes => {
  return {
    type: TOGGLE_DARK_MODE,
    newStatus,
  };
};
