import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table,Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";

export default function ViewAllDocuments() {
  const companyDB = localStorage.getItem("companyDB");
  const userRole = localStorage.getItem("userId"); // Store this when user logs in
  const [pendingItems, setPendingItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
        `http://localhost:5000/users/${userRole}/approved-documents?CompanyDB=${companyDB}`
      );
      console.log(res)
      setPendingItems(res.data.documents);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pending approvals");
    }
  };

  const handleAction = async (approvalId, action) => {
    try {
      await axios.post(
        `http://localhost:5000/documents/${approvalId}/approve?CompanyDB=${companyDB}`,
        {
          userId: userRole,                  // From localStorage
          approvalStatus: action,           // 'approved' or 'rejected'
          comments: ""                      // Optional: add textarea later
        });
      

      toast.success(`Step ${action}d successfully`);
      fetchPendingApprovals();
    } catch (err) {
      toast.error("Failed to update step");
    }
  };

  const openDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
      <div>
          <PageLayout>
                <CardLayout>
            <Row>
              <Col md={12}>
                    <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}> Approved Documents</h3>
      
                {/* </CardLayout> */}
              </Col>
              <Col md={12}>
                {/* <CardLayout> */}
                 <Row className="g-1 mb-3 align-items-end filter-card" style={{backgroundColor:"#18596"}} >
                       <Col md={9} className={"mt0-col-2"}>
                      <Box
                       className={"users-btn-flex"}>
                        {/* <Box className={"clients-btn-box"}>
                          <Text className="faArrowLeft-client" as="span">
                            <FontAwesomeIcon icon={faArrowRotateLeft} />
                          </Text>
                        </Box> */}
                        {/* <Link to="/client-create">
                          <button className="btn-create">
                            {" "}
                            <FontAwesomeIcon icon={faPlus} /> Create
                          </button>
                        </Link> */}
                        <Col xs={12} sm={12} md={4} lg={4}>
                          <CustomSearch
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </Col>
                      </Box>
                    </Col>
                  </Row>
                  <Col md={12}>
                    {/* <Box className={"client-table"}>
                      <Table className="mc-table" responsive>
                        <thead className=" text-center mc-table-head primary"> */}
                <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
     
                          <tr>
                          <th>#</th>
          <th>Document No</th>
             <th>Document Type</th>
             <th>Date</th>
           <th>Action Required</th>
             {/* <th>Details</th>
             <th>Action</th> */}
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
                <td>{item.DOC_TYPE_ID}</td>
                <td>{item.DOC_DATE}</td>
                <td><span  style={{
    backgroundColor:
      item.STATUS.toLowerCase() === "pending"
        ? "#fff3cd" // Yellow
        : item.STATUS.toLowerCase() === "in_progress"
        ? "#007bff" // Blue
        : item.STATUS.toLowerCase() === "approved"
        ? "#18596a" // Green
        : "#f8f9fa", // Default
    
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
                    onClick={() => openDetails(item)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAction(item.DOC_ID, "approved")}
                    className="me-2"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAction(item.DOC_ID, "rejected")}
                  >
                    Reject
                  </Button>
                </td> */}
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
          </PageLayout>
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
        </div>
    // <div className="container mt-4">
    //   <h3>Pending Workflow Approvals</h3>

    //   <Table bordered hover className="mt-3">
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>Document No</th>
    //         <th>Document Type</th>
    //         <th>Date</th>
    //         <th>Action Required</th>
    //         <th>Details</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {pendingItems.length === 0 ? (
    //         <tr>
    //           <td colSpan="7" className="text-center">
    //             No pending approvals
    //           </td>
    //         </tr>
    //       ) : (
    //         pendingItems.map((item, index) => (
    //           <tr key={item.approvalId}>
    //             <td>{index + 1}</td>
    //             <td>{item.DOC_NUMBER}</td>
    //             <td>{item.DOC_TYPE_ID}</td>
    //             <td>{item.DOC_DATE}</td>
    //             <td>{item.STATUS}</td>
    //             <td>
    //               <Button
    //                 variant="info"
    //                 size="sm"
    //                 onClick={() => openDetails(item)}
    //               >
    //                 View
    //               </Button>
    //             </td>
    //             <td>
    //               <Button
    //                 variant="success"
    //                 size="sm"
    //                 onClick={() => handleAction(item.DOC_ID, "approved")}
    //                 className="me-2"
    //               >
    //                 Approve
    //               </Button>
    //               <Button
    //                 variant="danger"
    //                 size="sm"
    //                 onClick={() => handleAction(item.DOC_ID, "rejected")}
    //               >
    //                 Reject
    //               </Button>
    //             </td>
    //           </tr>
    //         ))
    //       )}
    //     </tbody>
    //   </Table>

    //   <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
    //     <Modal.Header closeButton>
    //       <Modal.Title>Document Payload</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {selectedItem?.payload ? (
    //         <pre>{JSON.stringify(selectedItem.payload, null, 2)}</pre>
    //       ) : (
    //         <p>No payload available</p>
    //       )}
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={() => setShowModal(false)}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </div>
  );
}
