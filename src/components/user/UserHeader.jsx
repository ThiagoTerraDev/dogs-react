import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserHeaderNav from './UserHeaderNav';
import { useLocation } from 'react-router-dom';


const UserHeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
  position: relative;
`;

const UserHeader = () => {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    
    switch (pathname) {
      case '/account/stats':
        setTitle('Statistics');
        break;
      case '/account/post':
        setTitle('Post a photo');
        break;
      default:
        setTitle('My account');
    }
  }, [location]);

  return (
    <UserHeaderStyled>
      <h1>{title}</h1>
      <UserHeaderNav />
    </UserHeaderStyled>
  );
};

export default UserHeader;
