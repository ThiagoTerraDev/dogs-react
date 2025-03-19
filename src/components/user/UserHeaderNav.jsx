import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import MyPhotos from '../../assets/feedFinal.svg?react';
import AddPhoto from '../../assets/adicionar.svg?react';
import Stats from '../../assets/estatisticas.svg?react';
import Logout from '../../assets/sair.svg?react';
import styled from 'styled-components';
import useMedia from '../../hooks/useMedia';


const UserHeaderNavigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  a, button {
    background: #eee;
    border-radius: 0.2rem;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    transition: 0.1s;
    cursor: pointer;

    &:hover,
    &:focus {
      background: white;
      box-shadow: 0 0 0 3px #eee;
      border-color: #333;
      outline: none;
    }
  }

  a.active {
    background: white;
    box-shadow: 0 0 0 3px #fea;
    border-color: #fb1;
  }

  a.active svg > * {
    fill: #fb1;
  }

  &.navMobile {
    display: block;
    position: absolute;
    top: 70px;
    right: 0px;
    padding: 0 1rem;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 0.2rem;
    transform: translateX(-10px);
    pointer-events: none;
    opacity: 0;
  }

  &.navMobile a, &.navMobile button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
    cursor: pointer;
  }

  &.navMobile a.active {
    box-shadow: none;
  }

  &.navMobile a:hover, 
  &.navMobile button:hover,
  &.navMobile a:focus,
  &.navMobile button:focus {
    box-shadow: none;
    border-color: none;
  }

  &.navMobile a:hover svg > *, 
  &.navMobile button:hover svg > * {
    fill: #fb1;
  }

  &.navMobile button {
    border-bottom: none;
  }

  &.navMobile svg {
    margin-right: 0.6rem;
  }

  &.navMobileActive {
    transition: 0.3s;
    transform: initial;
    opacity: 1;
    z-index: 100;
    pointer-events: initial;
  }
`;

const MobileMenuButton = styled.button`
  background: #eee;
  border-radius: 0.2rem;
  height: 40px;
  width: 40px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.1s;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 1.2rem;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    box-shadow: 0 6px currentColor, 0 -6px currentColor;
    transition: 0.2s;
  }

  &:hover,
  &:focus,
  &.active {
    background: white;
    box-shadow: 0 0 0 3px #fea;
    border-color: #fb1;
    outline: none;
    color: #fb1;
  }

  &.active::after {
    transform: rotate(90deg);
    width: 4px;
    height: 4px;
    box-shadow: 0 8px currentColor, 0 -8px currentColor;
  }
`;

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();
  const mobileMenuRef = useRef();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    }

    if (mobileMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    
  }, [mobileMenu]);

  const handleLogout = async () => {
    userLogout();
    navigate('/login');
  };

  return (
    <>
      {mobile && (
        <MobileMenuButton 
          aria-label='Menu' 
          onClick={() => setMobileMenu(!mobileMenu)}
          className={mobileMenu && 'active'}
        ></MobileMenuButton>
      )}
      <UserHeaderNavigation
        className={`${mobile ? 'navMobile' : ''} ${mobileMenu ? 'navMobileActive' : ''}`}
        ref={mobileMenuRef}
      >
        <NavLink 
          to='/account' 
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <MyPhotos />
          {mobile && 'My account'}
        </NavLink>
        <NavLink 
          to='/account/stats'
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <Stats />
          {mobile && 'Statistics'}
        </NavLink>
        <NavLink 
          to='/account/post'
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <AddPhoto />
          {mobile && 'Add photo'}
        </NavLink>
        <button onClick={handleLogout}>
          <Logout />
          {mobile && 'Logout'}
        </button>
      </UserHeaderNavigation>
    </>
    
  );
};

export default UserHeaderNav;
