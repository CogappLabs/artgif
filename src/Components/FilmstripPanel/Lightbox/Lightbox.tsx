import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveArtworkAction } from '../../../Store/artworks';
import { ImageDescriptor } from '../../../Store/artworks/artworks.types';
import './Lightbox.css';

export interface LightboxProps {
  artworks: ImageDescriptor[];
  activeArtwork?: ImageDescriptor;
}

export type LightboxFC = React.FC<LightboxProps>;

export const Lightbox: LightboxFC = ({ artworks, activeArtwork }) => {
  const dispatch = useDispatch();

  const imageClickHandler = (artwork: ImageDescriptor) => dispatch(setActiveArtworkAction(artwork));

  return (
    <div className="lightbox">
      {artworks.map((artwork) => {
        const classes = classNames('lightbox-image', { 'is-active': artwork.uuid === activeArtwork?.uuid });

        return (
          <img
            className={classes}
            key={artwork.uuid}
            onClick={() => imageClickHandler(artwork)}
            src={artwork.imageUrl}
            alt=""
          />
        );
      })}
    </div>
  );
};
