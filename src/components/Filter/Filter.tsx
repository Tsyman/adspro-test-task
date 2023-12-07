import React, { useState } from 'react';
import classes from './Filter.module.scss';
import { CiFilter } from 'react-icons/ci';
import SelectInput from '../Select/Select';
import { brands, colourOptions } from '../../constants/select';
import makeAnimated from 'react-select/animated';
import { AiOutlineClose } from 'react-icons/ai';
import { ThemeMode } from '../App/App';

const animatedComponents = makeAnimated();

interface IFilter {
  themeMode: ThemeMode;
}

const Filter: React.FC<IFilter> = ({themeMode}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <div className={classes.dark_bg} onClick={() => setIsOpen(false)} />}
      <div
        className={`${classes[`${themeMode}`]} ${isOpen ? [classes.menu, classes.active].join(' ') : classes.menu}`}
      >
        <button className={classes.close_btn} onClick={() => setIsOpen(false)}>
          <AiOutlineClose size={25} />
        </button>
        <h3>Filters</h3>
        <SelectInput title='Brand' options={brands}/>
        <SelectInput title='Colour' options={colourOptions} isMulti closeMenuOnSelect={false} components={animatedComponents}/>
        <button className={classes.apply_btn} onClick={() => setIsOpen(false)}>
          Apply
        </button>
      </div>
      <div onClick={() => setIsOpen(!isOpen)} className={classes.filter_btn}>
        <CiFilter />
        <p className={classes.title}>Filter</p>
      </div>
    </>
  );
};

export default Filter;