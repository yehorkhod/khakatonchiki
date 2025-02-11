import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useContext } from 'react';
import { UserIdContext } from '../../context/UserIdContext';

export const Header = () => {
  const chooseActivePage = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'header__nav_link header__is-active' : 'header__nav_link';

  const chooseActivePageButton = ({ isActive }: { isActive: boolean }) =>
    isActive ?
      'header__buttons_element header__is-active'
      : 'header__buttons_element';
  
  const { userId } = useContext(UserIdContext);

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
            to="/about-us"
            className={chooseActivePage}
          >
            <div>ПРО НАС</div>
          </NavLink>
        </nav>
        <div className="header__buttons">
          <div className="profile-icon">
            <NavLink
              to={userId ? `/profile/${userId}` : '/register'}
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
