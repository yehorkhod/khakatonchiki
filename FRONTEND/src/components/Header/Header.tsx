import { NavLink } from 'react-router-dom';
import './Header.scss';
// import Logo from '../../../public/img/header_components/Logo.svg?react';
// import Favourites from '../../../public/img/header_components/Favourites.svg?react';
// import ShoppingBag from '../../../public/img/header_components/Shopping bag.svg?react';
// import Menu from '../../../public/img/header_components/Menu.svg?react';
// import CloseIcon from '../../../public/img/header_components/Close.svg?react';
// import { useTheme } from '../../hooks/useTheme';
// import classnames from 'classnames';

export const Header = () => {
  const chooseActivePage = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'header__nav_link header__is-active' : 'header__nav_link';

  const chooseActivePageButton = ({ isActive }: { isActive: boolean }) =>
    isActive ?
      'header__buttons_element header__is-active'
    : 'header__buttons_element';

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <NavLink to="/">
            <img
              src="/icons/icon.png"
              alt="icon"
              className="header__logo--img"
            />
          </NavLink>
        </div>
        <nav className="header__nav">
          <NavLink
            to="/"
            className={chooseActivePage}
          >
            <div>ГОЛОВНА</div>
          </NavLink>
          <NavLink
            to="/quests"
            className={chooseActivePage}
          >
            <div>УСІ КВЕСТИ</div>
          </NavLink>
          <NavLink
            to="/create-quest"
            className={chooseActivePage}
          >
            <div>СТВОРИТИ КВЕСТ</div>
          </NavLink>
          <NavLink
            to="/about us"
            className={chooseActivePage}
          >
            <div>ПРО НАС</div>
          </NavLink>
        </nav>
        <div className="header__buttons">
          <div className="profile-icon">
            <NavLink
              to="/profile"
              className={chooseActivePageButton}
            >
              <img
                src="/icons/acc-icon.png"
                alt="acc"
                className="profile-icon__img"
              />
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

// check if is authed --> if so => acc logo, if not => enter acc
