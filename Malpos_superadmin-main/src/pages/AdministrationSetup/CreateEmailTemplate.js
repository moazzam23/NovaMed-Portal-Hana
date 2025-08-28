// import React, { useState, useEffect } from "react";
// import { Col, Row } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import PageLayout from "../../layouts/PageLayout";
// import { CardLayout } from "../../components/cards";
// import { LabelField } from "../../components/fields";
// import axios from "axios";
// import { BASE_URL } from "../../apis/NodeApiUrl";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import { Label, Textarea } from "../../components/elements";

// export default function EmailTemplateCreate() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const companyDB = localStorage.getItem("companyDB");

//   const [form, setForm] = useState({

//     customerName: "",
//     emailSubject: "",
//     emailBody: "",
//     emailSignature: "",
//     attachmentName: "",
//   });

//   const [isUpdate, setIsUpdate] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const UpdateBtnText = localStorage.getItem("UpdateEmailTemplateBtn");

//   useEffect(() => {
//     const docId = localStorage.getItem("UpdateEmailTemplateId");
//     setIsUpdate(!!docId);

//     if (docId) {
//       fetchEmailTemplateById(docId);
//     }
//   }, [location.key]);

//   const fetchEmailTemplateById = async (id) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/email-templates/${id}?companyDB=${companyDB}`);
//       const data = res.data;

//       setForm({
//         ...data,
//         customerName: data.CUSTOMER_NAME,
//         emailSubject: data.EMAIL_SUBJECT,
//         emailBody: data.EMAIL_BODY,
//         emailSignature: data.EMAIL_SIGNATURE,
//         attachmentName: data.ATTACHMENT_NAME,
//       });
//     } catch {
//       toast.error("Failed to load email template data");
//     }
//   };

//   const clearForm = () => {
//     localStorage.removeItem("UpdateEmailTemplateId");
//     localStorage.removeItem("UpdateEmailTemplateBtn");
//     setIsUpdate(false);
//     setForm({
//       customerName: "",
//       emailSubject: "",
//       emailBody: "",
//       emailSignature: "",
//       attachmentName: "",
//     });
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     // if (!form.customerName) newErrors.customerName = "Customer Name is required";
//     if (!form.emailSubject) newErrors.emailSubject = "Email Subject is required";
//     if (!form.emailBody) newErrors.emailBody = "Email Body is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const preparePayload = () => ({
//     ...form,
//   });

//   const createTemplate = async () => {
//     if (!validateForm()) return;
//     const payload = preparePayload();

//     try {
//       await axios.post(`${BASE_URL}/api/email-templates?companyDB=${companyDB}`, payload);
//       toast.success("Email template created successfully");
//       navigate("/email-templates");
//       clearForm();
//     } catch (error) {
//       toast.error(error?.response?.data || "Failed to create email template");
//     }
//   };

//   const updateTemplate = async () => {
//     if (!validateForm()) return;
//     const templateId = localStorage.getItem("UpdateEmailTemplateId");
//     const payload = preparePayload();

//     try {
//       await axios.put(`${BASE_URL}/api/email-templates/${templateId}?companyDB=${companyDB}`, payload);
//       toast.success("Email template updated successfully");
//       navigate("/email-templates");
//       clearForm();
//     } catch (error) {
//       toast.error(error?.response?.data || "Failed to update email template");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (isUpdate) {
//       await updateTemplate();
//     } else {
//       await createTemplate();
//     }
//     setLoading(false);
//   };

//   return (
//     <PageLayout>
//       <form onSubmit={handleSubmit}>
//         <Row>
//           <CardLayout>
//             <Col md={12} className="d-flex justify-content-between">
//               <h3 style={{ textAlign: "left", fontSize: "30px", fontWeight: "400" }}> Email Template Form</h3>
//               {/* <button className="premium-btn premium-clear" onClick={clearForm} type="button">
//                 Clear Form
//               </button> */}
//             </Col>
//           </CardLayout>

