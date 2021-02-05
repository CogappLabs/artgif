import { FunctionComponent, useState } from 'react';
import { ComplexTileSource } from 'use-open-seadragon/lib/types/tile-sources/complex-tile-source';
import { useOpenSeadragon, Overlay } from 'use-open-seadragon';

export interface EditorPanelProps {}

const Viewer = ({ tiles }: ComplexTileSource) => {
  const [ref] = useOpenSeadragon(tiles);
  const [count, setCount] = useState(0);

  return (
    <>
      <div ref={ref} style={{ height: 600, width: 800, position: 'relative' }}>
        <Overlay x={0.5} y={0.5}>
          <div style={{ background: '#fff' }}>
            <h1>Hello overlay</h1>
            <p>State works too: {count}</p>
          </div>
        </Overlay>
      </div>
      <button onClick={() => setCount((c) => c + 1)}>incr counter</button>
    </>
  );
};

export const EditorPanel: FunctionComponent<EditorPanelProps> = () => {
  const tiles: ComplexTileSource = [
    {
      tileSource: 'https://lakeimagesweb.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/info.json',
    },
  ];

  return <Viewer tiles={tiles} />;
};
