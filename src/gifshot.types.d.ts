declare module 'gifshot' {
  export interface GifShotOpts {
    images: string[];
    width?: number;
    height?: number;
    interval?: number;
    frameDuration?: number;
    numFrames?: number;
  }

  export interface GifShotCallbackParam {
    error: boolean;
    errorCode: string;
    errorMessage: string;
    image: string;
  }
  export function GifShotCallback(obj: GifShotCallbackParam);
  export function createGIF(options: GifShotOpts, callback: GifShotCallback);
}
