import React, { FunctionComponent } from 'react';
import { Header } from './Header';
import './App.css';
import { Footer } from './Footer';

export const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};
