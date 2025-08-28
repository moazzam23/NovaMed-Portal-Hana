import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import SelectField from "../../components/fields/SelectField";
import axiosInstance from "../../apis";

export default function CreateBrand() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [clients, setClients] = useState([]);
  const [branch, setBranch] = useState([]);
  const navigate=useNavigate();
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cd_client_id: "",
    cd_branch_id:"",
    is_active: true,
    created_by: "malpos",
    updated_by: "malpos",
  });

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
  const fetchbranch = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranch(formattedData);
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
  const handlebranchchange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
  cd_branch_id: parseInt(e.target.value),
    }));
  };

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

  const fetchBrandData = async () => {
    const brandId = localStorage.getItem("brandId");
    setEditId(brandId);
    if (brandId) {
      setIsUpdate(true);
      try {
        const response = await axiosInstance.get(`/cdbrand_edit/${brandId}`);
        const brandData = response.data;
        setFormData({
          name: brandData.name,
          is_active: brandData.is_active,
          created_by: brandData.created_by,
          updated_by: brandData.created_by,
          cd_branch_id:brandData.cd_branch_id,
          cd_client_id: brandData.cd_client_id,
        });
        localStorage.removeItem("brandId");
      } catch (error) {
        console.log(error, "Error retrieving brand data");
      }
    }
  };

  useEffect(() => {
    fetchBrandData();
    fetchClients();
    fetchbranch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (isUpdate) {
        // Update request
        response = await axiosInstance.post(
          `/cdbrand_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Brand edited successfully", {
          autoClose: 4000,
        });
        navigate("/brands");
      } else {
        // Create request
        response = await axiosInstance.post("/cdbrand_store", updatedFormData);
        toast.success("Brand created successfully", {
          autoClose: 4000,
        });
        navigate("/brands");
      }
    } catch (error) {
      console.error("Error creating/updating User", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Brand</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Col md={12}>
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
                          label="Branch"
                          name="cd_branch_id"
                          options={branch}
                          value={formData.cd_branch_id}
                          onChange={handlebranchchange}
                        />
                      </Col>
                      <Col md={12}>
                        <LabelField
                          type="text"
                          placeholder="Name"
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Col>
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
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/brands">
                          <button
                            className="cus-btn-bor"
                            style={{
                              backgroundColor: "#F07632",
                              color: "white",
                              borderColor: "#F07632",
                            }}
                          >
                            Back
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardLayout>
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
