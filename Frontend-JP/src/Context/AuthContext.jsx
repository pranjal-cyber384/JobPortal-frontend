import { createContext, useEffect, useMemo, useState } from "react";

import api from "../service/api";
const AuthContext = createContext();
const STORAGE_KEY = "watchStoreAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);

      if (parsed?.token && parsed?.user) {
        setToken(parsed.token);
        setUser(parsed.user);
      }
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem(STORAGE_KEY);
  } finally {
    setIsLoading(false);
  }
}, []);

  const register = async (formData) => {
  try {
    const res = await api.post("/api/auth/register", formData);
    console.log("REGISTER RESPONSE FULL:", res.data);
    const data = res.data.data;
    const user = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    const token = data.token;
    const authData = { user, token };
    setUser(user);
    setToken(token);
    localStorage.setItem("watchStoreAuth", JSON.stringify(authData));
    console.log("USER SET:", user);
  } catch (err) {
    console.error("REGISTER ERROR:", err.response?.data);
  }
};

  const logout = () => {
    
    setUser(null);
    setToken("");
     
    localStorage.removeItem(STORAGE_KEY);
  };

const login = async (payload) => {
  try {
    const res = await api.post("/api/auth/login", payload);
    const data = res.data;
    if (data.status !== "success") {
      return { success: false, message: data.message };
    }
    const authData = data.data;
    setToken(authData.token);
    const profileRes = await api.get("/api/auth/profile", {
      headers: { Authorization: `Bearer ${authData.token}` },
    });

    const user = profileRes.data.data;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: authData.token,
        user: user,
      })
    );

    setUser(user);
    return { success: true };
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

  const fetchProfile = async () => {
    if (!token) return;
    const res = await api.get("/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.data);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token,
        user: res.data.data,
      })
    );
  };

  const updateProfile = async (payload) => {
  const res = await api.put("/api/auth/profile", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const updatedUser = res.data.data;
  const authData = {
    token: token,
    user: updatedUser,
  };

  setUser(updatedUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

  return res.data;
};

  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === "admin";
  const isRecruiter = user?.role === "recruiter";
  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        isAdmin,
        isRecruiter,
        authHeaders,
        register,
        login,
        logout,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;