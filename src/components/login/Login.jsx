import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import PasswordLost from './PasswordLost';
import PasswordReset from './PasswordReset';


const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="register" element={<Register />} />
        <Route path="passwordlost" element={<PasswordLost />} />
        <Route path="passwordreset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;
