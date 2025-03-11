import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';
import ErrorMessage from '../helper/ErrorMessage';


const animeLeft = keyframes`
  to {
    opacity: 1;
    transform: initial;
  }
`;

const AnimateLeftSection = styled.section`
  opacity: 0;
  transform: translateX(-20px);
  animation: ${animeLeft} 0.3s forwards;
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const PasswordLostLink = styled(Link)`
  display: inline-block;
  color: #666;
  padding: 0.5rem 0;
  line-height: 1;

  &::after {
    content: '';
    height: 2px;
    width: 100%;
    background: currentColor;
    display: block;
  }
`;

const RegisterSection = styled.div`
  margin-top: 4rem;
  p {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-family: var(--type--second);
  line-height: 1;
  font-size: 2rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    background: #ddd;
    height: 0.5rem;
    width: 3rem;
    border-radius: 0.2rem;
    position: absolute;
    top: 2.5rem;
  }
`;

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <AnimateLeftSection>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Input 
          label='Username'
          type='text'
          name='username'
          {...username}
        />
        <Input 
          label='Password'
          type='password'
          name='password'
          {...password}
        />
        {loading ? (
          <Button disabled>Please wait</Button>
        ) : (
          <Button disabled={false}>Sign In</Button>
        )}
        {error && <ErrorMessage error={error} />}
      </Form>
      <PasswordLostLink to="/login/passwordlost">Lost password?</PasswordLostLink>
      <RegisterSection>
        <Subtitle>Sign Up</Subtitle>
        <p>Don&apos;t have an account? Feel free to sign up!</p>
        <Button as={Link} to="/login/register">Sign Up</Button>
      </RegisterSection>
    </AnimateLeftSection>
  );
};

export default LoginForm;
