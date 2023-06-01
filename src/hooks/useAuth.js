import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import endPoints from 'services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log(access_token);
    if (access_token) {
      Cookies.set('token', access_token, { expires: 5 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };
  return {
    user,
    signIn,
    error,
    setError,
    logout,
  };
}
