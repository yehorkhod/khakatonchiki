import React from 'react';

type UserContextType = {
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
};

export const UserIdContext = React.createContext<UserContextType>({
  userId: null,
  login: () => {},
  logout: () => {},
});
