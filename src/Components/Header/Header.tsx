import { FunctionComponent } from 'react';
import './Header.css';
import { ReactComponent as Logo } from './logo.svg';

export const Header: FunctionComponent = () => {
  return (
    <header className="site-header" role="banner">
      <h1 className="center-text font-lora">artgif</h1>
      <Logo className="site-header__logo site-logo" />
    </header>
  );
};
