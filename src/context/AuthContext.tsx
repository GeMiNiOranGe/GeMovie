import { AuthContextProps } from '@shared/types';
import React, { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = (userName: string): void => {
    setIsLoggedIn(true);
    setUsername(userName);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
