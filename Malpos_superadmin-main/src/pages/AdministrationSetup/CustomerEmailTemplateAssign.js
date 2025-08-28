import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../apis";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomerEmailTemplateAssign() {
  const [customer, setCustomer] = useState([]);
   const [emailTemplate, setEmailTemplate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CUSTOMER_CODE: [],
    TEMPLATE_ID: "",
     EMAILS: []
  });

  const navigate = useNavigate();
  const companyDB = localStorage.getItem("companyDB");


  // const getCustomer = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/api/SAP_Customer?CompanyDB=${companyDB}`
  //     );
  //     const formattedData = response.data.map((r) => ({
  //       label: `${r.CardCode} - ${r.CardName}`,
  //       value: r.CardCode,
  //     }));
  //     setCustomer(formattedData);
  //   } catch (error) {
  //     console.log("Error fetching roles", error);
  //   }
  // };

  const getCustomer = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/SAP_Customer?CompanyDB=${companyDB}`
    );
    const formattedData = response.data.map((r) => ({
      label: `${r.CardCode} - ${r.CardName}`,
      value: r.CardCode,
      email: r.E_Mail || ""   // <-- include email from SAP
    }));
    setCustomer(formattedData);
    console.log(formattedData)
  } catch (error) {
    console.log("Error fetching roles", error);
  }
};

  const getEmailTemplate = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/email-templates?companyDB=${companyDB}`
      );
      const formattedData = response.data.map((r) => ({
        label: `${r.ID} - ${r.CUSTOMER_NAME}`,
        value: r.ID,
      }));
      setEmailTemplate(formattedData);
    } catch (error) {
      console.log("Error fetching roles", error);
    }
  };

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    getEmailTemplate();
    getCustomer();
  }, []);


  // const handlePermissionChange = (selectedOptions) => {
  //   const values = selectedOptions.map((option) =>
  //     typeof option === "string" ? option : option.value
  //   );
  //   setFormData({ ...formData, CUSTOMER_CODE: values });
  // };


  const handlePermissionChange = (selectedOptions) => {
  // selectedOptions is now an array of strings (values)
  console.log(selectedOptions);

  // Map selected values back to full objects from customer list
  const selectedObjects = customer.filter(c => selectedOptions.includes(c.value));

  const values = selectedObjects.map(c => c.value);
  const emails = selectedObjects.map(c => {
    const email = c.email?.trim();
    return email && email.toUpperCase() !== 'NA' ? email : '';
  });

  setFormData({
    ...formData,
    CUSTOMER_CODE: values,
    EMAILS: emails
  });
};



// const handlePermissionChange = (selectedOptions) => {
//   console.log(selectedOptions)
//   const values = selectedOptions.map((option) =>
//     typeof option === "string" ? option : option.value
//   );

//    const emails = selectedOptions.map(option => {
//     const email = option.email?.trim();
//     // Treat empty string or "NA" as empty
//     return email && email.toUpperCase() !== 'NA' ? email : '';
//   });

//   setFormData({
//     ...formData,
//     CUSTOMER_CODE: values,
//     EMAILS: emails
//   });
// };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const payload = {
    //   customerCode: formData.CUSTOMER_CODE.join(","),
    //   templateId: formData.TEMPLATE_ID,
    // };
// const payload = {
//   customerCode: formData.CUSTOMER_CODE.join(","),   // codes
//   templateId: formData.TEMPLATE_ID,
//   email: formData.EMAILS.join(",")                 // emails
// };
const payload = formData.CUSTOMER_CODE.map((code, idx) => ({
  customerCode: code,
  templateId: formData.TEMPLATE_ID,
  email: formData.EMAILS[idx] || ""
}));


    try {
      
        await axios.post(
          `${BASE_URL}/api/email_template/assign?companyDB=${companyDB}`,
          {
            payload
          }
        );
        toast.success("Email Template Assign successfully");
      

      resetForm();
      navigate("/customer-detail");
    } catch (error) {
      console.error(error);
      toast.error("Error creating/updating permissions");
    } finally {
      setLoading(false);
    }
  };

  // const resetForm = () => {
  //   setFormData({
  //     CUSTOMER_CODE: [],
  //     TEMPLATE_ID: "",
  //   });
  // };
const resetForm = () => {
  setFormData({
    CUSTOMER_CODE: [],
    TEMPLATE_ID: "",
    EMAILS: []
  });
};

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              {/* <h3></h3> */}
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "30px",
                  fontWeight: "400",
                }}
              >
                Email Template Assignment
              </h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Row>
                  <Col md={5}>
                  <MultiSelectField
                      title="Customers"
                      name="CUSTOMER_CODE"
                      // className="mt-4"
                      options={customer}
                      value={customer.filter((option) =>
                        formData.CUSTOMER_CODE.includes(option.value)
                      )}
                      onChange={handlePermissionChange}
                    />

                  </Col>

                  <Col md={5} style={{ marginTop: "18px" }}>
                  <SelectField
                                        label="Select Email Templates"
                                        name="TEMPLATE_ID"
                                        options={emailTemplate}
                                        value={formData.TEMPLATE_ID}
                                        onChange={handleChange}
                                       // disable dropdown in edit
                                      />
                  </Col>

                  <Col md={12}>
                    <button
                      className="premium-btn premium-create"
                      type="submit"
                      disabled={loading}
                      >
                      <FontAwesomeIcon icon={faCirclePlus} />
                      Create
                    </button>

                    <Link to="/customer-detail" className="ms-2">
                      <button
                        className="premium-btn premium-filter "
                        type="button"
                        >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                        Back
                      </button>
                    </Link>
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