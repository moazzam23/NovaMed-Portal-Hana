import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../apis/index";
import axios from "axios";
import { BASE_URL } from "../apis/NodeApiUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    
    const CompanyDB = localStorage.getItem("companyDB");
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/me?companyDB=${CompanyDB}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(res.data);
    console.log(res.data)
    localStorage.setItem("userId", res.data.ID);
    localStorage.setItem("roleId", res.data.ROLEID);
    localStorage.setItem("sapusercode",res.data.SAPUSERCODE)
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }
};

const logout = () => {
  localStorage.clear();
  setIsAuthenticated(false);
  setUser(null);
};

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    login(token); // Fetch current user on reload
  }
}, []);

  // Called when login succeeds (sets session and fetches user)
//   const login = async (cookieHeader) => {
//     localStorage.setItem("SessionId", cookieHeader);
//     setIsAuthenticated(true);

//     try {
//       // const response = await axios.get(`${BASE_URL}/api/sap-current-user?sessionId=${cookieHeader}`);
//       const response = await axios.get(`${BASE_URL}/api/auth/me`);
// console.log(response)
//       setUser(response?.data);
//       localStorage.setItem("userId", response?.data?.UserCode);
//     } catch (error) {
//       console.error("Failed to fetch current user:", error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("SessionId");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("loginEmail");
//     localStorage.removeItem("loginPassword");
//     localStorage.removeItem("companyDB");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   // Initial session check on page load
//   useEffect(() => {
//     const sessionId = localStorage.getItem("SessionId");
//     if (sessionId) {
//       setIsAuthenticated(true);
//       // Optional: fetch user again if needed
//     }
//   }, []);

  // Silent re-login every 28 minutes using stored credentials
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const email = localStorage.getItem("loginEmail");
  //     const password = localStorage.getItem("loginPassword");
  //     const companyDB = localStorage.getItem("companyDB");

  //     if (email && password && companyDB) {
  //       try {
  //         const response = await axios.post(`${BASE_URL}/api/sap-login`, {
  //           UserName: email,
  //           Password: password,
  //           CompanyDB: companyDB,
  //         });

  //         if (response.data?.cookie) {
  //           await login(response.data.cookie);
  //           console.log("Session refreshed successfully");
  //         } else {
  //           console.warn("Silent re-login: no cookie returned");
  //         }
  //       } catch (error) {
  //         console.error("Silent re-login failed:", error);
  //       }
  //     }
  //   }, 28 * 60 * 1000); // 28 minutes

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;