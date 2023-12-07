import React from 'react';
import classes from './ProductCard.module.scss';
import { FaStar } from "react-icons/fa";
import LazyLoadImage from '../../LazyLoadImage/LazyLoadImage';

export interface IProduct {
  category: string;
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  }
}

interface IProductCard {
  product: IProduct;
  handleModal: (open: boolean, id?: number) => void;
}

const ProductCard: React.FC<IProductCard> = ({product: {image, title, price, rating: {count, rate}, id}, handleModal}) => (
  <div className={classes.product_card} onClick={() => handleModal(true, id)}>
    <LazyLoadImage src={image} alt={title} className={classes.image}/>
    <p className={classes.title}>{title}</p>
    <p className={classes.price}>{price}$</p>
    <div className={classes.rating}>
      <p className={classes.count}>{count} sold</p>
      <div className={classes.rate}>
        <FaStar className={classes.star}/>
        <p className={classes.rate_count}>{rate}</p>
      </div>
    </div>
  </div>
);

export default ProductCard;