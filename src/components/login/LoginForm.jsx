import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';


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
        {error && <p>{error}</p>}
        {loading ? (
          <Button disabled>Please wait</Button>
          ) : (
            <Button disabled={false}>Sign In</Button>
          )
        }
      </form>
      <Link to="/login/register">Register</Link>
    </section>
  );
};

export default LoginForm;
