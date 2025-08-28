import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import { BASE_URL } from "../../apis/NodeApiUrl";
import SelectField from "../../components/fields/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function DocumentSequenceCreate() {
  const navigate = useNavigate();
  const location = useLocation();
   const companyDB = localStorage.getItem("companyDB");
  const [form, setForm] = useState({
    documentType: "",
    prefix: "",
    nextNumber: 1,
    paddingLength: 4,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isUpdate = localStorage.getItem("UpdateSequenceId");
  const UpdateBtnText = localStorage.getItem("UpdateSequenceBtn");

  useEffect(() => {
    if (isUpdate) fetchSequenceById(isUpdate);
  }, [location.key]);

  const fetchSequenceById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/document-sequence/${id}?companyDB=${companyDB}`);
      const data = res.data;
   setForm({
      ...data,
      id:data.ID,
      paddingLength:data.PADDINGLENGTH,
      nextNumber:data.NEXTNUMBER,
      isActive:data.ISACTIVE,
      documentType:data.DOCUMENTTYPE,
      prefix:data.PREFIX
    });
    } catch (err) {
      toast.error("Failed to load document sequence");
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.documentType) newErrors.documentType = "Document Type is required";
    if (!form.prefix) newErrors.prefix = "Prefix is required";
    if (!form.nextNumber) newErrors.nextNumber = "Next Number is required";
    if (!form.paddingLength) newErrors.paddingLength = "Padding Length is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    localStorage.removeItem("UpdateSequenceId");
    localStorage.removeItem("UpdateSequenceBtn");
    setForm({
      documentType: "",
      prefix: "",
      nextNumber: 1,
      paddingLength: 4,
      isActive: true,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (isUpdate) {
        await axios.put(`${BASE_URL}/api/document-sequence/${isUpdate}?companyDB=${companyDB}`, form);
        toast.success("Document sequence updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/document-sequence?companyDB=${companyDB}`, form);
        toast.success("Document sequence created successfully");
      }

      navigate("/doc-seq");
      clearForm();
    } catch (err) {
      toast.error("Error saving document sequence");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            <Col md={12} className="d-flex justify-content-between">
              {/* <h3>{isUpdate ? "Edit" : "Create"} Document Sequence</h3>
              <button className="cus-btn" onClick={clearForm}>
                Clear Form
              </button> */}

              <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}> {isUpdate ? "Edit" : "Create"} Document Sequence</h3>
              <button className="premium-btn premium-clear" onClick={clearForm} type="button">
                Clear Form
              </button>
            </Col>
          </CardLayout>

          <CardLayout>
            <Row>

<Col md={4}>
  <SelectField
    label="Document Type"
    // type="select"
    className="form-select"
    value={form.documentType}
    onChange={(e) => handleInputChange("documentType", e.target.value)}
    options={[
        { label: "Inventory Request", value: "Inventory Request" },
                { label: "Good Issue", value: "Good Issue" }
    ]}
  />
  {errors.documentType && <small className="text-danger">{errors.documentType}</small>}
</Col>

              <Col md={4}>
                <LabelField
                  label="Prefix"
                  type="text"
                  className="form-control"
                  value={form.prefix}
                  onChange={(e) => handleInputChange("prefix", e.target.value)}
                />
                {errors.prefix && <small className="text-danger">{errors.prefix}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="Next Number"
                  type="number"
                  className="form-control"
                  value={form.nextNumber}
                  onChange={(e) => handleInputChange("nextNumber", parseInt(e.target.value))}
                />
                {errors.nextNumber && <small className="text-danger">{errors.nextNumber}</small>}
              </Col>

              <Col md={4}>
                <LabelField
                  label="Padding Length"
                  type="number"
                  className="form-control"
                  value={form.paddingLength}
                  onChange={(e) => handleInputChange("paddingLength", parseInt(e.target.value))}
                />
                {errors.paddingLength && <small className="text-danger">{errors.paddingLength}</small>}
              </Col>

              {/* <Col md={4} className="d-flex align-items-center">
                <label className="me-2">Active</label>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => handleInputChange("isActive", e.target.checked)}
                />
              </Col> */}
            </Row>

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create" disabled={loading}>
                <FontAwesomeIcon icon={faCirclePlus}/>
                {loading
                  ? isUpdate
                    ? "Updating..."
                    : "Creating..."
                  : isUpdate
                  ? "Update Sequence"
                  : "Create Sequence"}
              </button>
              <Link to="/doc-seq">
                <button className="premium-btn premium-filter ms-2"> <FontAwesomeIcon icon={faCircleArrowLeft}/> Back</button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}