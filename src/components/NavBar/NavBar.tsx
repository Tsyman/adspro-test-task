import React, { useState } from 'react';
import classes from './Navbar.module.scss';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SearchInput from './SearchInput/SearchInput';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <SearchInput />
        <ul
          className={
            isOpen ? [classes.menu, classes.active].join(' ') : classes.menu
          }
        >
          <li>
            <a href='#'>Profile</a>
          </li>
          <li>
            <a href='#'>Cart</a>
          </li>
          <li>
            <a href='#'>Contacts</a>
          </li>
        </ul>
        <div onClick={() => setIsOpen(!isOpen)} className={classes.mobile_btn}>
          {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;