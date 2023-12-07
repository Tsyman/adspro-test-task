import React from 'react';
import classes from './SearchInput.module.scss';

const SearchInput: React.FC = () => (
  <input type="text" className={classes.search_input} placeholder='Search'/>
)

export default SearchInput;