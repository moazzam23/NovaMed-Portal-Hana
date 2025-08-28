import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faCheckCircle,
  faCancel,
  faSquareArrowUpRight,
  faEye,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table,Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import axiosInstance from "../../apis";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { sapLogin } from "../../apis/SapLogin";
import { AuthContext } from "../../context/Auth";
import { DrawerContext } from "../../context/Drawer";

export default function PendingApprovals() {
  const companyDB = localStorage.getItem("companyDB");
    const navigate = useNavigate();
  const userRole = localStorage.getItem("userId"); // Store this when user logs in
  const [pendingItems, setPendingItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
     const { drawer } = useContext(DrawerContext);
  const [selectedItem, setSelectedItem] = useState(null);
    const [showPayloadModal, setShowPayloadModal] = useState(false);
  const [payloadData, setPayloadData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCommentModal, setShowCommentModal] = useState(false);
const [pendingAction, setPendingAction] = useState(null); // { docId, action }
const [commentText, setCommentText] = useState('');
const {user} = useContext(AuthContext)
  const [items,Setitems]=useState(null)
    const [perPage] = useState(10);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      console.log(userRole)
      const res = await axios.get(
        `${BASE_URL}/users/${userRole}/pending-approvals?CompanyDB=${companyDB}`
      );
      console.log(res)
      setPendingItems(res.data.pendingApprovals);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending approvals");
    }
  };

 const openPayloadModal = (payloadString,item) => {
    try {
      const parsed = JSON.parse(payloadString);
       Setitems(item)
      setPayloadData(parsed);
      setShowPayloadModal(true);
    } catch (err) {
      toast.error("Invalid payload format");
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("EditAPPDocId", id);
  };

  const handleAction = async (approvalId, action) => {
    if (action === 'rejected' || action === 'cancelled') {
      setPendingAction({ approvalId, action });
      setShowCommentModal(true); // show modal to enter comment
      return;
    }
  
    // Directly approve without comment
    await submitApproval(approvalId, action, '');
  };

  
  const submitApproval = async (approvalId, action, comments) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/documents/${approvalId}/approve?CompanyDB=${companyDB}`,
        {
          userId: userRole,
          approvalStatus: action,
          comments: comments
        }
      );
  
      // if (res.data?.Approved === true && res.data?.payload) {
      //   await postInventoryRequest(res.data.payload,res.data?.docId);
      // //  if (DOC_TYPE_ID === "goosd_issue" || DOC_TYPE_ID === "GOOD_ISSUE") {
      // //   await postGoodIssue(payload, docId);
      // // } else if (DOC_TYPE_ID === "inventory_request" || DOC_TYPE_ID === "INVENTORY_REQUEST") {
      // //   await postInventoryRequest(payload, docId);
      // // }
      // }
  
        if (res.data?.Approved === true && res.data?.payload) {
      const { docTypeId, payload, docId } = res.data;

      if (docTypeId?.toUpperCase() === "INVENTORY_REQUEST") {
        await postInventoryRequest(payload, docId);
      } 
      else if (docTypeId?.toUpperCase() === "GOOD_ISSUE") {
        await postGoodIssue(payload, docId); // new wrapper fn for good issue
      }
    }

      toast.success(`Step ${action}d successfully`);
      fetchPendingApprovals();
      setCommentText('');
    } catch (err) {
      toast.error("Failed to update step");
    }
  };
  

  const postInventoryRequest = async (payload,docId) => {
    // e.preventDefault();
    var res="";
  
    try {
      const sessionid=await sapLogin(user)
       res = await axiosInstance.post("/InventoryTransferRequests", payload);
             
       
       const sapDocNum = res.data?.DocNum || res.data?.DocEntry;
       
       await axios.put(`${BASE_URL}/api/documents/update-sap-status?CompanyDB=${companyDB}`, {
         docId: docId,
         sapDocNum,
         isPostedToSAP: true
        });
        toast.success("Inventory Transfer Request Created Successfully");
      navigate("/inventory_request");
      // navigate("/sales-orders");
    } catch (error) {
      console.error("Submit error:", error);
       await axios.put(`${BASE_URL}/api/documents/update-sap-status?CompanyDB=${companyDB}`, {
      docId: docId,
      sapDocNum: null,
      isPostedToSAP: false
    });
      if(error?.response?.data?.error){
      const backendError = error?.response?.data?.error?.message?.value;
      const fallbackMessage = error.message;
    
      toast.error("Request failed: " + (backendError || fallbackMessage));
      }
    }
  };

  
  const postGoodIssue = async (payload, docId) => {
  try {
    const sessionid = await sapLogin(user);

    // Construct SAP payload
    const sapPayload = {
      Reference2: payload?.Reference2 || docId,
      U_Portal_Doc: payload?.U_Portal_Doc || docId,
      DocumentLines: payload?.StockTransferLines || []
    };

    const res = await axiosInstance.post("/InventoryGenExits", sapPayload);

    const sapDocNum = res.data?.DocNum || res.data?.DocEntry;

    // Update local doc status
    await axios.put(`${BASE_URL}/api/documents/update-sap-Issue-status?CompanyDB=${companyDB}`, {
      docId: docId,
      sapDocNum,
      isPostedToSAP: true
    });

    toast.success("Good Issue posted successfully");
  } catch (error) {
    console.error("Good Issue error:", error);
    await axios.put(`${BASE_URL}/api/documents/update-sap-Issue-status?CompanyDB=${companyDB}`, {
      docId: docId,
      sapDocNum: null,
      isPostedToSAP: false
    });
    const backendError = error?.response?.data?.error?.message?.value;
    toast.error("Good Issue failed: " + (backendError || error.message));
  }
};



  const openDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
<div>
  {/* Inside your return block (the outer <div> is kept unchanged) */}
<div>
  {/* <PageLayout> */}
        <CardLayout>
    <Row>
      <Col md={12}>
        <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Pending Approval Documents</h3>
        {/* </CardLayout> */}
      </Col>
      <Col md={12}>
        {/* <CardLayout> */}
  <Row className="g-1 mb-3 align-items-end filter-card" style={{backgroundColor:"#18596"}} >
     
            <Col md={9} className={"mt0-col-2"}>
              <Box className={"users-btn-flex"}>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <CustomSearch
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #ced4da",
                      width: "100%",
                    }}
                  />
                </Col>
              </Box>
            </Col>
          </Row>
          <Col md={12}>
            {/* <Box className={"client-table"}>
              <Table className="mc-table" responsive bordered hover style={{ fontSize: "0.9rem" }}>
                <thead className="mc-table-head primary text-center"> */}
                <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

            <div className="premium-table-container ">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                  <tr >
                    <th>#</th>
                    <th>Document No</th>
                    <th>Document Type</th>
                    <th>Date</th>
                    <th>Action Required</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center tbody">
                  {pendingItems.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No pending approvals
                      </td>
                    </tr>
                  ) : (
                    pendingItems.map((item, index) => (
                      <tr key={item.approvalId}>
                        <td>{index + 1}</td>
                        <td>{item.DOC_NUMBER}</td>
                        <td>{item.DOC_TYPE_ID.toUpperCase()}</td>
                        <td>{item.DOC_DATE}</td>
                        {/* <td
                          style={{
                            backgroundColor:
                              item.STATUS.toLowerCase() === "pending"
                                ? "#fff3cd"
                                : item.STATUS.toLowerCase() === "in-progress"
                                ? "#cce5ff"
                                : item.STATUS.toLowerCase() === "approved"
                                ? "#d4edda"
                                : "#f8f9fa",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "#000",
                            borderRadius: "5px",
                            padding: "6px 8px",
                            fontSize: "12px",
                          }}
                        >
                          {item.STATUS.toUpperCase()}
                        </td> */}
                        <td>
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.STATUS.toLowerCase() === "pending"
                                ? "#ffc107"
                                : item.STATUS.toLowerCase() === "in_progress"
                                ? "#17a2b8"
                                : item.STATUS.toLowerCase() === "approved"
                                ? "#28a745"
                                : "#6c757d",
                            padding: "6px 10px",
                            color: "#fff",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.STATUS}
                        </span>
                      </td>
                        <td>
                          <Button
                          className={"premium-btn premium-create"}
                            variant="info"
                            size="sm"
                            style={{ fontSize: "12px", fontWeight: "600" }}
                            onClick={() => openPayloadModal(item.PAYLOAD,item)}
                          >
                            View Payload <FontAwesomeIcon icon={faSquareArrowUpRight} />
                          </Button>
                        </td>
                        <td className="text-nowrap">
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleAction(item.DOC_ID, "approved")}
                          >
                            <span
                              style={{
                                backgroundColor: "#18596a",
                                color: "white",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} /> Approve
                            </span>
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={() => handleAction(item.DOC_ID, "rejected")}
                          >
                            <span
                              style={{
                                backgroundColor: "#d14249",
                                color: "white",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              <FontAwesomeIcon icon={faCancel} /> Reject
                            </span>
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={() => handleAction(item.DOC_ID, "cancelled")}
                          >
                            <span
                              style={{
                                backgroundColor: "#18596a",
                                color: "white",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              <FontAwesomeIcon icon={faCancel} /> Cancel
                            </span>
                          </Button>
                          <Link to="/inventory" onClick={() => handleEdit(item?.DOC_ID)}>
                            <span
                              style={{
                                backgroundColor: "#f29b30",
                                color: "white",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              {/* </Table> */}
              </table></div></div></div>
              <Pagination
                perPage={perPage}
                totalUsers={pendingItems.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            {/* </Box> */}
          </Col>
      </Col>
    </Row>
        </CardLayout>
  {/* </PageLayout> */}

  {/* Payload Modal */}
  {/* {showPayloadModal && payloadData && (
    <div className="modal-backdrop show" style={{ opacity: "1" }}>
      <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ width: "850px", backgroundColor: "white" }}>
            <div className="modal-header">
              <h5 className="modal-title">Document Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowPayloadModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <Row className="mb-3">
                <Col md={6}><strong>Type:</strong> {payloadData.U_Type}</Col>
                <Col md={6}><strong>AdjType:</strong> {payloadData.U_AdjType}</Col>
              </Row>
              <h6 className="mb-3">Stock Transfer Lines</h6>
              <Table striped bordered hover responsive style={{ fontSize: "12px" }}>
                <thead className="text-center">
                  <tr>
                    {payloadData.StockTransferLines &&
                      Object.keys(payloadData.StockTransferLines[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {payloadData.StockTransferLines &&
                    payloadData.StockTransferLines.map((line, idx) => (
                      <tr key={idx}>
                        {Object.values(line).map((val, i) => (
                          <td key={i}>{val || "-"}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )} */}

{/* {showPayloadModal && payloadData && (
  <div className="modal-backdrop show" style={{ opacity: "1" }}>
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div
        className="modal-dialog"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
        }}
      >
        <div
          className="modal-content"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Document Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPayloadModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <Row className="mb-3">
              <Col md={6}><strong>Type:</strong> {payloadData.U_Type}</Col>
              <Col md={6}><strong>AdjType:</strong> {payloadData.U_AdjType}</Col>
            </Row>
            <h6 className="mb-3">Stock Transfer Lines</h6>
            <div style={{ overflowX: "auto" }}>
              <Table striped bordered hover responsive style={{ fontSize: "12px" }}>
                <thead className="text-center">
                  <tr>
                    {payloadData.StockTransferLines &&
                      Object.keys(payloadData.StockTransferLines[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {payloadData.StockTransferLines &&
                    payloadData.StockTransferLines.map((line, idx) => (
                      <tr key={idx}>
                        {Object.values(line).map((val, i) => (
                          <td key={i}>{val || "-"}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)} */}

{showPayloadModal && payloadData && (
  <div
      style={{
        position: "fixed",
        top: 82 ,
        left: drawer ? 270 : 0, // no gap when sidebar closed
    width: drawer ? "84%": 0 ,
        height: "90%",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
          transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          height: "100%",
          borderRadius:"15px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
      <div
        className="modal-dialog"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
        }}
      >
        <div
          className="modal-content"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          <div className="modal-header">
              <Col md={12} className="main-doc" >
               <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1px",
            }}
          >
            
        <div className=" " style={{fontSize:"20px"}}> <FontAwesomeIcon icon={faEye} className="ms-3 me-2"/>
        {items.DOC_TYPE_ID?.trim().toLowerCase() === "Inventory Request"
    ? "Inventory Request "
    : "Good Issue "}
         Document Detail
          </div>
          <button
  onClick={() => setShowPayloadModal(false)}
  style={{
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "#fff",
    border: "none",
    padding: "18px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  }}
>
  ✖ Close
</button>
  </div>
              </Col>
         
            {/* <h5 className="modal-title">Document Details</h5> */}
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPayloadModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <Row className="mb-3">
          <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"20px"}}>

  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Portal Document No:
    </label>
    <input
      type="text"
      value={items.DOC_NUMBER || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

  {/* Status Badge */}
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      SAP Document No:
    </label>
   <input
      type="text"
      value={items.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? items.SAP_INV_QRE_DOC_NUM
    : items.SAP_DOC_ISSUE_DOC_NUM || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

</div>

     
          <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"0px",paddingBottom:"0px" }}>

  {/* User Field */}
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "43px" }}>
      Document Type:
    </label>
    <input
      type="text"
      value={items.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? "Inventory Request"
    : "Good Issue" || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "78px" }}>
      Doc Date:
    </label>
    <input
      type="text"
      value={new Date(items.DOC_DATE).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  </div>

   <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"0px",paddingBottom:"20px" }}>
  {/* Status Badge */}
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "105px" }}>
      Status:
    </label>
    {/* <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "12px",
        background: pendingItems.STATUS === "Closed" ? "#f8d7da" : "#d4edda",
        color: pendingItems.STATUS === "Closed" ? "#721c24" : "#155724",
        fontWeight: "bold",
        fontSize: "0.9rem",
      }}
    >
      {pendingItems.STATUS || "-"}
    </span> */}
     <span
              className={`badge text-uppercase ${
                items.STATUS === 'approved'
                  ? 'bg-success'
                  : items.STATUS === 'rejected'
                  ? 'bg-danger'
                  : items.STATUS === 'pending'
                  ? 'bg-warning text-dark'
                  : 'bg-secondary'
              }`}
            >
              {items.STATUS}
            </span>
  </div>

</div>
  {/* Status Badge */}
 

{/* </div> */}
              {/* <Col md={6}><strong>Type:</strong> {payloadData.U_Type}</Col>
              <Col md={6}><strong>AdjType:</strong> {payloadData.U_AdjType}</Col> */}
            </Row>
            {/* <h6 className="mb-3">Stock Transfer Lines</h6> */}
            <div className="main-doc mb-3"> <FontAwesomeIcon icon={faBookOpenReader} className="ms-3 me-2"/> Stock Detail </div>
            
            {/* <div style={{ overflowX: "auto" }}>
              <Table striped bordered hover responsive style={{ fontSize: "12px" }}>
                <thead className="text-center"> */}
            <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                  <tr>
                    {payloadData.StockTransferLines &&
                      Object.keys(payloadData.StockTransferLines[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {payloadData.StockTransferLines &&
                    payloadData.StockTransferLines.map((line, idx) => (
                      <tr key={idx}>
                        {Object.values(line).map((val, i) => (
                          <td key={i}>{val || "-"}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              {/* </Table> */}
              </table></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


  {/* Raw Payload Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Document Payload</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedItem?.payload ? (
        <pre>{JSON.stringify(selectedItem.payload, null, 2)}</pre>
      ) : (
        <p>No payload available</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

  {/* Comment Modal */}
  <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Provide Reason</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <textarea
        className="form-control"
        rows={4}
        placeholder="Enter your reason here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
        Cancel
      </Button>
      <Button
        style={{ backgroundColor: "red", color: "white", padding: "10px" }}
        onClick={() => {
          if (!commentText.trim()) {
            toast.error("Comments are required for this action");
            return;
          }
          submitApproval(pendingAction.approvalId, pendingAction.action, commentText);
          setShowCommentModal(false);
        }}
      >
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
</div>
</div>
  );
}
