import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import SelectField from "../../components/fields/SelectField";
import MultiSelectField from "../../components/fields/MultiSelectField";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function UserCreatep() {
  const navigate = useNavigate();
  const location = useLocation();
  const companyDB = localStorage.getItem("companyDB");
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    roleId: "",
    SapUserName:"",
    SapUserCode:"",
    isActive: true,
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [nextUserId, setNextUserId] = useState("");
  const UpdateBtnText = localStorage.getItem("UpdateUserBtn");

  
  useEffect(() => {
    const docId = localStorage.getItem("UpdateUserId");
    setIsUpdate(!!docId);
    fetchRoles();

    if (docId) {
      fetchUserById(docId);
    } else {
      clearForm();
      fetch(`${BASE_URL}/api/users/next-id?companyDB=${companyDB}`)
        .then((res) => res.json())
        .then((data) => setNextUserId(data.nextId))
        .catch(() => toast.error("Failed to fetch next user ID"));
    }
  }, [location.key]);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/roles?companyDB=${companyDB}`);
      setRoles(res.data || []);
    } catch {
      toast.error("Failed to fetch roles");
    }
  };

  
const fetchUserById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users/${id}?companyDB=${companyDB}`);
    const data = res.data;

  
    setForm({
      ...data,
      username:data.USERNAME,
      name:data.NAME,
      roleId:data.ROLEID,
      email:data.EMAIL,
      phone:data.PHONE,
      gender:data.GENDER,
      SapUserName:data.SAPUSERNAME,
      SapUserCode:data.SAPUSERCODE,
      password: "",
    });
    setNextUserId(data.ID)
    
  } catch {
    toast.error("Failed to load user data");
  }
};

  const clearForm = () => {
    localStorage.removeItem("UpdateUserId");
    localStorage.removeItem("UpdateUserBtn");
    setIsUpdate(false);
    setForm({
      id: "",
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      roleId: "",
      SapUserName:"",
      SapUserCode:"",
      isActive: true,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password && !isUpdate) newErrors.password = "Password is required";
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.roleId) newErrors.roleId = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const preparePayload = () => ({
    ...form,
  });

  const createUser = async () => {
    if (!validateForm()) return;
    const payload = preparePayload();

    try {
      await axios.post(`${BASE_URL}/api/users?companyDB=${companyDB}`, payload);
      toast.success("User created successfully");
      navigate("/user");
      clearForm();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to create user");
    }
  };

  const updateUser = async () => {
    if (!validateForm()) return;
    const userId = localStorage.getItem("UpdateUserId");
    const payload = preparePayload();

    try {
      await axios.put(`${BASE_URL}/api/users/${userId}?companyDB=${companyDB}`, payload);
      toast.success("User updated successfully");
      navigate("/user");
      clearForm();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to update user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isUpdate) {
      await updateUser();
    } else {
      await createUser();
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            <Col md={12} className="d-flex justify-content-between">
              {/* <h3>User Form</h3> */}
                                                      <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}> User Form</h3>
              <button className="premium-btn premium-clear" onClick={clearForm} type="button">
                Clear Form
              </button>
            </Col>
          </CardLayout>

          <CardLayout>
            <Row>
              <Col md={3}>
                <LabelField label="User ID" type="text" className="form-control" value={nextUserId} readOnly />
              </Col>


              <Col md={3}>
                <LabelField
                  label="Username"
                  type="text"
                  required={true}
                  className="form-control"
                  value={form.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </Col>

              {!isUpdate && (
                <Col md={3}>
                  <LabelField
                    label="Password"
                    type="password"
                     required={true}
                    className="form-control"
                    value={form.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </Col>
              )}

              <Col md={3}>
                <LabelField
                  className="form-control"
                  label="Name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </Col>

              <Col md={3}>
                <LabelField
                  className="form-control"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </Col>

              <Col md={3}>
                <LabelField
                  className="form-control"
                  label="Phone"
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </Col>

             <Col md={3}>
  <SelectField
    className="form-control"
    label="Gender"
    value={form.gender}
    options={[
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ]}
    onChange={(e) => handleInputChange("gender", e.target.value)}
  />
  {errors.gender && <small className="text-danger">{errors.gender}</small>}
</Col>


              <Col md={3}>
                <SelectField
                  className="form-control"
                  label="Role"
                  value={form.roleId}
                  options={roles.map((role) => ({ label: role.NAME, value: role.ID }))}
                  onChange={(e) => handleInputChange("roleId", e.target.value)}
                />
                {errors.roleId && <small className="text-danger">{errors.roleId}</small>}
              </Col>
              <Col md={3}>
                <LabelField
                  label="SAP User Code"
                  type="text"
                  className="form-control"
                  value={form.SapUserCode}
                  required={true}
                  onChange={(e) => handleInputChange("SapUserCode", e.target.value)}
                />
              </Col>
<Col md={3}>
                <LabelField
                  label="SAP User Name"
                  type="text"
                  required={true}
                  className="form-control"
                  value={form.SapUserName}
                  onChange={(e) => handleInputChange("SapUserName", e.target.value)}
                />
              </Col>
          </Row>

            <Col md={12} className="mt-3">
              {/* <button type="submit" className="cus-btn" disabled={loading}>
                {loading
                  ? isUpdate
                    ? "Updating..."
                    : "Creating..."
                  : UpdateBtnText || "Create User"}
              </button> */}
              <button type="submit" className="premium-btn premium-create" disabled={loading}>
  {loading ? (
    isUpdate ? "Updating..." : "Creating..."
  ) : (
    UpdateBtnText ? (
      UpdateBtnText
    ) : (
      <>
        <FontAwesomeIcon icon={faCirclePlus} /> Create User
      </>
    )
  )}
</button>

              <Link to="/user">
                <button type="button" className="premium-btn premium-filter ms-3"> <FontAwesomeIcon icon={faCircleArrowLeft}/> Back</button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}