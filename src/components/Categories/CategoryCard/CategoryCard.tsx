import React, { useCallback } from 'react';
import { ICategoryName } from '../../CategoryName/CategoryName';
import classes from './CategoryCard.module.scss';

interface ICategoryCard extends ICategoryName {}

const CategoryCard: React.FC<ICategoryCard> = ({categoryName, setCategoryName}) => {
  const handleClick = useCallback(() => {
    setCategoryName(categoryName)
  }, [categoryName, setCategoryName]);

  return (
    <div className={classes.category_card} onClick={handleClick}>
      <p className={classes.category_name}>{categoryName}</p>
    </div>
  );
}

export default CategoryCard;