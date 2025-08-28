import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
// import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../apis";

export default function UserCreate() {
  const navigate=useNavigate();
  const [isUpdate, setIsUpdate] = useState(false); // Flag to indicate update request
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    cd_role_id: "",
    password: "",
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    is_active: true,
    updated_by: "malpos",
    created_by: "malpos",
    actions: "2",
  });
  const [editId, setEditId] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    setEditId(userId);
    if (userId) {
      setIsUpdate(true); // Set the flag to indicate update
      try {
        const response = await axiosInstance.get(`/user_edit/${userId}`);
        const userData = response.data[0];
        console.log("userdata",userData);
        setFormData({
         
          cd_client_id: userData.cd_client_id,
          cd_brand_id:userData.cd_brand_id,
          cd_branch_id:userData.cd_branch_id,
          cd_role_id:userData.cd_role_id,
            name:userData.name ||"",
          email: userData.email || "",
          is_active: userData.is_active !== null ? userData.is_active : false,
          actions: userData.actions || "",
          created_by: userData.created_by || "",
          updated_by: userData.updated_by || "",
        });
        localStorage.removeItem("userId");
      } catch (error) {
        console.log(error, "Error retrieving client data");
      }
    }
  };

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axiosInstance.get("/admin_roles");
      const formattedData = formatData(res.data, "cd_role_id");
      console.log();
      setRoles(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_role_id: parseInt(e.target.value),
    }));
  };

  useEffect(() => {
    fetchUserData();
    fetchClients();
    fetchBranches();
    fetchBrands();
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(updatedFormData);
    try {
      const updatedFormData = {
        ...formData,
      };
      let response;

      if (isUpdate) {
        // Update request
        response = await axiosInstance.post(
          `/user_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        toast.success("User edited successfully", {
          autoClose: 4000,
        });
navigate("/users")
        resetForm();
      } else {
        // Create request
        response = await axiosInstance.post("/user_store", updatedFormData);
        toast.success("User created successfully", {
          autoClose: 4000,
        });
        navigate("/users")
        resetForm();
      }
    } catch (error) {
      console.error("Error creating/updating User", error);
    }
  };

  const resetForm = () => {
    setFormData({
      email: " ",
      name: "",
      role: "",
      password: " ",
      is_active: 1,
      updated_by: "malpos",
      created_by: "malpos",
      actions: "2",
    });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Create User</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Row>
                  <Col md={4}>
                    <SelectField
                      label="Client"
                      name="cd_client_id"
                      options={clients}
                      value={formData.cd_client_id}
                      onChange={handleClientChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      label="Brand"
                      name="cd_brand_id"
                      options={brands}
                      value={formData.cd_brand_id}
                      onChange={handleBrandChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      label="Branch"
                      name="cd_branch_id"
                      options={branches}
                      value={formData.cd_branch_id}
                      onChange={handleBranchChange}
                    />
                  </Col>

                  <Col md={6}>
                    <Row>
                      <Col md={12}>
                        <Col md={12}>
                          <LabelField
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <LabelField
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData?.email}
                          onChange={handleChange}
                          autocomplete="off"
                        />

                        <Col md={12}>
                          <SelectField
                            label="Role"
                            name="cd_role_id"
                            options={roles}
                            value={formData.cd_role_id}
                            onChange={handleRoleChange}
                          />
                        </Col>
                      </Col>

                      <Col md={12}>
                        <LabelField
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </Col>
                      {/* <Col md={12}>
                        <MultiSelectField
                          label="Role"
                          name="role"
                          type="select"
                          value={formData.role}
                          onChange={handleChange}
                        />
                      </Col> */}

                      <Col md={6}>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            name="is_active"
                            onChange={handleCheckChange}
                            checked={formData.is_active}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            is Active?
                          </label>
                        </div>
                      </Col>
                      <Col md={12}>
                        <button className="cus-btn"> Create</button>
                        <Link to="/users">
                          <button
                            style={{
                              backgroundColor: "#F07632",
                              color: "white",
                              borderColor: "#F07632",
                            }}
                            className="cus-btn-bor"
                          >
                            Back
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardLayout>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
