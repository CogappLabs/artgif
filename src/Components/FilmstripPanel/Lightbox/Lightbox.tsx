import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveArtworkAction } from '../../../Store/artworks';
import { ImageDescriptor } from '../../../Store/artworks/artworks.types';
import './Lightbox.css';

export interface LightboxProps {
  artworks: ImageDescriptor[];
}

export type LightboxFC = React.FC<LightboxProps>;

export const Lightbox: LightboxFC = ({ artworks }) => {
  const dispatch = useDispatch();

  const imageClickHandler = (artwork: ImageDescriptor) => dispatch(setActiveArtworkAction(artwork));

  return (
    <div className="lightbox">
      {artworks.map((artwork) => {
        return <img key={artwork.uuid} onClick={() => imageClickHandler(artwork)} src={artwork.imageUrl} alt="" />;
      })}
    </div>
  );
};
