import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { DarkModeState } from './darkmode';

export interface RootState {
  darkmode: DarkModeState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
