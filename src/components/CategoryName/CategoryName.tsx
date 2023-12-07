import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import classes from './CategoryName.module.scss'

export interface ICategoryName {
  categoryName?: string;
  setCategoryName: Dispatch<SetStateAction<string>>;
}

const CategoryName: React.FC<ICategoryName> = ({categoryName, setCategoryName}) => {
  const resetCategory = useCallback(() => {
    setCategoryName('')
  }, [setCategoryName]);

  return (
    <div className={classes.category_name}>
      <p onClick={resetCategory} className={classes.title}>Product Categories</p>
      {categoryName && <MdArrowForwardIos className={classes.arrow}/>}
      {categoryName && <p className={classes.category}>{categoryName}</p>}
    </div>
  )
}

export default CategoryName;