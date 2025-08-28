import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import SelectField from "../../components/fields/SelectField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCirclePlus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailApprovalTemplateCreate() {
  const navigate = useNavigate();
  const companyDB = localStorage.getItem("companyDB");

  const [roles, setRoles] = useState([]);
  const [docId, setDocId] = useState("");
  const [actionType, setActionType] = useState("ACTIVE");
  const [creators, setCreators] = useState([]);

  const documentTypes = [{ label: "Customer Email Approval", value: " Customer Email Approval" }];

  const actionTypes = [{ label: "ACTIVE", value: "ACTIVE" }];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Users?companyDB=${companyDB}`
      );
      const formattedRoles = Array.isArray(res.data)
        ? res.data.map((role) => ({
            label: role.NAME,
            value: role.ID,
          }))
        : [];
      console.log("Fetched user:", formattedRoles);
      setRoles(formattedRoles);
    } catch (error) {
      console.error("User fetch error:", error);
      toast.error("Failed to load user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docId) {
      toast.error("Please select a Document Type");
      return;
    }


    try {
      const templatePayload = { status:actionType, templateName:docId, userId: creators };
      const templateRes = await axios.post(
        `${BASE_URL}/api/email-approval?companyDB=${companyDB}`,
        templatePayload
      );


      toast.success("Approval template  created successfully");
      navigate("/viewworkflows");
      setDocId("");
      setActionType("");
      setCreators([]);
      //   setSteps([]);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create workflow template and steps");
    }
  };

  console.log(creators);

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
       
            <Col md={12} style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "30px",
                }}
              >
                Email Approval Template
              </h2>
            </Col>
       
            <Row>
              <Col md={12}>
                <div className="main-doc">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Email Approval Stage
                </div>
              </Col>

              <Col md={4}>
                <SelectField
                  label="Document Type"
                  className="form-control"
                  options={documentTypes}
                  value={docId} 
                  onChange={(e) => setDocId(e.target.value)} 
                />
              </Col>

              <Col md={4}>
                <MultiSelectField
                  style={{ marginTop: "-15px" }}
                  options={roles}
                  title="Approver(s)"
                  value={roles.filter((role) => creators.includes(role.value))} 
                  onChange={(selectedIds) => {
                    setCreators(selectedIds);
                                  }}
                  className="form-control "
                  placeholder="Select creator roles"
                />
              </Col>
              <Col md={4}>
                <SelectField
                  label="Status"
                  className="form-control"
                  options={actionTypes}
                  value={actionType}
                  onChange={(e) => setDocId(e.target.value)}
                />
              </Col>
            </Row>
            <hr style={{ height: "3px", marginTop: "30px" }} />
           

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create">
                <FontAwesomeIcon icon={faCirclePlus} /> Create Template
              </button>

              <Link to="/viewWorkflows" className="ms-2">
                <button
                  style={{
                    color: "white",
                  }}
                  className="premium-btn premium-filter"
                >
                  <FontAwesomeIcon icon={faCircleArrowLeft} />
                  Back
                </button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}
