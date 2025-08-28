import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Label, Textarea } from "../../components/elements";
import SelectField from "../../components/fields/SelectField";
import MultiSelectField from "../../components/fields/MultiSelectField";

export default function EmailSendingCreate() {
  const navigate = useNavigate();
  const companyDB = localStorage.getItem("companyDB");

  //   const [form, setForm] = useState({
  //     templateId:"",
  //     To_Emails:[],
  //     From_Emails:"",
  //     CC_Emails:[],
  //     Status:"Pending",
  //     emailSubject: "",
  //     emailBody: "",
  //   });

  const [form, setForm] = useState({
    approvalTemplateId: "", // approvalTemplateId
    fromEmail: "", // sender
    toEmails: [], // array of strings
    ccEmails: [], // array of strings
    // subject: "",
    // body: "",
    subject: "Client Email Approval", 
  body: `Dear Sir,<br/><br/>
Kindly review and approve the following email in order to proceed with sending the related invoices to the client.<br/><br/>
Please click the link below to approve:<br/>
<a href="http://localhost:3000/api/email-approval-pending" target="_blank">Approve Email</a><br/><br/>
Best regards,<br/>
Finance Department`,
  status: "PENDING",
    status: "PENDING",
  });

  const [customer, setCustomer] = useState([]);
  const [fromEmail, setFromEmail] = useState([]);
  const [approvalTemplate, setApprovalTemplate] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/SAP_Customer?CompanyDB=${companyDB}`
      );
      const formattedData = response.data.filter((r) => r.E_Mail && r.E_Mail.trim() !== "" && r.E_Mail.trim() !== "-").map((r) => ({
        label: `${r.CardCode} - ${r.CardName} - ${r.E_Mail}`,
        value: r.E_Mail,
      }));
      setCustomer(formattedData);
    } catch (error) {
      console.log("Error fetching roles", error);
    }
  };

  const getApprovalTemplate = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/email-approval?companyDB=${companyDB}`
      );
      const formattedData = response.data.map((r) => ({
        label: `${r.ID} - ${r.TEMPLATE_NAME}`,
        value: r.ID,
      }));
      setApprovalTemplate(formattedData);
    } catch (error) {
      console.log("Error fetching roles", error);
    }
  };


  useEffect(() => {
    getApprovalTemplate();
    getCustomer();
    fetchFromEmail();
  }, []);


const validateForm = () => {
  const newErrors = {};
  if (!form.subject) newErrors.subject = "Email Subject is required";
  if (!form.body) newErrors.body = "Email Body is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };
  const fetchFromEmail = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/email-setup?companyDB=${companyDB}`
      );
      if (res.data && res.data.length > 0) {
        setFromEmail(res.data); // dropdown options
        // default first email
        setForm((prev) => ({ ...prev, fromEmail: res.data[0].SENDEREMAIL }));
      }
    } catch (err) {
      toast.error("Failed to fetch email configurations");
    }
  };

  const createTemplate = async () => {
    if (!validateForm()) return;
    const payload = {
      fromEmail: form.fromEmail,
      toEmails: form.toEmails.join(","),
      ccEmails: form.ccEmails.join(","),
      subject: form.subject,
      body: form.body,
      approvalTemplateId: form.approvalTemplateId,
    };

    try {
      await axios.post(
        `${BASE_URL}/api/approval?companyDB=${companyDB}`,
        payload
      );
      toast.success("Email template created successfully");
      navigate("/email-approval-view");
      clearForm();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to create email template");
    }
  };

  const handlePermissionChange = (selectedOptions) => {
    const values = selectedOptions.map((option) =>
      typeof option === "string" ? option : option.value
    );
setForm({
      ...form,
      toEmails: values,
    });
    
};

const clearForm = () => {
setForm({
approvalTemplateId: "",
fromEmail: "",
toEmails: [],
ccEmails: [],
subject: "",
body: "",
status: "PENDING",
});
setErrors({});
};
  const handlePermissionccChange = (selectedOptions) => {
    const values = selectedOptions.map((option) =>
      typeof option === "string" ? option : option.value
    );

    setForm({
      ...form,
      ccEmails: values,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createTemplate();
    setLoading(false);
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            <Col md={12} className="d-flex justify-content-between">
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "30px",
                  fontWeight: "400",
                }}
              >
                Email Sending Template
              </h3>
            </Col>
          </CardLayout>

          <CardLayout>
            <Row>
              <Col md={5}>
                <SelectField
                  label="Template Name"
                  name={"approvalTemplateId"}
                  options={approvalTemplate}
                  value={form.approvalTemplateId}
                  onChange={(e) =>
                    handleInputChange("approvalTemplateId", e.target.value)
                  }
                  required
                />
              </Col>
              <Col md={5}>
                <SelectField
                  label="From "
                  options={fromEmail.map((f) => ({
                    label: f.SENDEREMAIL,
                    value: f.SENDEREMAIL,
                  }))}
                  value={form.fromEmail}
                  onChange={(e) =>
                    handleInputChange("fromEmail", e.target.value)
                  }
                  required
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col md={12}>
                <MultiSelectField
                  title="To"
                  name="toEmails"
                  // className="mt-4"
                  options={customer}
                  value={customer.filter((option) =>
                    form.toEmails.includes(option.value)
                  )}
                  onChange={handlePermissionChange}
                />
              </Col>

              <Col md={12}>
                <MultiSelectField
                  title="CC "
                  name="ccEmails"
                  options={customer}
                  value={customer.filter((option) =>
                    form.ccEmails.includes(option.value)
                  )}
                  onChange={handlePermissionccChange}
                />
              </Col>
            </Row>
            <Row className="mt-1">
              {" "}
              <Col md={12}>
                <LabelField
                  label="Subject"
                  type="text"
                //   name={"subject"}
                  required={true}
                  className="form-control"
                  value={form.subject}
                  onChange={(e) =>
                    handleInputChange("subject", e.target.value)
                  }
                />
                {errors.subject && (
                  <small className="text-danger">{errors.subject}</small>
                )}
              </Col>
              <Col md={12}>
                <Label style={{ fontWeight: "600", color: "black" }}>
                  {" "}
                  Body
                </Label>
                <textarea
                  type="text"
                  rows="4"
                  required={true}
                  name={"body"}
                  className="form-control"
                  value={form.body}
                  onChange={(e) =>
                    handleInputChange("body", e.target.value)
                  }
                />
                {errors.body && (
                  <small className="text-danger">{errors.body}</small>
                )}
              </Col>
            </Row>

            <Col md={12} className="mt-3">
              <button
                type="submit"
                className="premium-btn premium-create"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
                {loading ? "Creating..." : "Create Template"}
              </button>

              <Link to="/email-approval-view">
                <button
                  type="button"
                  className="premium-btn premium-filter ms-3"
                >
                  <FontAwesomeIcon icon={faCircleArrowLeft} /> Back
                </button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}
