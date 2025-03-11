import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dog from '../Assets/dogs.svg?react';
import UserIcon from '../Assets/usuario.svg?react';
import { UserContext } from '../UserContext';


const HeaderContainer = styled.header`
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 100;
  background: white;
  top: 0px;
`;

const HeaderNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const LogoLink = styled(Link)`
  padding: 0.5rem 0;
`;

const AuthLink = styled(Link)`
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserIconStyled = styled(UserIcon)`
  position: relative;
  top: -1px;
`;

const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <HeaderContainer>
      <HeaderNavigation className='container'>
        <LogoLink to="/" aria-label="Dogs - Home">
          <Dog />
        </LogoLink>
        {data ? (
          <>
            <AuthLink to="account">
              {data.username}
              <UserIconStyled />
            </AuthLink>
            <button onClick={userLogout}>Logout</button>
          </>
        ) : (
          <AuthLink to="/login">
            Login / Register
            <UserIconStyled />
          </AuthLink>
        )}
      </HeaderNavigation>
    </HeaderContainer>
  );
};

export default Header;
