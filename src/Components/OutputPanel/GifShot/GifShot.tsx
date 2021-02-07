import React from 'react';
import {ImageDescriptor, removeArtworkFromLightboxAction} from '../../../Store/artworks';
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

export const GifShot: GifShotFC = ({ images, ...props }) => {
  const [imageString, setImageString] = useState<string | undefined>(undefined);

  gifshot.createGIF(
    {
      images: images.map((image) => image.imageUrl),
      width: props.width ?? 200,
      height: props.height ?? 200,
      interval: props.interval ?? 0.5,
      frameDuration: props.frameDuration ?? 1,
      numFrames: props.numFrames ?? 10,
    },
    (params: gifshot.GifShotCallbackParam) => {
      if (!params.error && params.image) {
        setImageString(params.image);
      }
    }
  );

    const changeSpeed = (increment: number) => {
        if (props.interval) props.interval += increment;
        console.log('interval', props.interval)
    }

    return (
    <div className="gifshot">
      <img src={imageString} alt="" />
      <div>
          <button onClick={() => changeSpeed(-0.05)}>Faster</button>
          <button onClick={() => changeSpeed(+0.05)}>Slower</button>
      </div>
    </div>
  );
};
