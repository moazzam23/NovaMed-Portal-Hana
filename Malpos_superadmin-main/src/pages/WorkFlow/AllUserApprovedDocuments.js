  // import React, { useEffect, useState } from "react";
  // import { toast } from "react-toastify";
  // import "react-toastify/dist/ReactToastify.css";
  // import {
  //   faArrowRotateLeft,
  //   faPlus,
  //   faTrash,
  //   faEdit,
  // } from "@fortawesome/free-solid-svg-icons";
  // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  // import { Box, Button, Text } from "../../components/elements";
  // import { Col, Row, Table,Modal } from "react-bootstrap";
  // import { CardLayout } from "../../components/cards";
  // import PageLayout from "../../layouts/PageLayout";
  // import axios from "axios";
  // import { Pagination } from "../../components";
  // import CustomSearch from "../../components/CustomSearch";
  // import { Link } from "react-router-dom";

  // export default function AllUserApprovedDocuments() {
  //   const companyDB = localStorage.getItem("companyDB");
  //   // const userRole = localStorage.getItem("userId"); // Store this when user logs in
  //   const [pendingItems, setPendingItems] = useState([]);
  //   const [showModal, setShowModal] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [selectedItem, setSelectedItem] = useState(null);
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [perPage] = useState(10);
    
  //     const paginate = (pageNumber) => {
  //       setCurrentPage(pageNumber);
  //     };

  //   useEffect(() => {
  //     fetchPendingApprovals();
  //   }, []);

  //   const fetchPendingApprovals = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/users/approved-documents?CompanyDB=${companyDB}`
  //       );
  //       console.log(res)
  //       setPendingItems(res.data.documents);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to load pending approvals");
  //     }
  //   };

  //   return (
  //       <div>
  //           <PageLayout>
  //             <Row>
  //               <Col md={12}>
  //                 <CardLayout>
  //                   <h3> Approvals</h3>
  //                 </CardLayout>
  //               </Col>
  //               <Col md={12}>
  //                 <CardLayout>
  //                   <Row>
  //                     <Col md={9} className={"mt0-col-2"}>
  //                       <Box
  //                       className={"users-btn-flex"}>
  //                         <Col xs={12} sm={12} md={4} lg={4}>
  //                           <CustomSearch
  //                             value={searchTerm}
  //                             onChange={(e) => setSearchTerm(e.target.value)}
  //                           />
  //                         </Col>
  //                       </Box>
  //                     </Col>
  //                   </Row>
  //                   <Col md={12}>
  //                     <Box className={"client-table"}>
  //                       <Table className="mc-table" responsive>
  //                         <thead className=" text-center mc-table-head primary">
  //                           <tr>
  //                           <th>#</th>
  //           <th>Document No</th>
  //             <th>Document Type</th>
  //             <th>Date</th>
  //           <th>Action </th>
  //                           </tr>
  //                         </thead>
  //                         <tbody className="text-center tbody">
  //                         {pendingItems.length === 0 ? (
  //             <tr>
  //               <td colSpan="7" className="text-center">
  //                 No pending approvals
  //               </td>
  //             </tr>
  //           ) : (
  //             pendingItems.map((item, index) => (
  //               <tr key={item.approvalId}>
  //                 <td>{index + 1}</td>
  //                 <td>{item.DOC_NUMBER}</td>
  //                 <td>{item.DOC_TYPE_ID}</td>
  //                 <td>{item.DOC_DATE}</td>
  //                 <td><span  style={{
  //     backgroundColor:
  //       item.STATUS.toLowerCase() === "pending"
  //         ? "#fff3cd" // Yellow
  //         : item.STATUS.toLowerCase() === "in_progress"
  //         ? "#cce5ff" // Blue
  //         : item.STATUS.toLowerCase() === "approved"
  //         ? "#7dff97" // Green
  //         : "#f8f9fa", // Default
      
  //     textTransform: "uppercase",
  //     textAlign:"center",
  //     color: "#000", // Text color for contrast
  //     borderRadius: "5px",
  //     padding: "7px 5px"
  //   }} >
  //   {item.STATUS.toUpperCase()}
  //   </span> </td>
  //   <td>{item.CREATED_BY}</td>
  //               </tr>
  //             ))
  //           )}
  //                         </tbody>
  //                       </Table>
  //                       <Pagination
  //                         perPage={perPage}
  //                         totalUsers={pendingItems.length}
  //                         paginate={paginate}
  //                         currentPage={currentPage}
  //                       />
  //                     </Box>
  //                   </Col>
  //                 </CardLayout>
  //               </Col>
  //             </Row>
  //           </PageLayout>
  //           <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
  //         <Modal.Header closeButton>
  //           <Modal.Title>Document Payload</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           {selectedItem?.payload ? (
  //             <pre>{JSON.stringify(selectedItem.payload, null, 2)}</pre>
  //           ) : (
  //             <p>No payload available</p>
  //           )}
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={() => setShowModal(false)}>
  //             Close
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //         </div>
  //   )}

  import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Form, Text } from "../../components/elements";
