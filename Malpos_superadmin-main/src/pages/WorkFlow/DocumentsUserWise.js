import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faWarehouse,
  faBalanceScale,
  faBarsProgress,
  faPlusCircle,
  faFilterCircleXmark,
  faEye,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table,Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import { DrawerContext } from "../../context/Drawer";

export default function DocumentUserWise() {
  const companyDB = localStorage.getItem("companyDB");
  const userRole = localStorage.getItem("userId"); // Store this when user logs in
  const [pendingItems, setPendingItems] = useState([]);
    const { drawer } = useContext(DrawerContext);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPayloadModal, setShowPayloadModal] = useState(false);
const [payloadData, setPayloadData] = useState(null);
const [statusFilter, setStatusFilter] = useState('');

  const [items,Setitems]=useState(null)
  const [steps,SetSteps]=useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(15);
  
  const filteredItems = pendingItems.filter(item =>
    (!statusFilter || item.STATUS.toLowerCase() === statusFilter.toLowerCase()) &&
    (!searchTerm || item.DOC_NUMBER.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  
  const [userMap, setUserMap] = useState({});

const fetchUserName = async (id) => {
  try {
    if (!id || userMap[id]) return; // skip if no id or already fetched

    const res = await axios.get(
      `http://localhost:5000/api/Users/${id}?companyDB=${companyDB}`
    );

    setUserMap(prev => ({
      ...prev,
      [id]: res.data.NAME
    }));
  } catch (error) {
    console.error("User fetch error:", error);
    toast.error("Failed to load user");
  }
};

  
  const paginatedItems = filteredItems.slice((currentPage - 1) * perPage, currentPage * perPage);
  
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
        `http://localhost:5000/users/${userRole}/all-documents?CompanyDB=${companyDB}`
      );
      console.log(res)
      setPendingItems(res.data.documents);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Steps");
    }
  };

  const FetchDocumentSTEPS = async (DocId) => {
    try {
      console.log(userRole)
      const res = await axios.get(
        `http://localhost:5000/documents/${DocId}/workflow?CompanyDB=${companyDB}`
      );
      console.log("STEPS",res)
      if(res.data.document.WORKFLOW_ID == null){
        toast.error("No WorkFlow is Active for this Document");
      return;}
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
  
  console.log("steps",steps)

  // const handleEdit = (id) => {
  //   localStorage.setItem("EditDocId", id);
  // };

  const handleEdit = (item) => {
  const isSapDocMissing = item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? !item.SAP_INV_QRE_DOC_NUM
    : !item.SAP_DOC_ISSUE_DOC_NUM;

  if (isSapDocMissing) {
    // Store DOC_NUMBER when SAP doc missing
    localStorage.setItem("EditDocId", item.DOC_NUMBER);
  } else {
    // Store DOC_ID normally
    localStorage.setItem("EditDocId", item.DOC_ID);
  }
};

  return (
      <div>
          {/* <PageLayout> */}
                <CardLayout>
            <Row>
              <Col md={12}>
               <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
              
                          <h3 style={{fontFamily:"cursive",textAlign:"left",fontSize:"30px",fontWeight:"900"}}>Portal Documents</h3>
                    </div>
           
 <Row className="align-items-center mb-1">
              <Col md={12} sm={6} className="mb-2">
              
                <Row className="g-1 mb-1 align-items-end filter-card">
   <Col xs={12} sm={6} md={4}>
  
    <CustomSearch
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by Document No"
    />
  </Col>
  <Col xs={12} sm={6} md={3}>
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
  {/* <Col xs={12} sm={6} md={3} style={{paddingLeft:"32%" }} >
  <Link to="/inventory">
                      <button className="custom3-btn" >
                        
                        <FontAwesomeIcon icon={faPlusCircle} /> 
                         Create
                      </button>
                    </Link>
  </Col> */}
    <Col md={3}></Col>
<Col md={2}>
  <button
    className=" premium-btn premium-filter  w-40"
    // onClick={resetFilters}
    >
    <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
  </button>
</Col>

  </Row>
              </Col>
              </Row>

                  <Col md={12}>
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
           <th className="text-center" >Status </th>
             <th  >Approval Status</th>
             <th>Document Details</th>
             <th>Action</th>
        
             {/* <th>Action</th> */} 
                          </tr>
                        </thead>
                        <tbody className=" tbody">
                        {pendingItems.length === 0 ? (
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
                {/* <td>{item.SAP_INV_QRE_DOC_NUM}</td> */}
                <td className="text-center">
  {item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? item.SAP_INV_QRE_DOC_NUM
    : item.SAP_DOC_ISSUE_DOC_NUM}
</td>

                <td>{item.DOC_TYPE_ID.toUpperCase()}</td>
                <td>{item.DOC_DATE}</td>
                {/* <td>{item.STATUS}</td> */}
                <td className="text-center">
   <span
              className={`badge text-uppercase ${
                item.STATUS === 'approved'
                  ? 'bg-success'
                  : item.STATUS === 'rejected'
                  ? 'bg-danger'
                  : item.STATUS === 'pending'
                  ? 'bg-warning text-dark'
                  : 'bg-secondary'
              }`}
            >
              {item.STATUS.toUpperCase()}
            </span>
</td>

                 <td>
                  <Button
className="premium-btn premium-create"
                    variant="info"
                    size="sm"
                    onClick={() => openDetails(item.DOC_ID)}
                  >
                    View Approvals <FontAwesomeIcon icon={faBarsProgress} />
                  </Button>
                </td>
                <td>
                <Button
                className="premium-btn premium-create"
  variant="info"
  size="sm"
  onClick={() => openPayloadModal(item.PAYLOAD,item)}
>
  View Detail <FontAwesomeIcon icon={faSquareArrowUpRight} />
</Button>

                </td>
                {/* <td>
  {item.STATUS.toLowerCase() === "rejected" ? (
    <Link
      to="/inventory"
      onClick={() => handleEdit(item?.DOC_ID)}
      title="Edit Document"
    >
      <FontAwesomeIcon icon={faEdit} color="#f29b30" />
    </Link>
  ) : (
    <FontAwesomeIcon
      icon={faEdit}
      color="#ccc"
      title="Edit disabled unless rejected"
      style={{ cursor: "not-allowed", opacity: 0.5 }}
    />
  )}
</td> */}
<td>
  {(item.STATUS.toLowerCase() === "rejected" ||
    (item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
      ? !item.SAP_INV_QRE_DOC_NUM
      : !item.SAP_DOC_ISSUE_DOC_NUM)) ? (
    <Link
      to={
        (item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
          ? !item.SAP_INV_QRE_DOC_NUM
          : !item.SAP_DOC_ISSUE_DOC_NUM)
          ? "/Duplicate-Inventory-Request"
          : "/inventory"
      }
      onClick={() => handleEdit(item)}
      title="Edit Document"
    >
      <FontAwesomeIcon icon={faEdit} color="#f29b30" />
    </Link>
  ) : (
    <FontAwesomeIcon
      icon={faEdit}
      color="#ccc"
      title="Edit disabled unless rejected or SAP doc missing"
      style={{ cursor: "not-allowed", opacity: 0.5 }}
    />
  )}
</td>



              </tr>
            ))
          )}
                        </tbody>
                      {/* </Table> */}
                      </table></div></div></div>
                      <Pagination
  perPage={perPage}
  totalUsers={filteredItems.length} 
  paginate={paginate}
  currentPage={currentPage}
/>
                    {/* </Box> */}
                  </Col>
              </Col>
            </Row>
                </CardLayout>
          {/* </PageLayout> */}
          {showModal && (
         <div className="modal-backdrop show" style={{ opacity: "1" }}>
         <div
           className="modal d-block"
           tabIndex="-1"
           style={{ background: "rgba(255, 255, 255, 0.25)",  }}
         >
           <div className="modal-dialog modal-lg">
             <div
               className="modal-content"
               style={{ width: "996px", backgroundColor: "white",padding:"30px" }}
             >
             {/* <button
               type="button"
               style={{marginTop:"-10px"}}
               className="btn-close"
               onClick={() => setShowModal(false)}
               ></button> */}
               <div className="modal-header" >
                <Col md={12}>
                                 <Row className="g-1 mb-1 d-flex align-items-end filter-card" style={{backgroundColor:"#18596" ,color:"white"}} >

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>

                 <h3 className="" style={{color:"white" ,fontSize:"25px",fontWeight:"400"}}>Approval Steps</h3>
                                <button
  onClick={() => setShowModal(false)}
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
                                 </Row>
                   </Col>
               
               </div>
               <div className="modal-body"style={{marginTop:"-30px"}} >
        {/* <Table striped bordered hover responsive>
          <thead className="text-center"> */}
                 <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
            <tr>
              <th>#</th>
              <th>Approver</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Approved At</th>
            </tr>
          </thead>
         
<tbody className="text-center">
  {steps.length === 0 ? (
    <tr>
      <td colSpan="5">No steps found.</td>
    </tr>
  ) : (
  //   steps.map((step, index) =>
  //     step.approvals.map((approver, i) => (
  //       <tr key={`${step.stepId}-${approver.approverUserId}`}>
  //         <td>{index + 1}.{i + 1}</td>
  //           <td>{approver.userName || '-'}</td>
  //         <td>
  //           <span
  //             className={`badge text-uppercase ${
  //               approver.status === 'approved'
  //                 ? 'bg-success'
  //                 : approver.status === 'rejected'
  //                 ? 'bg-danger'
  //                 : approver.status === 'pending'
  //                 ? 'bg-warning text-dark'
  //                 : 'bg-secondary'
  //             }`}
  //           >
  //             {approver.status}
  //           </span>
  //         </td>
  //         <td>
  //           {approver.comments}
  //         </td>
          
  //         <td>
  //           {approver.timestamp
  //             ? new Date(approver.timestamp).toLocaleString()
  //             : '-'}
  //         </td>
  //       </tr>
  //     ))
  //   )
  // )}
  steps.map((step, index) =>
  step.approvals.map((approver, i) => {
    const userId = approver.userName; // this is actually the ID

    if (userId && !userMap[userId]) {
      fetchUserName(userId); // fetch real name
    }

    return (
      <tr key={`${step.stepId}-${userId}-${i}`}>
        <td>{index + 1}.{i + 1}</td>
        <td>{userMap[userId] || userId || '-'}</td> {/* show name or fallback to ID */}
        <td>
          <span
            className={`badge text-uppercase ${
              approver.status === 'approved'
                ? 'bg-success'
                : approver.status === 'rejected'
                ? 'bg-danger'
                : approver.status === 'pending'
                ? 'bg-warning text-dark'
                : 'bg-secondary'
            }`}
          >
            {approver.status}
          </span>
        </td>
      </tr>
    );
  })
)
)
}

</tbody>
{/* </Table> */}
</table></div></div></div>        </div>
        </div></div></div>
        </div>
        )}

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
