import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../forms/Input';
import Button from '../forms/Button';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(json => {
      console.log(json);
    });
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input 
          label='Username'
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)} />
        <Input 
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)} />
        <Button disabled={false}>Enter</Button>
      </form>
      <Link to="/login/register">Register</Link>
    </section>
  );
};

export default LoginForm;
