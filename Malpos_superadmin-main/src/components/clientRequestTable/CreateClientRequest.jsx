import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import axiosInstance from "../../apis";
import SelectField from "../../components/fields/SelectField";

const CreateClientRequest = () => {
  const [requests, setRequests] = useState([]);
  const [editId, setEditId] = useState(null);
  const [brands, setBrands] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    request_types: "",
    request_by: "",
    request_no: "",
    status: "pending",
    repersentative: "",
    city: "",
    country: "",
    date_of_request: "",
    date_of_completion: "",
  });

  const location = useLocation();

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      const formattedData = formatData(res.data, "cd_cliend_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
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

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };

  const fetchRequestData = async () => {
    if (editId !== null) {
      try {
        const response = await axiosInstance.get(`/cdrequest_edit/${editId}`);
        const requestData = response.data;
        setFormData({
          cd_client_id: requestData.cd_client_id,
          cd_brand_id: requestData.cd_brand_id,
          request_types: requestData.request_types,
          request_by: requestData.request_by,
          request_no: requestData.request_no,
          status: requestData.status,
          repersentative: requestData.repersentative,
          city: requestData.city,
          country: requestData.country,
          date_of_request: requestData.date_of_request,
          date_of_completion: requestData.date_of_completion,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setEditId(location.state?.id);
    fetchBrands();
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (editId !== null) {
        response = await axiosInstance.post(
          `/cdrequest/${editId}`,
          updatedFormData
        );
        toast.success("Request edited successfully", {
          autoClose: false,
        });
      } else {
        // Create request
        response = await axiosInstance.post(
          "/cdrequest_store",
          updatedFormData
        );
        toast.success("Request created successfully", {
          autoClose: false,
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Client Request</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
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
                      label="Request"
                      name="cd_brand_id"
                      options={brands}
                      value={formData.cd_brand_id}
                      onChange={handleBrandChange}
                    />
                  </Col>
                </Row>
              </CardLayout>
            </Col>
          </Row>
        </form>
      </PageLayout>
    </>
  );
};

export default CreateClientRequest;
