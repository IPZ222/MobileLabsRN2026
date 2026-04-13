import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (email, password) => {
    // Тут можна додати перевірку, але для лаби просто пропускаємо
    setIsAuthenticated(true);
    // Expo Router автоматично зреагує на зміну стану в _layout
  };

  const register = (email, password, name) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);