export const ADD_ARTWORK_TO_LIGHTBOX = 'ADD_ARTWORK_TO_LIGHTBOX';
export const REMOVE_ARTWORK_FROM_LIGHTBOX = 'REMOVE_ARTWORK_FROM_LIGHTBOX';
export const SET_ACTIVE_ARTWORK = 'SET_ACTIVE_ARTWORK';

export interface ImageDescriptor {
  uuid: string;
  imageUrl: string;
}

export interface ArtworkState {
  activeArtwork?: ImageDescriptor;
  allArtworks: ImageDescriptor[];
  lightbox: ImageDescriptor[];
}

interface AddArtworkToLightboxAction {
  type: typeof ADD_ARTWORK_TO_LIGHTBOX;
  artwork: ImageDescriptor;
}

interface RemoveArtworkFromLightboxAction {
  type: typeof REMOVE_ARTWORK_FROM_LIGHTBOX;
  artwork: ImageDescriptor;
}

interface SetActiveArtworkAction {
  type: typeof SET_ACTIVE_ARTWORK;
  artwork: ImageDescriptor;
}

export type ArtworkActionTypes = AddArtworkToLightboxAction | RemoveArtworkFromLightboxAction | SetActiveArtworkAction;
