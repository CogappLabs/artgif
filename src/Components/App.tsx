import './App.css';

import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ArtworkPanel } from './ArtworkPanel';
import { EditorPanel } from './EditorPanel';
import { FilmstripPanel } from './FilmstripPanel';
import { Footer } from './Footer';
import { Header } from './Header';
import { OutputPanel } from './OutputPanel';
import { Panel } from './Panel';
import { RootState } from '../Store';

export const App: FunctionComponent = () => {
  const darkmode = useSelector<RootState>(({ darkmode }) => darkmode.enabled);
  return (
    <div className="App">
      <Header />
      <main className="layout">
        <div className="panel-grid">
          <Panel title="Artworks" type="artworks">
            <ArtworkPanel />
          </Panel>
          <Panel title="Filmstrip" type="filmstrip">
            <FilmstripPanel />
          </Panel>
          <Panel title="Editor" type="editor">
            <EditorPanel />
          </Panel>
          <Panel title="Output" type="output">
            <OutputPanel />
          </Panel>
        </div>
      </main>
      <Footer />
    </div>
  );
};
