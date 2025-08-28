import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function EmailSenderCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    senderEmail: "",
    smtpServer: "",
    port: 587,
    username: "",
    password: "",
    ccEmails: "", // comma-separated
  });
 const companyDB = localStorage.getItem("companyDB");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isUpdate = localStorage.getItem("EmailSetupId");
  const UpdateBtnText = localStorage.getItem("EmailSetupBtnText");

  useEffect(() => {
    if (isUpdate) fetchEmailSetupById(isUpdate);
  }, [location.key]);

  const fetchEmailSetupById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email-setup/${id}?companyDB=${companyDB}`);
      const data = res.data;

    const mappedData = {
      senderEmail: data.SENDEREMAIL || "",
      smtpServer: data.SMTPHOST || "",       // 🟡 Maps smtpHost → smtpServer
      port: data.SMTPPORT || 587,            // 🟡 Maps smtpPort → port
      username: data.SMTPUSER || "",         // 🟡 Maps smtpUser → username
      password: data.SMTPPASSWORD || "",     // 🟡 Maps smtpPassword → password
      ccEmails: data.CCEMAILS || "",
    };

    setForm(mappedData);
    } catch (err) {
      toast.error("Failed to load email setup");
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.senderEmail) newErrors.senderEmail = "Sender Email is required";
    if (!form.smtpServer) newErrors.smtpServer = "SMTP Server is required";
    if (!form.port) newErrors.port = "Port is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    localStorage.removeItem("EmailSetupId");
    localStorage.removeItem("EmailSetupBtnText");
    setForm({
      senderEmail: "",
      smtpServer: "",
      port: 587,
      username: "",
      password: "",
      ccEmails: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (isUpdate) {
        await axios.put(`${BASE_URL}/api/email-setup/${isUpdate}?companyDB=${companyDB}`, form);
        toast.success("Email setup updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/email-setup?companyDB=${companyDB}`, form);
        toast.success("Email setup created successfully");
      }

      navigate("/email-config");
      clearForm();
    } catch (err) {
      toast.error("Error saving email setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            <Col md={12} className="d-flex justify-content-between">
              {/* <h3>{isUpdate ? "Edit" : "Create"} Email Setup</h3>
              <button className="cus-btn" onClick={clearForm}>
                Clear Form
              </button> */}
               <Col md={12} className="d-flex justify-content-between">
                                        {/* <h3>User Form</h3> */}
                                                                                <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}> {isUpdate ? "Edit" : "Create"} Sender Configuration</h3>
                                        <button className="premium-btn premium-clear" onClick={clearForm} type="button">
                                          Clear Form
                                        </button>
                                      </Col>
            </Col>
          </CardLayout>

          <CardLayout>
            <Row>
              <Col md={4}>
                <LabelField
                  label="Sender Email"
                  type="email"
                  className="form-control"
                  value={form.senderEmail}
                  onChange={(e) => handleInputChange("senderEmail", e.target.value)}
                />
                {errors.senderEmail && <small className="text-danger">{errors.senderEmail}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="SMTP Server"
                  type="text"
                  className="form-control"
                  value={form.smtpServer}
                  onChange={(e) => handleInputChange("smtpServer", e.target.value)}
                />
                {errors.smtpServer && <small className="text-danger">{errors.smtpServer}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="Port"
                  type="number"
                  className="form-control"
                  value={form.port}
                  onChange={(e) => handleInputChange("port", parseInt(e.target.value))}
                />
                {errors.port && <small className="text-danger">{errors.port}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="SMTP Username"
                  type="text"
                  className="form-control"
                  value={form.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="SMTP Password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="CC Emails (comma-separated)"
                  type="text"
                  className="form-control"
                  value={form.ccEmails}
                  onChange={(e) => handleInputChange("ccEmails", e.target.value)}
                />
              </Col>
            </Row>

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create" disabled={loading}>
                  <FontAwesomeIcon icon={faCirclePlus}/>
                {loading
                  ? isUpdate
                    ? "Updating..."
                    : "Creating..."
                  : isUpdate
                  ? "Update Email Setup"
                  : "Create Email Setup"}
              </button>
              <Link to="/email-config">
                <button className="premium-btn premium-filter ms-2">   <FontAwesomeIcon icon={faCircleArrowLeft}/> Back</button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}