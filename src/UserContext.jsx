import { React, createContext, useCallback, useEffect, useState } from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error('Invalid username or password');

      const { token } = await response.json();
      localStorage.setItem('token', token);
      await getUser(token);
      navigate('/account');
    } catch (err) {
        setError(err.message);
        setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Invalid token');
          
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };

    autoLogin();
  }, [userLogout]); 
  
  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }} >
      {children}
    </UserContext.Provider>
  );
};
