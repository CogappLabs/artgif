import { FunctionComponent } from 'react';
import './Header.css';
import { ReactComponent as Logo } from './logo.svg';
import { DarkModeToggle } from './DarkModeToggle';

export const Header: FunctionComponent = () => {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__center">
        <h1 className="font-lora">artgif</h1>
        <Logo className="site-header__logo site-logo" />
      </div>
      <div className="site-header__right">
        <DarkModeToggle />
      </div>
    </header>
  );
};
