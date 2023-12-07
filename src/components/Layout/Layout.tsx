import React, { PropsWithChildren } from 'react';
import classes from './Layout.module.scss';
import { ThemeMode } from '../App/App';

interface ILayout extends PropsWithChildren {
  themeMode: ThemeMode;
}

const Layout: React.FC<ILayout> = ({children, themeMode}) => (
  <div className={[classes.layout, classes[`${themeMode}`]].join(' ')} id="layout">{children}</div>
)

export default Layout;