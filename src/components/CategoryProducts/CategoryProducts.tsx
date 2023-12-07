import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import classes from './CategoryProducts.module.scss';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import ProductCard, { IProduct } from './ProductCard/ProductCard';
import Loader from '../Loader/Loader';

interface CategoryProducts {
  categoryName: string;
  handleModal: Dispatch<SetStateAction<boolean>>
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const CategoryProducts: React.FC<CategoryProducts> = ({categoryName, handleModal, setIsError}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/category/${categoryName}`)
      .then((response: any) => {
        setProducts(response.data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryName, setIsError]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classes.category_products}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} handleModal={handleModal}/>
      ))}
    </div>
  )
};

export default CategoryProducts;