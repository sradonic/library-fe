import React, { useContext } from 'react';

const UserContext = React.createContext({
  setUserData: jest.fn(),
  setTokenData: jest.fn(),
  user: null
});

export const useUser = () => useContext(UserContext);