//           <CardLayout>
//             <Row>
//               <Col md={3}>
//                 <LabelField
//                   label="Customer Name"
//                   type="text"
//                   required={true}
//                   className="form-control"
//                   value={form.customerName}
//                   onChange={(e) => handleInputChange("customerName", e.target.value)}
//                 />
//                 {errors.customerName && <small className="text-danger">{errors.customerName}</small>}
//               </Col>

//               <Col md={6}>
//                 <LabelField
//                   label="Email Subject"
//                   type="text"
//                   required={true}
//                   className="form-control"
//                   value={form.emailSubject}
//                   onChange={(e) => handleInputChange("emailSubject", e.target.value)}
//                 />
//                 {errors.emailSubject && <small className="text-danger">{errors.emailSubject}</small>}
//               </Col>

//               <Col md={12}>
//               <Label style={{fontWeight:"600",color:"black"}}>Email Body</Label>
//                 <Textarea
//                   label="Email Body"
//                   type="textarea"
//                   rows="4"
//                   required={true}
//                   className="form-control"
//                   value={form.emailBody}
//                   onChange={(e) => handleInputChange("emailBody", e.target.value)}
//                 />
//                 {errors.emailBody && <small className="text-danger">{errors.emailBody}</small>}
//               </Col>

//               <Col md={6}>
//                 <LabelField
//                   label="Email Signature"
//                   type="textarea"
//                   rows="2"
//                   className="form-control"
//                   value={form.emailSignature}
//                   onChange={(e) => handleInputChange("emailSignature", e.target.value)}
//                 />
//               </Col>

//               <Col md={6}>
//                 <LabelField
//                   label="Attachment Name"
//                   type="text"
//                   className="form-control"
//                   value={form.attachmentName}
//                   onChange={(e) => handleInputChange("attachmentName", e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Col md={12} className="mt-3">
//               <button type="submit" className="premium-btn premium-create" disabled={loading}>
//                 {loading ? (
//                   isUpdate ? "Updating..." : "Creating..."
//                 ) : (
//                   UpdateBtnText ? (
//                     UpdateBtnText
//                   ) : (
//                     <>
//                       <FontAwesomeIcon icon={faCirclePlus} /> Create Template
//                     </>
//                   )
//                 )}
//               </button>

//               <Link to="/email-templates">
//                 <button type="button" className="premium-btn premium-filter ms-3">
//                   <FontAwesomeIcon icon={faCircleArrowLeft} /> Back
//                 </button>
//               </Link>
//             </Col>
//           </CardLayout>
//         </Row>
//       </form>
//     </PageLayout>
//   );
// }


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
import { faCircleArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Label, Textarea } from "../../components/elements";

