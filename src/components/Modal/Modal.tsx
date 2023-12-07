
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./Modal.module.scss";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { IProduct } from "../CategoryProducts/ProductCard/ProductCard";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import Loader from "../Loader/Loader";

interface IModal {
  handleModal: (open: boolean, id?: number) => void;
  productId: number;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<IModal> = ({ handleModal, productId, setIsError }) => {
  const [product, setProduct] = useState<IProduct>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/${productId}`)
      .then((response: any) => {
        setProduct(response.data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId, setIsError]);

  if (isLoading) {
    return (
      <>
        <div className={classes.dark_bg} />
        <div className={classes.centered}>
          <Loader />
        </div>
      </>
    )
  }

  return (
    <>
      {product && (
        <>
          <div className={classes.dark_bg} onClick={() => handleModal(false)} />
          <div className={classes.centered}>
            <div className={classes.modal}>
              <LazyLoadImage src={product.image} alt={product.title} className={classes.image}/>
              <div className={classes.modal_header}>
                <h5 className={classes.heading}>{product.title}</h5>
              </div>
              <h4 className={classes.price}>{product.price}$</h4>
              <button className={classes.close_btn} onClick={() => handleModal(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
              </button>
              <div className={classes.modal_content}>
                {product.description}
              </div>
              <div className={classes.modal_actions}>
                <div className={classes.actions_container}>
                  <button className={classes.delete_btn} onClick={() => handleModal(false)}>
                    Buy
                  </button>
                  <button
                    className={classes.cancel_btn}
                    onClick={() => handleModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;