import React, { useLayoutEffect } from 'react';
import { ImageDescriptor } from '../../../Store/artworks';
import gifshot from 'gifshot';
import { useState } from 'react';
import './GifShot.css';

export interface GifShotProps {
  images: ImageDescriptor[];
  width?: number;
  height?: number;
  interval?: number;
  frameDuration?: number;
  numFrames?: number;
}

export type GifShotFC = React.FC<GifShotProps>;

export const GifShot: GifShotFC = React.memo(({ images = [], ...props }) => {
  const [imageString, setImageString] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    gifshot.createGIF(
      {
        images: images.map((image) => image.imageUrl),
        width: props.width ?? 200,
        height: props.height ?? 200,
        frameDuration: props.frameDuration ?? 5,
      },
      (params: gifshot.GifShotCallbackParam) => {
        if (!params.error && params.image) {
          setImageString(params.image);
        }
      }
    );
  }, [images, props]);

  return (
    <div className="gifshot">
      <img src={imageString} alt="" />
    </div>
  );
});
