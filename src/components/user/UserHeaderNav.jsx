import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import MyPhotos from '../../assets/feedFinal.svg?react';
import AddPhoto from '../../assets/adicionar.svg?react';
import Stats from '../../assets/estatisticas.svg?react';
import Logout from '../../assets/sair.svg?react';
import styled from 'styled-components';


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
`;

const UserHeaderNav = () => {
  const [mobile, setMobile] = useState(null);
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    userLogout();
    navigate('/login');
  };

  return (
    <UserHeaderNavigation>
      <NavLink 
        to='/account' 
        end
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        <MyPhotos />
        {mobile && 'My photos'}
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
  );
};

export default UserHeaderNav;
