import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import Register from './Register';
import PasswordLost from './PasswordLost';
import PasswordReset from './PasswordReset';
import { UserContext } from '../../UserContext';
import LoginImage from '../../assets/login.jpg';


const LoginSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;

  &::before {
    content: '';
    display: block;
    background: url(${LoginImage}) no-repeat center center;
    background-size: cover;
  }

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
    &::before {
      display: none;
    }
  }
`;

const LoginForms = styled.div`
  max-width: 30rem;
  padding: 1rem;

  @media (max-width: 40rem) {
    max-width: 100%;
  }
`;

const Login = () => {
  const { login } = useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;

  return (
    <LoginSection>
      <LoginForms>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="passwordlost" element={<PasswordLost />} />
          <Route path="passwordreset" element={<PasswordReset />} />
        </Routes>
      </LoginForms>
    </LoginSection>
  );
};

export default Login;
