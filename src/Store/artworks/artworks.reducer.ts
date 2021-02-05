import { stat } from 'fs';
import {
  ADD_ARTWORK_TO_LIGHTBOX,
  ArtworkActionTypes,
  ArtworkState,
  ImageDescriptor,
  REMOVE_ARTWORK_FROM_LIGHTBOX,
  SET_ACTIVE_ARTWORK,
} from './artworks.types';

const dummyArtworks: ImageDescriptor[] = [
  {
    imageUrl:
      'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/300,300,600,600/!200,200/0/default.jpg',
    uuid: 'abc',
  },
  {
    imageUrl:
      'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/500,300,600,600/!200,200/0/default.jpg',
    uuid: 'def',
  },
  {
    imageUrl:
      'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/500,500,600,600/!200,200/0/default.jpg',
    uuid: 'ghi',
  },
  {
    imageUrl:
      'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/500,500,500,500/!200,200/0/default.jpg',
    uuid: 'jkl',
  },
];

// ToDo: Change this when we have some real artworks.
const intialState: ArtworkState = {
  activeArtwork: undefined,
  allArtworks: dummyArtworks,
  lightbox: dummyArtworks.filter((art) => art.uuid !== 'ghi'),
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
