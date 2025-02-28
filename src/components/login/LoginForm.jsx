import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';


const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) getUser(token);
  }, []);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({ 
        username: username.value, 
        password: password.value 
      });

      const response = await fetch(url, options);
      const json = await response.json();
      
      localStorage.setItem('token', json.token);
      getUser(json.token);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <Button disabled={false}>Enter</Button>
      </form>
      <Link to="/login/register">Register</Link>
    </section>
  );
};

export default LoginForm;
