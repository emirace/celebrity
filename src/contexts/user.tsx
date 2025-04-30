"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserProfile, updateUserProfile } from "../services/user";
import { IProfileData, IUser } from "../types/user";

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  count: {
    meet: number;
    fancard: number;
    bookings: number;
  };
  getUser: () => Promise<void>;
  updateUser: (profileData: IProfileData) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [count, setCount] = useState({
    meet: 0,
    fancard: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(user);

  const getUser = async () => {
    try {
      const data = await getUserProfile();
      console.log("User data:", data);
      setUser(data.user);
      setCount(data.counts);
    } catch (err) {
      throw err;
    }
  };

  const updateUser = async (profileData: IProfileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setLoading(true);
    getUser()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user profile");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        count,
        getUser,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
