import axiosInstance from "../apis"; // adjust path as needed
import { toast } from "react-toastify";

export const sapLogin = async (user) => {
  const companyDB = localStorage.getItem("companyDB");

  if (!companyDB) {
    toast.error("CompanyDB not found in localStorage");
    return null;
  }

  try {
    const requestData = {
      // UserName: user.SAPUSERNAME,
      // Password: user.SAPPASSWORD,
            UserName: "manager",
      Password: "Far123",
      CompanyDB: companyDB,
    };

    const response = await axiosInstance.post("/Login", requestData);

    if (response.data.SessionId) {
      // localStorage.setItem("sessionId", response.data.SessionId);
      return response.data.SessionId;
    } else {
      toast.error("SAP login failed: No SessionId returned");
      return null;
    }
  } catch (error) {
    console.error("SAP Login Error:", error);
    toast.error("SAP login failed");
    return null;
  }
};
