import React from 'react';
import { LazyLoadImage as LazyImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import ImgPlaceholder from '../../assets/img-placeholder.png'


const LazyLoadImage: React.FC<LazyLoadImageProps> = ({src, alt, className = '', ...rest}) => (
  <LazyImage
    src={src}
    alt={alt}
    className={className}
    placeholderSrc={ImgPlaceholder}
    effect='blur'
    {...rest}
  />
);

export default LazyLoadImage;