import { AuthContextProps } from '@shared/types';
import React, { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const login = (userEmail: string) => {
    setIsLoggedIn(true);
    setEmail(userEmail);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};
