import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import SelectField from "../../components/fields/SelectField";
import "react-phone-input-2/lib/style.css";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { useEffect } from "react";
import axiosInstance from "../../apis";

export default function ClientCreate() {
  const navigate=useNavigate();
  const [phone, setPhone] = useState("");
  const [isUpdate, setIsUpdate] = useState(false); // Flag to indicate update request
  const [editId, setEditId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    city_id: "",
    country_id: "",
    is_active: "1",
    client_role: "",
    cd_client_id: "1",
    created_by: "malpos",
    updated_by: "malpos",
  });

  const Countriesoption =
    countries != undefined &&
    countries?.map((item, index) => ({
      label: item,
      value: item,
    }));

  const Cityoption =
    cities != undefined &&
    cities?.map((item, index) => ({
      label: item,
      value: item,
    }));

    const handleChange = (e) => {

      const { name, value } = e.target;
  
      if(name =='country_id'){
        fetchCity(value);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //     if(name =='country'){
  //       fetchCity(value);
  //     }
  //   });
  // };

  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked ? "1" : "0",
    });
  };

  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get("/get_country");
      console.log(res.data, "get_country");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = async (country) => {

    try {
      const res = await axiosInstance.get(`/get_city/${country}/`);
      console.log(res.data, "city");
      setCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientData = async () => {
    const clientId = localStorage.getItem("clientId");
    setEditId(clientId)
    if (clientId) {
      setIsUpdate(true); 
      try {
        const response = await axiosInstance.get(`/cdclient_edit/${clientId}`);
        const clientData = response.data;
        setFormData({
          name: clientData.name,
          email: clientData.email,
          phone_no: clientData.phone_no,
          address: clientData.address,
          city_id: clientData.city_id,
          country_id: clientData.country_id,
          is_active: "1",
          client_role: clientData.client_role,
          cd_client_id: clientData.cd_client_id,
          created_by: clientData.created_by,
          updated_by: clientData.updated_by,
        });
        setPhone(clientData.phone_no);
        localStorage.removeItem("clientId")
      } catch (error) {
        console.log(error, "Error retrieving client data");
      }
    }
  };

  useEffect(() => {
    fetchClientData();
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        phone_no: phone,
      };

      let response;

      if (isUpdate) {
        // Update request
        response = await axiosInstance.post(
          `/cdclient_update/${editId}`,
          updatedFormData
        );
        setEditId(null)
        toast.success("Client edited successfully", {
          autoClose: 4000,
          className: "custom-toast-success", // Add a custom CSS class for red color
        });
        navigate("/clients")
        
      } else {
        // Create request
        response = await axiosInstance.post("/cdclient_store", updatedFormData);
        toast.success("Client created successfully", {
          autoClose: 4000,
          className: "custom-toast-success",
        });
        navigate("/clients")
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error creating/updating client", error);
      toast.error("Error Creating Client", {
        autoClose: 4000,
        className: "custom-toast-success",
      });
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Client</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Col md={6}>
                    <LabelField
                      type={"text"}
                      placeholder={"Name"}
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      value={formData?.name}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <LabelField
                      type={"email"}
                      placeholder={"Email"}
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData?.email}
                    />
                  </Col>
                  <Col md={6}>
                    <PhoneInput
                      country={"us"}
                      name="phone_no"
                      value={formData?.phone_no}
                      placeholder={"Phone #"}
                      onChange={
                        (phone) => setPhone(phone) // Update phone state
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <LabelField
                      type={"text"}
                      placeholder={"Address"}
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      value={formData?.address}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectField
                    style={{width:"65%"}}
                      required
                      label="Country"
                      name="country_id"
                      type="select"
                      title="country"
                      options={Countriesoption}
                      value={formData?.country_id}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      required
                      label="City"
                      name="city_id"
                      type="select"
                      title="city"
                      options={Cityoption}
                      value={formData?.city_id}
                      onChange={handleChange}
                    />
                  </Col>
                  {/* <Col md={6}>
                    <LabelField
                      type={"text"}
                      placeholder={"City"}
                      label="City"
                      name="city_id"
                      onChange={handleChange}
                      value={formData?.city_id}
                    />
                  </Col>
                  <Col md={6}>
                    <LabelField
                      type={"text"}
                      placeholder={"Country"}
                      label="Country"
                      name="country_id"
                      onChange={handleChange}
                      value={formData?.country_id}
                    />
                  </Col> */}
                  <Col md={6}>
                    <LabelField
                      type={"text"}
                      placeholder={"Role"}
                      label="Role"
                      name="client_role"
                      onChange={handleChange}
                      value={formData?.client_role}
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
                        checked={formData?.is_active}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        is Active?
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <button type="submit" className="cus-btn">
                      Create
                    </button>
                    <Link to="/clients">
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
              </CardLayout>
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
