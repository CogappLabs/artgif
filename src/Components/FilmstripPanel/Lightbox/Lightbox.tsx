import React from 'react';
import { ImageDescriptor } from '../../../Store/artworks/artworks.types';
import './Lightbox.css';

export interface LightboxProps {
  artworks: ImageDescriptor[];
}

export type LightboxFC = React.FC<LightboxProps>;

export const Lightbox: LightboxFC = ({ artworks }) => {
  return (
    <div className="lightbox">
      {artworks.map((artwork) => {
        return <img key={artwork.uuid} src={artwork.imageUrl} alt="" />;
      })}
    </div>
  );
};
