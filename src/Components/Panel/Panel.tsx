import classNames from 'classnames';
import { FunctionComponent } from 'react';

export interface PanelProps {
  title: string;
  type: string;
}

export const Panel: FunctionComponent<PanelProps> = ({ title, type, children }) => {
  const panelClasses = classNames('panel', `panel--${type}`);

  return (
    <div className={panelClasses}>
      <h2 className="panel__title">{title}</h2>
      <div className="panel__content">{children}</div>
    </div>
  );
};
