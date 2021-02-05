export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export interface DarkModeState {
  enabled: boolean;
}

interface ToggleDarkmodeAction {
  type: typeof TOGGLE_DARK_MODE;
  newStatus: boolean;
}

export type DarkModeActionTypes = ToggleDarkmodeAction;
