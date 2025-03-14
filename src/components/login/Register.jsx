import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import useFetch from '../../hooks/useFetch';
import Error from '../helper/ErrorMessage';


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

const Register = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin } = useContext(UserContext);

  const { loading, error, request } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
  
      const { response } = await request(url, options);
      
      if (response.ok) userLogin(username.value, password.value);
    }
  };

  return (
    <AnimateLeftSection>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Username"
          type="text"
          name="username"
          {...username}
        />
        <Input 
          label="Email"
          type="text"
          name="email"
          {...email}
        />
        <Input 
          label="Password"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Signing up...</Button>
        ) : (
          <Button>Register</Button>
        )}
        <Error error={error} />
      </form>
    </AnimateLeftSection>
  );
};

export default Register;
