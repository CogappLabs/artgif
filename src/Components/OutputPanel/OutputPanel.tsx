import { FunctionComponent } from 'react';
import { useTypedSelector } from '../../Store';
import { GifShot } from './GifShot';

export interface OutputPanelProps {}

export const OutputPanel: FunctionComponent<OutputPanelProps> = () => {
  const lightboxImages = useTypedSelector(({ artworks }) => artworks.lightbox);

  return <GifShot images={lightboxImages} />;
};
