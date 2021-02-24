import {
  ADD_ARTWORK_TO_LIGHTBOX,
  ArtworkActionTypes,
  ArtworkState,
  REMOVE_ARTWORK_FROM_LIGHTBOX,
  SET_ACTIVE_ARTWORK,
} from './artworks.types';

const intialState: ArtworkState = {
  activeArtwork: undefined,
  lightbox: [],
};

export const artworkReducer = (state = intialState, action: ArtworkActionTypes): ArtworkState => {
  switch (action.type) {
    case ADD_ARTWORK_TO_LIGHTBOX:
      return {
        ...state,
        lightbox: [...state.lightbox, action.artwork],
      };
    case REMOVE_ARTWORK_FROM_LIGHTBOX:
      return {
        ...state,
        lightbox: state.lightbox.filter((artwork) => artwork.uuid !== action.artwork.uuid),
      };
    case SET_ACTIVE_ARTWORK:
      return {
        ...state,
        activeArtwork: action.artwork,
      };
    default:
      return state;
  }
};
