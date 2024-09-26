import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      username,
      password,
    });
    setUser(response.data.token);
  };

  const register = async (username, password) => {
    await axios.post("http://localhost:5000/api/users/register", {
      username,
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
