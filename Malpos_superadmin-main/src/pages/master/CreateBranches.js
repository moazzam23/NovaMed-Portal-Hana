import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import api from "../../apis"
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import axiosInstance from "../../apis";
import SelectField from "../../components/fields/SelectField";

export default function CreateBranch() {
  const navigate=useNavigate()
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [editId, setEditId] = useState(null);
  const[client,setClient]=useState([]);
  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState([]);
  const [region, setRegion] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    cd_brand_id: "",
    cd_client_id:"",
    gd_country_id: "",
    gd_region_id: "",
    td_currency_id: "",
    is_active: true,
    created_by: "malpos",
    updated_by: "malpos",
  });

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({
      label: item[nameKey] || item["currency_type"] || item["country"], // Use appropriate property name
      value: item[idKey],
    }));

  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClinets = async () => {
    try {
      const res = await api.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClient(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const res = await api.get("/currency");
      const formattedData = formatData(
        res.data,
        "td_currency_id",
        "currency_type"
      ); // Use "currency_type" as nameKey
      setCurrency(formattedData);
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
  const Countriesoption =
  country != undefined &&
  country?.map((item,id, index) => ({
    label: item,
    value: id,
  }));
  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get("/get_country");
      // console.log(res.data, "get_country");
      setCountry(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value) || '',
    }));
  };
  const handleclientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value) || '',
    }));
  };

  const handleCurrencyChange = (e) => {
    // console.log(selectedCurrency.target.value, "sdsd");
    setFormData((prevForm) => ({
      ...prevForm,
      td_currency_id:parseInt(e.target.value) || '',
    }));
  };

  const fetchBranchData = async () => {
    const branchId = localStorage.getItem("branchId");
    setEditId(branchId);
    if (branchId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/cdbranch_edit/${branchId}`);
        const form = response.data[0];
        console.log("Fetched Data:", form);
        setFormData ((prevForm) => ({
          ...prevForm,
          name:form.name ||"",
          is_active:form.is_active || false,
          created_by:form.created_by || "malpos",
          updated_by:form.updated_by || "malpos",
          cd_client_id:form.cd_client_id||"",
          td_currency_id:form.td_currency_id || "",
          cd_brand_id: form.cd_brand_id || "",
          gd_country_id:  form.gd_country_id || "",
          gd_region_id: form.gd_region_id || "",
        }));
        fetchRegions( form.gd_country_id);
        localStorage.removeItem("branchId");
      } catch (error) {
        console.log(error, "Error retrieving branch data");
      }
    }
  };

  // const fetchCountries = async () => {
  //   try {
  //     const res = await api.get("/get_country");
  //     const formattedData = formatData(res.data, "get_country");
  //     console.log(formattedData, "get_country");
  //     setCountry(formattedData);

  //     // Call fetchRegions inside the setCountry callback
  //     // if (formattedData.length > 0) {
  //     //   setCountryId(formattedData[0].value);
  //     //   fetchRegions(formattedData[0].value);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchRegions = async (countryId) => {
    try {
      const res = await api.get(`/get_region/${countryId}`);
      const formattedData = formatData(res.data, "gd_region_id");
      setRegion(formattedData);
    } catch (error) {
      // Handle errors
    }
  };

  const handleCountryChange = (e) => {
    const id = parseInt(e.target.value) || '';
    setCountryId(id);
    setFormData((prevForm) => ({
      ...prevForm,
      gd_country_id: id,
    }));
  
    fetchRegions(id);
  };
  

  const handleRegionChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      gd_region_id: parseInt(e.target.value) || '',
    }));
  };

  useEffect(() => {
    fetchBranchData();
    fetchBrands();
    fetchCountries();
    fetchRegions();
    fetchClinets();
    fetchCurrencies();
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
        response = await api.post(
          `/cdbranch_update/${editId}`,updatedFormData);
        setEditId(null);
        toast.success("Branch edited successfully", {
          autoClose:4000,
        });
        navigate("/branches")
      } else {
        // Create request
        response = await api.post("/cdbranch_store", updatedFormData);
        toast.success("Branch created successfully", {
          autoClose: 4000,
        });
        navigate("/branches")
      }
    } catch (error) {
      console.error("Error creating/updating User", error);
    }
  };
//   const [isUpdate, setIsUpdate] = useState(false);
//   const [brands, setBrands] = useState([]);
// const[client,setClient]=useState([])
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     cd_brand_id: "",
//     cd_client_id:"",
//     is_active: true,
//     created_by: "malpos",
//     updated_by: "malpos",
//   });

//   const formatData = (data, idKey) =>
//     data.map((item) => ({ label: item.name, value: item[idKey] }));

//   const fetchBrands = async () => {
//     try {
//       const res = await axiosInstance.get("/cdbrand");
//       const formattedData = formatData(res.data, "cd_brand_id");
//       setBrands(formattedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const fetchClient = async () => {
//     try {
//       const res = await axiosInstance.get("/cdclients");
//       const formattedData = formatData(res.data, "cd_client_id");
//       setClient(formattedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCheckChange = (e) => {
//     setFormData({
//       ...formData,
//       is_active: e.target.checked,
//     });
//   };

//   const handleBrandChange = (e) => {
//     setFormData((prevForm) => ({
//       ...prevForm,
//       cd_brand_id: parseInt(e.target.value),
//     }));
//   };
//   const handleClientChange = (e) => {
//     setFormData((prevForm) => ({
//       ...prevForm,
//       cd_client_id: parseInt(e.target.value),
//     }));
//   };

//   const fetchBranchData = async () => {
//     const branchId = localStorage.getItem("branchId");
//     setEditId(branchId);
//     if (branchId) {
//       setIsUpdate(true);
//       try {
//         const response = await axiosInstance.get(`/cdbranch_edit/${branchId}`);
//         const branchData = response.data[0];
//         setFormData({
//           name: branchData.name,
//           is_active: branchData.is_active,
//           created_by: branchData.created_by,
//           updated_by: branchData.created_by,
//           cd_brand_id: branchData.cd_brand_id,
//         });
//         localStorage.removeItem("branchId");
//       } catch (error) {
//         console.log(error, "Error retrieving branch data");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchBranchData();
//     fetchClient();
//     fetchBrands();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedFormData = {
//         ...formData,
//       };

//       let response;

//       if (isUpdate) {
//         // Update request
//         response = await axiosInstance.post(
//           `/cdbranch_update/${editId}`,
//           updatedFormData
//         );
//         setEditId(null);
//         console.log(updatedFormData);
//         toast.success("Branch edited successfully", {
//           autoClose: 4000,
//         });
//       } else {
//         // Create request
//         response = await axiosInstance.post("/cdbranch_store", updatedFormData);
//         toast.success("Branch created successfully", {
//           autoClose: 4000,
//         });
//       }
//     } catch (error) {
//       console.error("Error creating/updating User", error);
//     }
//   };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Branch</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Col md={12}>
                    <Row>
                      {/* <Col md={6}>
                        <SelectField
                          label="Client"
                          name="cd_client_id"
                          options={client}
                          value={formData.cd_client_id}
                          onChange={handleClientChange}
                        />
                      </Col>
                      <Col md={6}>
                        <SelectField
                          label="Brand"
                          name="cd_brand_id"
                          options={brands}
                          value={formData.cd_brand_id}
                          onChange={handleBrandChange}
                        />
                      </Col>
                      <Col md={12}>
                        <LabelField
                          type="text"
                          placeholder="Name"
                          label="Name"
                          name="name"
                          value={formData?.name}
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
                        <Link to="/branches">
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
                      </Col> */}
                      <Col md={4}>
                        <SelectField
                          required
                          label="Client"
                          name="cd_client_id"
                          //className="wfield"
                          options={client}
                          value={formData.cd_client_id}
                          onChange={handleclientChange}
                        />
                      </Col>
                      <Col md={4}>
                        <SelectField
                          required
                          label="Brand"
                          name="cd_brand_id"
                          //className="wfield"
                          options={brands}
                          value={formData.cd_brand_id}
                          onChange={handleBrandChange}
                        />
                      </Col>
                      
                        <Col md={4}>
                          <SelectField
                            required
                            //className="wfield"
                            label="Select Country"
                            name="gd_country_id"
                            options={Countriesoption}
                            value={formData.gd_country_id}
                            onChange={handleCountryChange}
                          />
                        </Col>
                      <Col md={4}>
                        <LabelField
                          type="text"
                          placeholder="Name"
                          //className="wfield"
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Col>
                        <Col md={4}>
                          {/* {countryId && ( */}
                            <SelectField
                              required
                              label="Select Region"
                              name="gd_region_id"
                              //className="wfield"
                              options={region}
                              value={formData.gd_region_id}
                              onChange={handleRegionChange}
                            />
                          {/* // )} */}
                        </Col>
                        <Col md={4}>
                          <SelectField
                            required
                            label="Select Currency"
                            name="td_currency_id"
                            options={currency}
                            //className="wfield"
                            value={formData.td_currency_id}
                            onChange={(selectedOption) =>
                              handleCurrencyChange(selectedOption)
                            }
                          />
                        </Col>
                      
                      <Col md={4}>
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
                        <Link to="/branches">
                          <button
                            className="cus-btn-bor"
                            style={{
                              backgroundColor: "#0F6973",
                              color: "white",
                              borderColor: "#0F6973",
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
