import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Layout from '../Layout/Layout';
import Navbar from '../NavBar/NavBar';
import Categories from '../Categories/Categories';
import CategoryName from '../CategoryName/CategoryName';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
import Modal from '../Modal/Modal';
import Filter from '../Filter/Filter';
import classes from './App.module.scss';
import ToggleButton from '../ToggleButton/ToggleButton';

export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

const App: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productId, setProductId] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.light)

  const handleModal = useCallback((open: boolean, id?: number) => {
    setIsOpenModal(open);
    setProductId(id || 0);
  }, [])
  
  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "unset";
  }, [isOpenModal]);

  return (
    <Suspense fallback={<Loader />}>
      <Layout themeMode={themeMode}>
        <Navbar />
        <div className={classes.header}>
          <CategoryName categoryName={categoryName} setCategoryName={setCategoryName}/>
          <div className={classes.button_wrapper}>
            <ToggleButton setThemeMode={setThemeMode}/>
            <Filter themeMode={themeMode}/>
          </div>
        </div>
        <hr className={classes.line}/>
        {isError ? (
          <h3 className={classes.error}>Error Fetch</h3>
        ) :  (
          <>
            {categoryName ? 
              <CategoryProducts categoryName={categoryName} handleModal={handleModal} setIsError={setIsError}/> 
              : <Categories setCategoryName={setCategoryName} setIsError={setIsError}/>
            }
            {isOpenModal && <Modal handleModal={handleModal} productId={productId} setIsError={setIsError}/>}
          </>
        )}
      </Layout>
    </Suspense>
  )
}

export default App;