import { Col, Row, Table, Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import SelectField from "../../components/fields/SelectField";


export default function AllUserApprovedDocuments() {
  const companyDB = localStorage.getItem("companyDB");
  const [pendingItems, setPendingItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [createdByOptions, setCreatedByOptions] = useState([]);
const [selectedCreator, setSelectedCreator] = useState("");
const [statusFilter, setStatusFilter] = useState("");
  const [perPage] = useState(15);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/approved-documents?CompanyDB=${companyDB}`
      );
      setPendingItems(res.data.documents || []);

      const uniqueCreators = Array.from(
  new Set(res.data.documents.map(item => item.CREATED_BY_NAME))
).filter(Boolean); // Remove null/empty

setCreatedByOptions(
  uniqueCreators.map(name => ({
    label: name,
    value: name
  }))
);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load approved documents");
    }
  };

  const filteredItems = pendingItems.filter((item) =>
    `${item.DOC_NUMBER} ${item.DOC_TYPE_ID}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
  // (!statusFilter || item.STATUS.toLowerCase() === statusFilter.toLowerCase()) &&
  (selectedCreator === "" || item.CREATED_BY_NAME === selectedCreator)
  );

  return (
    <PageLayout>
      <CardLayout>
      <Row className="mb-3">
        <Col>
          <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Approved Documents</h3>
      
        </Col>
      </Row>

          <Row className="g-1 mb-3 align-items-end filter-card" style={{backgroundColor:"#18596"}} >
        {/* <Row className="align-items-center mb-3"> */}
          <Col md={4}>
           <label className="form-label2 fw-semibold">Search</label>
            <CustomSearch
              placeholder="Search by Document No or Type..."
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
          <Col md={4}>
                     <label className="form-label2 fw-semibold">Creator</label>
  <SelectField
    // label="Filter by Created By"
    options={[{ label: "All", value: "" }, ...createdByOptions]}
    value={selectedCreator}
    onChange={(e) => setSelectedCreator(e.target.value)}
    className="form-control"
    style={{
      margin:"-23px 0px 0px 0px"
    }}
  />
  {/* </Row> */}
</Col>
{/* <Col xs={12} sm={6} md={2} style={{marginLeft:"10px"}} >
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
  </Col> */}

        </Row>

        {/* <Box className="table-responsive">
          <Table striped bordered hover className="text-center" style={{ fontSize: "0.9rem" }}>
            <thead className="mc-table-head primary"> */}
             <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
              <tr>
                <th>#</th>
                <th>Document No</th>
                            <th>SAP Doc Number</th>
                <th>Document Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Created By</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7">No approved documents found</td>
                </tr>
              ) : (
                filteredItems
                  .slice((currentPage - 1) * perPage, currentPage * perPage)
                  .map((item, index) => (
                    <tr key={item.approvalId} style={{ animation: "fadeIn 0.3s ease" }}>
                      <td>{(currentPage - 1) * perPage + index + 1}</td>
                      <td>{item.DOC_NUMBER}</td>
                            <td className="text-center">
  {item.DOC_TYPE_ID?.trim().toLowerCase() === "inventory request"
    ? item.SAP_INV_QRE_DOC_NUM
    : item.SAP_DOC_ISSUE_DOC_NUM}
</td>
                      <td>{item.DOC_TYPE_ID}</td>
                      <td>{item.DOC_DATE}</td>
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
                      <td>{item.CREATED_BY_NAME}</td>
                    </tr>
                  ))
              )}
            </tbody>
            </table></div></div></div>
          {/* </Table>
        </Box> */}

        <Pagination
          perPage={perPage}
          totalUsers={filteredItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </CardLayout>

    </PageLayout>
  );
}
