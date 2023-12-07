import React from 'react';
import classes from './Loader.module.scss';

const Loader: React.FC = () => 
  <div className={classes.loader__container}>
    <div className={classes.loader}></div>
  </div>;
;

export default Loader;