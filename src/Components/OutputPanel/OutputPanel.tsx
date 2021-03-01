import { FunctionComponent } from 'react';
import { useTypedSelector } from '../../Store';
import { GifShot } from './GifShot';
import { Credits } from './Credits';

export interface OutputPanelProps {}

export const OutputPanel: FunctionComponent<OutputPanelProps> = () => {
  const lightboxImages = useTypedSelector(({ artworks }) => artworks.lightbox);

  return (
    <div className="stack">
      <GifShot images={lightboxImages} />
      <Credits images={lightboxImages} />
    </div>
  );
};
