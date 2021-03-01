import React from 'react';
import { ImageDescriptor } from '../../../Store/artworks';
import './Credits.css';
export interface CreditsProps {
  images: ImageDescriptor[];
}

export type CreditsFC = React.FC<CreditsProps>;

interface KeyedImageDescriptors {
  [key: string]: ImageDescriptor;
}

export const Credits: CreditsFC = ({ images }) => {
  // Build an object of unique objects.
  const uniqueImages = images.reduce<KeyedImageDescriptors>((prev, current) => {
    if (!current.objectID) return prev;
    return { ...prev, [current.objectID]: current };
  }, {});

  return (
    <div className="credits">
      <h2 className="panel__title">Artwork credits</h2>
      <br />
      <ul className="stack">
        {Object.entries(uniqueImages).map(([objectId, image]) => {
          return (
            <li key={objectId}>
              <a target="_blank" rel="noreferrer" href={`https://www.artic.edu/artworks/${objectId}`}>
                {image.caption}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
