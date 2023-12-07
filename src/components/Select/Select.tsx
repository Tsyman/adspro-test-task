import React from 'react';
import Select, {Props} from 'react-select';
import classes from './Select.module.scss';

interface ISelectInput extends Props{
  title: string;
}

const SelectInput: React.FC<ISelectInput> = ({title, options, ...rest}) => (
  <>
    <h4>{title}</h4>
    <Select options={options} isClearable {...rest} className={classes.select} />
  </>

);

export default SelectInput;