import {
  ADD_ARTWORK_TO_LIGHTBOX,
  ArtworkActionTypes,
  ImageDescriptor,
  REMOVE_ARTWORK_FROM_LIGHTBOX,
  SET_ACTIVE_ARTWORK,
} from './artworks.types';

export const addArtworkToLightboxAction = (artwork: ImageDescriptor): ArtworkActionTypes => ({
  type: ADD_ARTWORK_TO_LIGHTBOX,
  artwork,
});

export const removeArtworkFromLightboxAction = (artwork: ImageDescriptor): ArtworkActionTypes => ({
  type: REMOVE_ARTWORK_FROM_LIGHTBOX,
  artwork,
});

export const setActiveArtworkAction = (artwork: ImageDescriptor): ArtworkActionTypes => ({
  type: SET_ACTIVE_ARTWORK,
  artwork,
});
