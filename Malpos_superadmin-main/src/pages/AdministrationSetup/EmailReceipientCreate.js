
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import SelectField from "../../components/fields/SelectField";
import MultiSelectField from "../../components/fields/MultiSelectField";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function EmailReceipientCreate() {
  const [form, setForm] = useState({
    id: null,
    documentType: "",
    eventType: "",
    emails: []
  });
 const companyDB = localStorage.getItem("companyDB");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const configId = localStorage.getItem("EmailConfigId");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && configId) {
      fetchConfigById(configId);
    }
  }, [users, configId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users?companyDB=${companyDB}`);
      const formattedUsers = res.data.map(u => ({
        label: `${u.NAME} - ${u.EMAIL}`,
        value: u.EMAIL
      }));
      setUsers(formattedUsers);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const fetchConfigById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email-recipients/${id}?companyDB=${companyDB}`);
      const config = res.data;

      const formattedEmails = (config.EMAILS || []).map(email => {
        const match = users.find(u => u.value === email);
        return match || { label: email, value: email };
      });

      setForm({
        id: config.ID,
        documentType: config.DOCUMENTTYPE,
        eventType: config.EVENTTYPE,
        emails: formattedEmails
      });
    } catch {
      toast.error("Failed to load config");
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleMultiSelect = (selected) => {
    const formatted = selected.map(email => {
      if (typeof email === "string") {
        const match = users.find(u => u.value === email);
        return match || { label: email, value: email };
      }
      return email;
    });

    setForm({ ...form, emails: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      documentType: form.documentType,
      eventType: form.eventType,
      emails: form.emails.map(e => e.value)
    };

    try {
      if (form.id) {
        await axios.put(`${BASE_URL}/api/email-recipients/${form.id}?companyDB=${companyDB}`, payload);
        toast.success("Configuration updated");
      } else {
        await axios.post(`${BASE_URL}/api/email-recipients?companyDB=${companyDB}`, payload);
        toast.success("Configuration created");
      }

      localStorage.removeItem("EmailConfigId");
      navigate("/email-config");
    } catch {
      toast.error("Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    localStorage.removeItem("EmailConfigId");
    setForm({ id: null, documentType: "", eventType: "", emails: [] });
  };

  const handleBack = () => {
    localStorage.removeItem("EmailConfigId");
    navigate("/email-config");
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            {/* <h4>Email Configuration</h4> */}
            <Col md={12} className="d-flex justify-content-between">
                          {/* <h3>User Form</h3> */}
                                                                  <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>  Email Recipient Configuration</h3>
                          <button className="premium-btn premium-clear" onClick={clearForm} type="button">
                            Clear Form
                          </button>
                        </Col>
          </CardLayout>

          <CardLayout>
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <SelectField
                    label="Document Type"
                    value={form.documentType}
                    onChange={(e) => handleChange("documentType", e.target.value)}
                    options={[
                      { label: "Inventory Request", value: "Inventory Request" },
                      { label: "Good Issue", value: "Good Issue" },
                    ]}
                  />
                </Col>
                <Col md={4}>
                  <SelectField
                    label="Event Type"
                    value={form.eventType}
                    onChange={(e) => handleChange("eventType", e.target.value)}
                    options={[
                      { label: "On Create", value: "onCreate" },
                      { label: "On Update", value: "onUpdate" }
                    ]}
                  />
                </Col>
                <Col md={4}>
                  <MultiSelectField
                    title="Select Users to Notify"
                    name="emails"
                    options={users}
                    value={form.emails}
                    onChange={handleMultiSelect}
                  />
                </Col>
              </Row>
            </Col>

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create" disabled={loading}>
                <FontAwesomeIcon icon={faCirclePlus}/>
                {loading
                  ? form.id
                    ? "Updating..."
                    : "Creating..."
                  : form.id
                  ? "Update "
                  : "Create "}
              </button>
             
              <button type="button" className="premium-btn premium-filter ms-2" onClick={handleBack}>
               <FontAwesomeIcon icon={faCircleArrowLeft}/> Back
              </button>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}
