import './App.css';

import React, { FunctionComponent } from 'react';

import { ArtworkPanel } from './ArtworkPanel';
import { EditorPanel } from './EditorPanel';
import { FilmstripPanel } from './FilmstripPanel';
import { Footer } from './Footer';
import { Header } from './Header';
import { OutputPanel } from './OutputPanel';
import { Panel } from './Panel';
import { useTypedSelector } from '../Store';
import classNames from 'classnames';

export const App: FunctionComponent = () => {
  const darkmodeIsOn = useTypedSelector<boolean>(({ darkmode }) => darkmode.enabled);

  const classes = classNames('App', { 'is-dark': darkmodeIsOn });

  return (
    <div className={classes}>
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
