import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { toggleDarkModeAction } from '../../../Store/darkmode';
import './DarkModeToggle.css';
import { ReactComponent as Bulb } from './bulb.svg';
export interface DarkModeToggleProps {}

export type DarkModeToggleFC = React.FC<DarkModeToggleProps>;

export const DarkModeToggle: DarkModeToggleFC = () => {
  const isDark = useSelector<RootState, boolean>(({ darkmode }) => darkmode.enabled);
  const dispatch = useDispatch();

  const handleChange = () => dispatch(toggleDarkModeAction(!isDark));

  return (
    <label className="dark-toggle" htmlFor="dark-mode-toggle">
      <Bulb className="dark-toggle__bulb" />

      <input
        className="dark-toggle__input"
        onChange={handleChange}
        id="dark-mode-toggle"
        name="dark-mode-toggle"
        type="checkbox"
        defaultChecked={isDark}
      />
      <div className="dark-toggle__fill"></div>
    </label>
  );
};
