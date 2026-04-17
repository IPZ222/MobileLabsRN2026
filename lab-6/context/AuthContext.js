import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = (e, p) => signInWithEmailAndPassword(auth, e, p);
  const register = (e, p) => createUserWithEmailAndPassword(auth, e, p);
  const logout = () => signOut(auth);
  const resetPassword = (e) => sendPasswordResetEmail(auth, e);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);