import { FunctionComponent } from 'react';

export interface VisuallyHiddenProps {
  text: string;
}

export const VisuallyHidden: FunctionComponent<VisuallyHiddenProps> = ({ text }) => (
  <span className="visually-hidden">{text}</span>
);
