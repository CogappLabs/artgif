import { FunctionComponent } from 'react';
import { VisuallyHidden } from '../Utils/Utils';
import './Footer.css';

export const Footer: FunctionComponent = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      Made with ❤️
      <VisuallyHidden text="love" /> and 🍕
      <VisuallyHidden text="pizza" /> by{' '}
      <a className="fancy-link" href="https://www.cogapp.com/">
        Cogapp
      </a>
      , with thanks to{' '}
      <a className="fancy-link" href="https://www.artic.edu/visit">
        The Art Institute of Chicago
      </a>{' '}
      for providing content and APIs.
    </footer>
  );
};
