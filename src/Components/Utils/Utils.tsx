import { FunctionComponent } from 'react';
import './Utils.css';
export interface VisuallyHiddenProps {
  text: string;
}

export const VisuallyHidden: FunctionComponent<VisuallyHiddenProps> = ({ text }) => (
  <span className="visually-hidden">{text}</span>
);

export const FormGroup: FunctionComponent = ({ children }) => <div className="form-group">{children}</div>;
