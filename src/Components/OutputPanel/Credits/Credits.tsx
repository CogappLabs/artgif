import React from 'react';
import {ImageDescriptor } from '../../../Store/artworks';
import './Credits.css';
export interface CreditsProps {
    images: ImageDescriptor[];
}

export type CreditsFC = React.FC<CreditsProps>;

export const Credits: CreditsFC = ({ images, ...props }) => {

    var distinct:any = [];

    return (
    <div className="credits">
        <div><h2 className="panel__title">Artwork credits</h2>
            {images.map((artwork) => {
                if (!distinct.includes(artwork.objectID)) {
                    distinct.push(artwork.objectID);
                    let url = 'https://www.artic.edu/artworks/' + artwork.objectID;
                    return <p><a href={url} target="_new">{artwork.caption}</a></p>;
                }
                return '';
            })}

        </div>
    </div>
  );
};
