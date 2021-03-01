import { FunctionComponent } from 'react';
import { useTypedSelector } from '../../Store';
import { ImageDescriptor } from '../../Store/artworks/artworks.types';
import { Lightbox } from './Lightbox/Lightbox';

export interface FilmstripPanelProps {}

export const FilmstripPanel: FunctionComponent<FilmstripPanelProps> = () => {
  const lightboxArtworks = useTypedSelector<ImageDescriptor[]>(({ artworks }) => artworks.lightbox);
  const activeArtwork = useTypedSelector<ImageDescriptor | undefined>(({ artworks }) => artworks.activeArtwork);

  return <Lightbox artworks={lightboxArtworks} activeArtwork={activeArtwork} />;
};
