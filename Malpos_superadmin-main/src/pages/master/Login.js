import React, { useState, useContext, useEffect } from "react";
import { Box, Button } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import data from "../../data/loginData.json";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/index";
import { AuthContext } from "../../context/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import SelectField from "../../components/fields/SelectField";
import "../../pagesNew/LoginPage/Login.css"; // You’ll create this file
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/GetCompany");
      const formattedData = res.data.map((wh) => ({
        label: `${wh.dbName} - ${wh.cmpName}`,
        value: wh.dbName,
      }));
      setCompany(formattedData);
    } catch (error) {
      console.log("Item fetch error:", error);
    }
  };
  
  localStorage.setItem("companyDB", selectedCompany);

    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestData = {
        username: formData.UserName,
        password: formData.Password,
      };

       const response = await axios.post(`${BASE_URL}/api/auth/login?companyDB=${selectedCompany}`, requestData);


      if (response.data?.token) {
        await login(response.data.token);
        toast.success("Login successfully");
          sessionStorage.setItem("justLoggedIn", "true");
        navigate("/dashboard");
      } else {
        toast.error(" login failed — no session returned");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Wrong Email or Password", {
        autoClose: true,
        closeButton: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
       <div className="login-container">
        <div className="login-left">
          <img src="images/CO_LOGO.jpg" className="login-logo" alt="Logo" />
        </div>

        <div className="login-divider" />

        <div className="login-right">
          <form onSubmit={handleLogin} className="login-form">
            <h2 className="login-title">
              Nova<span className="highlight">Med</span>
            </h2>

            <SelectField
              style={{ marginBottom: "20px" }}
              options={company}
              value={selectedCompany}
              required
              name="CompanyDB"
              onChange={(e) => setSelectedCompany(e.target.value)}
              />

            {data?.input.map((item, index) => (
              <IconField
              key={index}
                icon={item.icon}
                type={item.type}
                name={item.name}
                option={item.option}
                classes={item.fieldSize}
                placeholder={item.placeholder}
                passwordVisible={item.passwordVisible}
                value={formData[item.name] || ""}
                onChange={handleInputChange}
                />
              ))}

            <Button
              className={`mc-auth-btn ${data?.button.fieldSize}`}
              type={data?.button.type}
              submit
              >
           <Button className="mc-auth-btn" type="submit">
  {loading ? "Logging in..." : data?.button.text}
</Button>
            </Button>
          </form>
        </div>
              </div>
   
      </div>
  );
}


