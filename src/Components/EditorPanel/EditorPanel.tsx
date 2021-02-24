import { FunctionComponent, useEffect, useState } from 'react';
import { ComplexTileSource } from 'use-open-seadragon/lib/types/tile-sources/complex-tile-source';
import { OpenSeadragon, useOpenSeadragon, useViewerEvent, useViewerContext } from 'use-open-seadragon';
import { useTypedSelector } from "../../Store";
import {
  ImageDescriptor,
  setActiveArtworkAction,
  addArtworkToLightboxAction,
  removeArtworkFromLightboxAction
} from "../../Store/artworks";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export interface EditorPanelProps {}

const Viewer = ({ tiles }: ComplexTileSource) => {
  const dispatch = useDispatch();

  const selectedArtwork = useTypedSelector<ImageDescriptor | undefined>(({ artworks }) => artworks.activeArtwork);
  // console.log('selected in viewer: ' + selectedArtwork + ' with crop: ' + selectedArtwork?.crop);

  const [ref, { isReady }] = useOpenSeadragon(tiles);
  const { viewer } = useViewerContext();
  const [crop, setCrop] = useState(new OpenSeadragon.Rect());
  const [image, setImage] = useState(tiles[0].tileSource.slice(0, -10) + '/full/!200,200/0/default.jpg');

  useEffect(() => {
    if (isReady) {
      // console.log('ready');
      if (selectedArtwork !== undefined && selectedArtwork.crop !== undefined) {
        // setCrop(selectedArtwork.crop);
        viewer.viewport.fitBoundsWithConstraints(viewer.viewport.imageToViewportRectangle(selectedArtwork.crop));
      }
    }
  }, [isReady]);

  const addHandler = (currentFrame: ImageDescriptor | undefined) => {
    // TODO this could all work off selectedArtwork?
    if (currentFrame) {
      let newFrame = Object.assign({}, currentFrame);

      // TODO not the right thing to do?
      if (newFrame) {
        newFrame.imageUrl = image;
        newFrame.uuid = uuidv4();
        newFrame.crop = crop;
      }

      dispatch(addArtworkToLightboxAction(newFrame));
      dispatch(setActiveArtworkAction(newFrame));
    }
  };

  const deleteHandler = () => {
    if (selectedArtwork) dispatch(removeArtworkFromLightboxAction(selectedArtwork));
  }

  useViewerEvent("update-viewport", ev => {

    // Convert from viewport coordinates to image coordinates.
    let imageRect = ev.eventSource.viewport.viewportToImageRectangle(ev.eventSource.viewport.getBoundsNoRotate());
    console.log('rect', imageRect);
    setCrop(imageRect);

    // make sure bounds are never negative
    let x = crop.x >= 0 ? crop.x : 0;
    let y = crop.y >= 0 ? crop.y : 0;
    let w = crop.width >= 0 ? crop.width : 0;
    let h = crop.height >= 0 ? crop.height : 0;

    let newSrc = tiles[0].tileSource.slice(0, -10) + '/' + x + ',' + y + ',' + w + ',' + h + '/!200,200/0/default.jpg'
    setImage(newSrc);
    // TODO Matt: make this update the image in the lightbox too
  });
  /*  An aside into failed ways to make the viewer update when a lightbox work is selected. Final correct way was to use the isReady effect above.
      // failed method 1: try to use the 'open' event on the Viewer, but it never gets triggered
      useViewerEvent("open", ev => {

          // this never gets triggered!
          console.log('opened new image' + ev.eventSource)
          ev.eventSource.viewport.viewportToImageRectangle(crop);

      });

      // failed method 2: try to use the 'add-item' event on the World, but it can't act on the result due to compilation errors.
      //  Also gets triggered hundreds of times!
      if (viewer != undefined) {

          viewer.world.addHandler('add-item', function(ev) {
              console.log('opened new image' + ev.eventSource)
              // problem: eventSource actually returns a World object not a Viewer one, despite https://openseadragon.github.io/docs/OpenSeadragon.World.html#.event:add-item
              // ev.eventSource.viewer.viewport.viewportToImageRectangle(crop);
          });
      }
  */

  return (
    <>
      <div ref={ref} style={{ height: 400, width: 400, position: 'relative' }}/>
      <div className="caption">{selectedArtwork?.caption}</div>
      <div>
        <button onClick={() => addHandler(selectedArtwork)}>Add as new frame</button>
      </div>
      <div>
        <button onClick={() => deleteHandler()}>Remove current frame</button>
      </div>
      {/*
      <p>Debug:
       Crop: {crop.x}, {crop.y}, {crop.width}, {crop.height}<br/>
      <img src={image} alt="" />
      </p>
      */}
    </>
  );
};

export const EditorPanel: FunctionComponent<EditorPanelProps> = () => {
  const selectedArtwork = useTypedSelector<ImageDescriptor | undefined>(({ artworks }) => artworks.activeArtwork);
  // console.log('selected in editor', selectedArtwork);

  let tiles: ComplexTileSource = [
    {
      tileSource: 'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/info.json',
    },
  ];

  if (selectedArtwork?.tileSource !== undefined) {
    tiles = [
      {
        tileSource: selectedArtwork?.tileSource,
      },
    ];

  }

  return <Viewer tiles={tiles}/>;
};
