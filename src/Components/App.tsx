import React, { FunctionComponent } from 'react';
import { Header } from './Header';
import './App.css';
import { Footer } from './Footer';
import { ArtworkPanel } from './ArtworkPanel';
import { FilmstripPanel } from './FilmstripPanel';
import { EditorPanel } from './EditorPanel';
import { OutputPanel } from './OutputPanel';
import { Panel } from './Panel';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../Store/store';

export const App: FunctionComponent = () => {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
};
