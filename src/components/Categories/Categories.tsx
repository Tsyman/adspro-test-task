import axios from 'axios';
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import { API_URL } from '../../constants/api';
import CategoryCard from './CategoryCard/CategoryCard';
import classes from './Categories.module.scss';
import Loader from '../Loader/Loader';

interface ICategories {
  setCategoryName: Dispatch<SetStateAction<string>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const Categories: React.FC<ICategories> = ({setCategoryName, setIsError}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/categories`)
      .then((response: any) => {
        setCategories(response.data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsError]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classes.categories}>
      {categories.map((category) => (
        <CategoryCard key={category} categoryName={category} setCategoryName={setCategoryName}></CategoryCard>
      ))}
    </div>
  )
}

export default Categories;