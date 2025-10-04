import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, User } from "../../types/auth";
import {jwtDecode} from "jwt-decode";

const API_BASE_URL = "http://localhost:3000";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getLocaStorageItem = (item: string) => {
    return localStorage.getItem(`${item}`);
}

export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  if (accessToken) {
    console.log("ACCESS TOKEN UPDATED IN STATE:", accessToken);
  }
  }, [accessToken]);

  const decodeUser = (token: string): User => {
    const decoded: any = jwtDecode(token);
    console.log(decoded, "ACCESSTOKEN", accessToken);
    return { id: decoded.id, userName: decoded.username };
  };

const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const analystData = await response.json();

    if (!response.ok) {
      setUser(null);
      setAccessToken(null);
      throw new Error(analystData.message);
    }

    localStorage.setItem("accessToken", analystData.accessToken);
    localStorage.setItem("userDetails", JSON.stringify(decodeUser(analystData.accessToken)));
    setAccessToken(getLocaStorageItem("accesToken"));
    const userDetailsString = getLocaStorageItem("userDetails");
    setUser(userDetailsString ? JSON.parse(userDetailsString) : null);
  } catch (error) {
    setUser(null);
    setAccessToken(null);
    if (error instanceof Error) throw new Error(error.message);
    throw error;

  } finally {
    setLoading(false);
    console.log("AFTER SETTING THE LOADING TO FALSE IN FINALLY BLOCK: ", loading);
  }
};

  const logout = async () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};