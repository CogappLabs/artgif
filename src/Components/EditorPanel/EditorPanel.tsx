import { FunctionComponent, useState } from 'react';
import { ComplexTileSource } from 'use-open-seadragon/lib/types/tile-sources/complex-tile-source';
import { useOpenSeadragon, useViewerEvent } from 'use-open-seadragon';
import {useTypedSelector} from "../../Store";
import {ImageDescriptor} from "../../Store/artworks";

export interface EditorPanelProps {}

const Viewer = ({ tiles }: ComplexTileSource) => {
  const [ref] = useOpenSeadragon(tiles);
  const [crop, setCrop] = useState({x: 0, y: 0, width:0, height:0});
  const [image, setImage] = useState(tiles[0].tileSource.slice(0, -10) + '/full/!200,200/0/default.jpg');

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
