import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/login/Login';


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
  }
  .container {
    max-width: 50rem;
    padding: 0 1rem;
    margin: 0 auto;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
