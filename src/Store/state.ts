import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { ArtworkState } from './artworks/artworks.types';
import { DarkModeState } from './darkmode';

export interface RootState {
  darkmode: DarkModeState;
  artworks: ArtworkState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