export default function EmailTemplateCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const companyDB = localStorage.getItem("companyDB");

  const [form, setForm] = useState({
    customerName: "",
    emailSubject: "",
    emailBody: "",
    emailSignature: "",
    attachmentName: "",
    signatureAttachment: "" // <-- base64 file string
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const UpdateBtnText = localStorage.getItem("UpdateEmailTemplateBtn");

  useEffect(() => {
    const docId = localStorage.getItem("UpdateEmailTemplateId");
    setIsUpdate(!!docId);

    if (docId) {
      fetchEmailTemplateById(docId);
    }
  }, [location.key]);

  const fetchEmailTemplateById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email-templates/${id}?companyDB=${companyDB}`);
      const data = res.data;

      setForm({
        ...form,
        customerName: data.CUSTOMER_NAME,
        emailSubject: data.EMAIL_SUBJECT,
        emailBody: data.EMAIL_BODY,
        emailSignature: data.EMAIL_SIGNATURE,
        attachmentName: data.ATTACHMENT_NAME,
        signatureAttachment: data.SIGNATURE_ATTACHMENT || "" // base64 if available
      });
    } catch {
      toast.error("Failed to load email template data");
    }
  };

  const clearForm = () => {
    localStorage.removeItem("UpdateEmailTemplateId");
    localStorage.removeItem("UpdateEmailTemplateBtn");
    setIsUpdate(false);
    setForm({
      customerName: "",
      emailSubject: "",
      emailBody: "",
      emailSignature: "",
      attachmentName: "",
      signatureAttachment: ""
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.emailSubject) newErrors.emailSubject = "Email Subject is required";
    // if (!form.emailBody) newErrors.emailBody = "Email Body is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Convert uploaded file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, attachmentName: file.name }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          signatureAttachment: reader.result.split(",")[1] // only base64 content
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const preparePayload = () => ({
    ...form
  });

  const createTemplate = async () => {
    if (!validateForm()) return;
    const payload = preparePayload();

    try {
      await axios.post(`${BASE_URL}/api/email-templates?companyDB=${companyDB}`, payload);
      toast.success("Email template created successfully");
      navigate("/email-templates");
      clearForm();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to create email template");
    }
  };

  const updateTemplate = async () => {
    if (!validateForm()) return;
    const templateId = localStorage.getItem("UpdateEmailTemplateId");
    const payload = preparePayload();

    try {
      await axios.put(`${BASE_URL}/api/email-templates/${templateId}?companyDB=${companyDB}`, payload);
      toast.success("Email template updated successfully");
      navigate("/email-templates");
      clearForm();
    } catch (error) {
      toast.error(error?.response?.data || "Failed to update email template");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isUpdate) {
      await updateTemplate();
    } else {
      await createTemplate();
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            <Col md={12} className="d-flex justify-content-between">
              <h3 style={{ textAlign: "left", fontSize: "30px", fontWeight: "400" }}>
                Email Template Group
              </h3>
            </Col>
          </CardLayout>

          <CardLayout>
            <Row>
              <Col md={3}>
                <LabelField
                  label="Template Name"
                  type="text"
                  required={true}
                  className="form-control"
                  value={form.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                />
                {errors.customerName && <small className="text-danger">{errors.customerName}</small>}
              </Col>
</Row>
<Row className="mt-2">              <Col md={12}>
                <LabelField
                  label="Email Subject"
                  type="text"
                  required={true}
                  className="form-control"
                  value={form.emailSubject}
                  onChange={(e) => handleInputChange("emailSubject", e.target.value)}
                />
                {errors.emailSubject && <small className="text-danger">{errors.emailSubject}</small>}
              </Col>

              <Col md={12}>
                <Label style={{ fontWeight: "600", color: "black" }}>Email Body</Label>
                <textarea
                  type="text"
                  rows="4"
                  required={true}
                  name={"emailBody"}
                  className="form-control"
                  value={form.emailBody}
                  onChange={(e) => handleInputChange("emailBody", e.target.value)}
                />
                {errors.emailBody && <small className="text-danger">{errors.emailBody}</small>}
              </Col>

              <Col md={6}>
                <LabelField
                  label="Email Signature"
                  type="textarea"
                  rows="2"
                  className="form-control"
                  value={form.emailSignature}
                  onChange={(e) => handleInputChange("emailSignature", e.target.value)}
                />
              </Col>

              <Col md={6}>
                <LabelField
                  label="Attachment Name"
                  type="text"
                  className="form-control"
                  value={form.attachmentName}
                  onChange={(e) => handleInputChange("attachmentName", e.target.value)}
                />
              </Col>

              <Col md={6}>
                <Label style={{ fontWeight: "600", color: "black" }}>Signature Attachment</Label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {form.signatureAttachment && (
                  <div className="mt-2">
                    <img
                      src={`data:image/png;base64,${form.signatureAttachment}`}
                      alt="Signature Preview"
                      style={{ maxWidth: "150px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create" disabled={loading}>
                  <FontAwesomeIcon icon={faCirclePlus} /> 
                {loading
                  ? isUpdate
                    ? "Updating..."
                    : "Creating..."
                  : UpdateBtnText || (
                      <>
                        Create Template
                      </>
                    )}
              </button>

              <Link to="/email-templates">
                <button type="button" className="premium-btn premium-filter ms-3">
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
