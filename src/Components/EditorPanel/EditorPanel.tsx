import { FunctionComponent } from 'react';
import {ComplexTileSource} from "use-open-seadragon/lib/types/tile-sources/complex-tile-source";

export interface EditorPanelProps {}

const tile:ComplexTileSource = [
  {
    tileSource: 'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/info.json'
  },
];

function Viewer({ tiles }:ComplexTileSource) {
  return <h1>View</h1>;
}

export const EditorPanel: FunctionComponent<EditorPanelProps> = () => {

  return (
        <Viewer tiles={tile} />
  );
};
