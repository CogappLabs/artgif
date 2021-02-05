import { FunctionComponent } from 'react';
import { useTypedSelector } from '../../Store';
import { ImageDescriptor } from '../../Store/artworks/artworks.types';
import { Lightbox } from './Lightbox/Lightbox';

export interface FilmstripPanelProps {}

export const FilmstripPanel: FunctionComponent<FilmstripPanelProps> = () => {
  const lightboxArtworks = useTypedSelector<ImageDescriptor[]>(({ artworks }) => artworks.lightbox);

  return <Lightbox artworks={lightboxArtworks} />;
};
