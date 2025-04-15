import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/login/Login';
import { UserStorage } from './UserContext';
import ProtectedRoute from './components/helper/ProtectedRoute';
import User from './components/user/User';


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0px;
    padding-top: 4rem;
    color: #333;
    --type--first: 'Helvetica', 'Arial', sans-serif;
    --type--second: 'Spectral', 'Georgia';
    font-family: var(--type--first);
  }
  h1, h2, h3, h4, p {
    margin: 0px;
  }
  h1 {
    font-family: var(--type--second);
    line-height: 1;
    font-size: 3rem;
    margin: 1rem 0;
    position: relative;
    z-index: 1;
  }
  h1::after {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background: #fb1;
    position: absolute;
    bottom: 5px;
    left: -5px;
    border-radius: 0.2rem;
    z-index: -1;

  }
  ul, li {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }
  img {
    display: block;
    max-width: 100%;
  }
  button, input {
    display: block;
    font-size: 1rem;
    font-family: var(--type--first);
    color: #333;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  .container {
    max-width: 50rem;
    padding: 0 1rem;
    margin: 0 auto;
  }
  .mainContainer {
    margin-top: 4rem;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <BrowserRouter>
          <UserStorage>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login/*' element={<Login />} />
              <Route 
                path='/account/*' 
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </UserStorage>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
