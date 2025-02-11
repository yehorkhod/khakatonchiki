import React, { useEffect, useState } from "react";
import { UserIdContext } from "./UserIdContext";

type Props = {
  children: React.ReactNode;
}

export const UserIdProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId") || null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (id: string) => {
    setUserId(id);
    localStorage.setItem("userId", id);
  }
  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId"); 
  };

  const value = {
    userId,
    login,
    logout,
  }
  return (
    <UserIdContext.Provider value={value}>
      {children}
    </UserIdContext.Provider>
  )
}