import { FunctionComponent, useState } from 'react';
import { ComplexTileSource } from 'use-open-seadragon/lib/types/tile-sources/complex-tile-source';
import { useOpenSeadragon, useViewerEvent } from 'use-open-seadragon';
import {useTypedSelector} from "../../Store";
import {ImageDescriptor, setActiveArtworkAction, addArtworkToLightboxAction, removeArtworkFromLightboxAction} from "../../Store/artworks";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";

export interface EditorPanelProps {}

const Viewer = ({ tiles }: ComplexTileSource) => {
  const dispatch = useDispatch();

  const selectedArtwork = useTypedSelector<ImageDescriptor|undefined>(({ artworks }) => artworks.activeArtwork);
  console.log('selected in viewer', selectedArtwork);

  const [ref] = useOpenSeadragon(tiles);
  const [crop, setCrop] = useState({x: 0, y: 0, width:0, height:0});
  const [image, setImage] = useState(tiles[0].tileSource.slice(0, -10) + '/full/!200,200/0/default.jpg');

  const addHandler = (currentFrame:ImageDescriptor | undefined) => {
      // TODO this could all work off selectedArtwork?
    if (currentFrame) {
        let newFrame = Object.assign({}, currentFrame);

        // TODO not the right thing to do?
        if (newFrame) {
            newFrame.imageUrl = image;
            newFrame.uuid = uuidv4();
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
    // console.log(imageRect);
    setCrop(imageRect);

    let newSrc= tiles[0].tileSource.slice(0, -10) + '/' + crop.x + ',' + crop.y + ',' + crop.width + ',' + crop.height + '/!200,200/0/default.jpg'
    setImage(newSrc);
  });

  return (
    <>
      <div ref={ref} style={{ height: 400, width: 400, position: 'relative' }} />
      <div className="caption">{selectedArtwork?.caption}</div>
      <div><button onClick={() => addHandler(selectedArtwork)}>Add as new frame</button></div>
      <div><button onClick={() => deleteHandler()}>Remove current frame</button></div>
      <p>Debug:
      <img src={image} alt="" />
      </p>
    </>
  );
};

export const EditorPanel: FunctionComponent<EditorPanelProps> = () => {
  const selectedArtwork = useTypedSelector<ImageDescriptor|undefined>(({ artworks }) => artworks.activeArtwork);
  console.log('selected', selectedArtwork);

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

  return <Viewer tiles={tiles} />;
};
