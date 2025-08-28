import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faFilterCircleXmark,
  faEye,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table,Modal, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";

export default function ViewAllDocumentsAdmin() {
  const companyDB = localStorage.getItem("companyDB");
  const userRole = localStorage.getItem("userId"); // Store this when user logs in
  const [pendingItems, setPendingItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPayloadModal, setShowPayloadModal] = useState(false);
const [payloadData, setPayloadData] = useState(null);
const [statusFilter, setStatusFilter] = useState('');
const [creators, setCreators] = useState([]);
const [creatorFilter, setCreatorFilter] = useState('');


  const [steps,SetSteps]=useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [items,Setitems]=useState(null)

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/documents/all-documents?CompanyDB=${companyDB}`
      );
      console.log(res)
      const uniqueCreators = Array.from(new Set(res.data.documents.map(doc => doc.CREATORNAME)));
      setCreators(uniqueCreators);
      setPendingItems(res.data.documents);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Steps");
    }
  };
  // const filteredItems = pendingItems.filter(item =>
  //   (!statusFilter || item.STATUS.toLowerCase() === statusFilter.toLowerCase()) &&
  //   (!creatorFilter || item.CREATORNAME === creatorFilter) &&
  //   (!searchTerm || item.DOC_NUMBER.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  const filteredItems = pendingItems
  // Search filter on DocNum or Portal Document No
  .filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
(!statusFilter || item.STATUS.toLowerCase() === statusFilter.toLowerCase()) &&
    (!creatorFilter || item.CREATORNAME === creatorFilter) &&
    (!searchTerm || item.DOC_NUMBER.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  })
  // CreatedBy filter
  // .filter((item) =>
  //   createdByFilter ? item.CreatedBy?.toUpperCase() === createdByFilter : true
  // )
  // Date range filter
  .filter((item) => {
    const docDate = new Date(item.DOC_DATE);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    // If both start and end dates are selected
    if (from && to) {
      return docDate >= from && docDate <= to;
    }
    // If only start date is selected
    if (from) {
      return docDate >= from;
    }
    // If only end date is selected
    if (to) {
      return docDate <= to;
    }
    return true;
  });

  const paginatedItems = filteredItems.slice((currentPage - 1) * perPage, currentPage * perPage);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


  const FetchDocumentSTEPS = async (DocId) => {
    try {
      console.log(userRole)
      const res = await axios.get(
        `http://localhost:5000/documents/${DocId}/workflow?CompanyDB=${companyDB}`
      );
      console.log(res)
      SetSteps(res.data.steps);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending approvals");
    }
  };


  const openDetails = (docid) => {
    FetchDocumentSTEPS(docid);
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

const resetFilters = () => {
  setSearchTerm("");
  setStartDate("");
  setEndDate("");
setCreatorFilter("")
  setCurrentPage(1);
};
  

  return (
      <div>
          <PageLayout>
                <CardLayout>
            <Row>
              <Col md={12}>
                    <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Approval Report Documents</h3>
      
                  {/* <h3> All Documents</h3> */}
                {/* </CardLayout> */}
              </Col>
              <Col md={12}>
                {/* <CardLayout> */}
              <Row className="g-1 mb-3 align-items-end filter-card" style={{backgroundColor:"#18596"}} >
                      <Col md={12} className={"mt0-col-2"}>
                      <Box
                       className={"users-btn-flex"}>
                        
                        <Col xs={12} sm={12} md={2} lg={3}>
                              <label className="form-label2 fw-semibold">Search</label>
                          <CustomSearch
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </Col>
                        <Col xs={12} sm={6} md={2} style={{marginLeft:"10px"}} >
                              <label className="form-label2 fw-semibold">Status</label>
    <Form.Select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">All Statuses</option>
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
      <option value="cancelled">Cancelled</option>
    </Form.Select>
  </Col>
  <Col xs={12} sm={6} md={2} style={{marginLeft:"10px"}}>
        <label className="form-label2 fw-semibold">Creator</label>
  <Form.Select
    value={creatorFilter}
    onChange={(e) => setCreatorFilter(e.target.value)}
  >
    <option value="">All Creators</option>
    {creators.map((creator, index) => (
      <option key={index} value={creator}>
        {creator}
      </option>
    ))}
  </Form.Select>
</Col>
<Col md={2} className="ms-2" >
      <label className="form-label2 fw-semibold">From Date</label>
      <input
        type="date"
        className="form-control"
        style={{border:"1px solid grey"}}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </Col>
    <Col md={2} className="ms-2">
      <label className="form-label2 fw-semibold">To Date</label>
      <input
        type="date"
        className="form-control"
                style={{border:"1px solid grey"}}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </Col>
    <Col md={12} className="text-end mt-2" >
      <button
        className=" premium-btn premium-filter  w-40"
        onClick={resetFilters}
      >
        <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
      </button>
    </Col>

                      </Box>
                    </Col>
                  </Row>
                  <Col md={12}>
                    {/* <Box className={"client-table"}>
                      <Table className="mc-table" responsive>
                        <thead style={{textAlign:"center"}} className="  mc-table-head primary"> */}
                         <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                          <tr className="text-center" >
                          <th>#</th>
          <th>Document No</th>
            <th>SAP Doc Number</th>
             <th>Document Type</th>
             <th>Date</th>
             <th>Creator</th>
           <th className="text-center" >Status </th>
             {/* <th>Approval Status</th> */}
             <th>Documents Information</th>
         
        
             {/* <th>Action</th> */} 
                          </tr>
                        </thead>
                        <tbody className=" tbody">
                        {paginatedItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No pending approvals
              </td>
            </tr>
          ) : (
            paginatedItems
            .map((item, index) => (
              <tr key={item.approvalId}>
                <td>{index + 1}</td>
                <td>{item.DOC_NUMBER}</td>
                 <td className="text-center">
  {item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? item.SAP_INV_QRE_DOC_NUM
    : item.SAP_DOC_ISSUE_DOC_NUM}
</td>
                <td>{item.DOC_TYPE_ID}</td>
                <td>{item.DOC_DATE}</td>
                <td>{item.CREATORNAME}</td>
                {/* <td>{item.STATUS}</td> */}
                 <td><span  style={{
    backgroundColor:
      item.STATUS.toLowerCase() === "pending"
        ? "#a27c00ff" // Yellow
        : item.STATUS.toLowerCase() === "in_progress"
        ? "#007bff" // Blue
        : item.STATUS.toLowerCase() === "approved"
        ? "#18596a" // Green
        : "#ff416c", // Default
    
    textTransform: "uppercase",
    textAlign:"center",
    color: "#ffff",
    fontWeight:"600", // Text color for contrast
    borderRadius: "5px",
    padding: "4px 5px"
  }} >
  {item.STATUS.toUpperCase()}
  </span> </td>

                 {/* <td>
                  <Button

                    variant="info"
                    size="sm"
                    onClick={() => openDetails(item.DOC_ID)}
                  >
                    View Approvals
                  </Button>
                </td> */}
                <td>
                <Button
                className={"premium-btn premium-create"}
  variant="info"
  size="sm"
  onClick={() => openPayloadModal(item.PAYLOAD,item)}
><FontAwesomeIcon icon={faEye} />
  View  
</Button>

                </td>
               
              </tr>
            ))
          )}
                        </tbody>
                        </table></div></div></div>
                      {/* </Table> */}
                       <Pagination
                       perPage={perPage}
                       totalUsers={filteredItems.length} // instead of pendingItems.length
                       paginate={paginate}
                       currentPage={currentPage}
                     />
                    {/* </Box> */}
                  </Col>
              </Col>
            </Row>
                </CardLayout>
          </PageLayout>
          {showModal && (
         <div className="modal-backdrop show" style={{ opacity: "1" }}>
         <div
           className="modal d-block"
           tabIndex="-1"
           style={{ background: "rgba(255, 255, 255, 0.25)" }}
         >
           <div className="modal-dialog modal-lg">
             <div
               className="modal-content"
               style={{ width: "596px", backgroundColor: "white" }}
             >
               <div className="modal-header" >
                 <h5 className="modal-title">Approval Steps</h5>
               
                 <button
                   type="button"
                   className="btn-close"
                   onClick={() => setShowModal(false)}
                 ></button>
               </div>
               <div className="modal-body"style={{marginTop:"-30px"}} >
        <Table striped bordered hover responsive>
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Status</th>
              <th>Approver</th>
              <th>Approved At</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {steps.length === 0 ? (
              <tr>
                <td colSpan="5">No steps found.</td>
              </tr>
            ) : (
              steps.map((step, index) => (
                <tr key={step.stepId}>
                  <td>{index + 1}</td>
                  <td>{step.role}</td>
                  <td>{step.status}</td>
                  <td>{step.approverUserId || "-"}</td>
                  <td>
                    {step.timestamp
                      ? new Date(step.timestamp).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        </div>
        </div></div></div>
        </div>
        )}        


{/* {showPayloadModal && payloadData && (
  <div className="modal-backdrop show" style={{ opacity: "1" }}>
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(255, 255, 255, 0.25)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ width:"850px", backgroundColor: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title">Document Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPayloadModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <Row>
              <Col md={6}><strong>Type:</strong> {payloadData.U_Type}</Col>
              <Col md={6}><strong>AdjType:</strong> {payloadData.U_AdjType}</Col>
            </Row>
            <hr />
            <h6 className="mb-3 mt-4" >Stock Transfer Lines</h6>
            <Table striped bordered hover responsive>
              <thead style={{fontSize:"12px"}} className="text-center">
                <tr>
                  {payloadData.StockTransferLines && 
                    Object.keys(payloadData.StockTransferLines[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody style={{fontSize:"12px"}} className="text-center">
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
        left:  270 , // no gap when sidebar closed
    width:  "84%",
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
        {payloadData.U_Type?.trim().toLowerCase() === "General_Issuance"
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

          </div>
  );
}
