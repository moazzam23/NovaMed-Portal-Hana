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
  faPlusCircle,
  faCheckCircle,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table, Modal, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailApprovalDecision() {
  const companyDB = localStorage.getItem("companyDB");
  const [pendingItems, setPendingItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);

  useEffect(() => {
    fetchApprovals();
    fetchEmailTemplate();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/approval/pending?companyDB=${companyDB}`
      );
      console.log(res);
      setPendingItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Steps");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const fetchEmailTemplate = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/email-approval?companyDB=${companyDB}`
    );
    setEmailTemplate(res.data);
  };

  const getroleName = (userId) => {
    return (
      emailTemplate.find((u) => u.ID === userId)?.TEMPLATE_NAME || "Unknown"
    );
  };

  const filteredItems = pendingItems.filter((item) => {
    const docDate = new Date(item.CREATED_AT).toISOString().split("T")[0]; // yyyy-mm-dd
    return (
      (!startDate || docDate >= startDate) &&
      (!endDate || docDate <= endDate)
    );
  });

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setStartDate(today);
    setEndDate(today);
    setCurrentPage(1);
  };

  const handleAction = async (id, action) => {
  try {
    const endpoint =
      action === "approved"
        ? `${BASE_URL}/api/approval/approve?companyDB=${companyDB}`
        : `${BASE_URL}/api/approval/reject?companyDB=${companyDB}`;

    const res = await axios.post(endpoint, { requestId: id });

    toast.success(res.data.message || `Request ${action}`);
    // Refresh the list after action
    fetchApprovals();
  } catch (err) {
    console.error(err);
    toast.error(`Failed to ${action} request`);
  }
};


  return (
    <div>
      <PageLayout>
        <CardLayout>
          <Row>
            <Col md={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    fontSize: "30px",
                    fontWeight: "400",
                  }}
                >
                  Email Approval Decision
                </h3>
              </div>
            </Col>
  <Row
                            className="g-1 mb-3 align-items-end filter-card"
                            style={{ backgroundColor: "#18596" }}
                          >
   <Col md={12} className={"mt0-col-2"}>
    <Box className={"users-btn-flex"}>

            <Col md={3} className="ms-2">
                                 <label className="form-label2 fw-semibold">
                                   From Date
                                 </label>
                                 <input
                                   type="date"
                                   className="form-control"
                                   style={{ border: "1px solid grey" }}
                                   value={startDate}
                                   onChange={(e) => setStartDate(e.target.value)}
                                   />
                               </Col>
                               <Col md={3} className="ms-2">
                                 <label className="form-label2 fw-semibold">To Date</label>
                                 <input
                                   type="date"
                                   className="form-control"
                                   style={{ border: "1px solid grey" }}
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                                   />
                               </Col>
                               <Col md={5} className="text-end mt-0">
                                 <button
                                   className=" premium-btn premium-filter  w-40"
                                   onClick={resetFilters}
                                   >
                                   <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset
                                   Filters
                                 </button>
                                   </Col>
                                     </Box>
                               </Col>       </Row>
            <Col md={12}>
              <Col md={12}>
                <div
                  className="p-2 pb-3"
                  style={{ border: "1px solid grey", borderRadius: "15px" }}
                >
                  <div className="premium-table-container">
                    <div className="premium-table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr
                            style={{ fontSize: "15px" }}
                            className="text-center"
                          >
                            <th>ID</th>
                            <th>Email Template</th>
                            <th>To Emails</th>
                            <th>CC Emails</th>
                            <th>Created At</th>
                            <th className="text-center">Status </th>
                            <th>Actions</th>
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
                            paginatedItems.map((item, index) => (
                              <tr key={item.ID}>
                                <td>{item.ID}</td>
                                <td className="text-center">
                                  {getroleName(item.APPROVAL_TEMPLATE_ID)}
                                </td>
                                <td>
                                  <ul
                                    style={{ paddingLeft: "15px", margin: 0 ,textAlign:"left" }}
                                  >
                                    {item.TO_EMAILS?.split(",").map(
                                      (email, i) => (
                                        <li
                                          key={i}
                                          style={{
                                            listStyle: "disc",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {email.trim()}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul
                                    style={{ paddingLeft: "15px", margin: 0 ,textAlign:"left"}}
                                  >
                                    {item.CC_EMAILS?.split(",").map(
                                      (email, i) => (
                                        <li
                                          key={i}
                                          style={{
                                            listStyle: "disc",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {email.trim()}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>

                         
                                <td>
                                  {new Date(
                                    item.CREATED_AT
                                  ).toLocaleDateString()}
                                </td>

                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        item.STATUS.toLowerCase() === "pending"
                                          ? "#e3b41cff" // Yellow
                                          : item.STATUS.toLowerCase() ===
                                            "in_progress"
                                          ? "#007bff" // Blue
                                          : item.STATUS.toLowerCase() ===
                                            "approved"
                                          ? "#18596a" // Green
                                          : "#ff416c", // Default

                                      textTransform: "uppercase",
                                      textAlign: "center",
                                      color: "#ffff",
                                      fontWeight: "600",
                                      borderRadius: "5px",
                                      padding: "4px 5px",
                                    }}
                                  >
                                    {item.STATUS.toUpperCase()}
                                  </span>{" "}
                                </td>
                                 <td className="text-nowrap">
                                                          <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleAction(item.ID, "approved")}
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
                                                            onClick={() => handleAction(item.ID, "rejected")}
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
                                                       </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Pagination
                  perPage={perPage}
                  totalUsers={filteredItems.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Col>
            </Col>
          </Row>
        </CardLayout>
      </PageLayout>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   faCheckCircle,
//   faCancel,
//   faFilterCircleXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Box, Button } from "../../components/elements";
// import { Col, Row } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import { BASE_URL } from "../../apis/NodeApiUrl";
// import { LabelField } from "../../components/fields";

// export default function EmailApprovalDecision() {
//   const companyDB = localStorage.getItem("companyDB");
//   const [pendingItems, setPendingItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [emailTemplate, setEmailTemplate] = useState([]);
//   const [perPage] = useState(10);

//   // ✅ set default to today's date
//   const today = new Date().toISOString().split("T")[0];
//   const [startDate, setStartDate] = useState(today);
//   const [endDate, setEndDate] = useState(today);

//   useEffect(() => {
//     fetchApprovals();
//     fetchEmailTemplate();
//   }, []);

//   const fetchApprovals = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/approval/pending?companyDB=${companyDB}`
//       );
//       setPendingItems(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Steps");
//     }
//   };

//   const fetchEmailTemplate = async () => {
//     const res = await axios.get(
//       `${BASE_URL}/api/email-approval?companyDB=${companyDB}`
//     );
//     setEmailTemplate(res.data);
//   };

//   const getroleName = (userId) => {
//     return (
//       emailTemplate.find((u) => u.ID === userId)?.TEMPLATE_NAME || "Unknown"
//     );
//   };

//   // ✅ filtering by date
//   const filteredItems = pendingItems.filter((item) => {
//     const docDate = new Date(item.CREATED_AT).toISOString().split("T")[0]; // yyyy-mm-dd
//     return (
//       (!startDate || docDate >= startDate) &&
//       (!endDate || docDate <= endDate)
//     );
//   });

//   const paginatedItems = filteredItems.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const resetFilters = () => {
//     setStartDate(today);
//     setEndDate(today);
//     setCurrentPage(1);
//   };

//   const handleAction = async (id, action) => {
//     try {
//       const endpoint =
//         action === "approved"
//           ? `${BASE_URL}/api/approval/approve?companyDB=${companyDB}`
//           : `${BASE_URL}/api/approval/reject?companyDB=${companyDB}`;

//       const res = await axios.post(endpoint, { requestId: id });
//       toast.success(res.data.message || `Request ${action}`);
//       fetchApprovals();
//     } catch (err) {
//       console.error(err);
//       toast.error(`Failed to ${action} request`);
//     }
//   };

//   return (
//     <div>
//       <PageLayout>
//         <CardLayout>
//           <Row>
//             <Col md={12}>
//               <h3 style={{ fontSize: "30px", fontWeight: "400" }}>
//                 Email Approval Decision
//               </h3>
//             </Col>

//             {/* ✅ Date Filters */}
//              <Row
//                             className="g-1 mb-3 align-items-end filter-card"
//                             style={{ backgroundColor: "#18596" }}
//                           >
//    <Col md={12} className={"mt0-col-2"}>
//     <Box className={"users-btn-flex"}>

//             <Col md={3} className="ms-2">
//                                  <label className="form-label2 fw-semibold">
//                                    From Date
//                                  </label>
//                                  <input
//                                    type="date"
//                                    className="form-control"
//                                    style={{ border: "1px solid grey" }}
//                                    value={startDate}
//                                    onChange={(e) => setStartDate(e.target.value)}
//                                    />
//                                </Col>
//                                <Col md={3} className="ms-2">
//                                  <label className="form-label2 fw-semibold">To Date</label>
//                                  <input
//                                    type="date"
//                                    className="form-control"
//                                    style={{ border: "1px solid grey" }}
//                                    value={endDate}
//                                    onChange={(e) => setEndDate(e.target.value)}
//                                    />
//                                </Col>
//                                <Col md={5} className="text-end mt-0">
//                                  <button
//                                    className=" premium-btn premium-filter  w-40"
//                                    onClick={resetFilters}
//                                    >
//                                    <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset
//                                    Filters
//                                  </button>
//                                    </Col>
//                                      </Box>
//                                </Col>       </Row>

//             {/* Table */}
//             <Col md={12}>
//               <div className="p-2 pb-3" style={{ border: "1px solid grey", borderRadius: "15px" }}>
//                 <div className="premium-table-container">
//                   <div className="premium-table-wrapper">
//                     <table className="premium-table">
//                       <thead>
//                         <tr className="text-center">
//                           <th>ID</th>
//                           <th>Email Template</th>
//                           <th>To Emails</th>
//                           <th>CC Emails</th>
//                           <th>Created At</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {paginatedItems.length === 0 ? (
//                           <tr>
//                             <td colSpan="7" className="text-center">
//                               No pending approvals
//                             </td>
//                           </tr>
//                         ) : (
//                           paginatedItems.map((item) => (
//                             <tr key={item.ID}>
//                               <td>{item.ID}</td>
//                               <td>{getroleName(item.APPROVAL_TEMPLATE_ID)}</td>
//                               <td>{item.TO_EMAILS}</td>
//                               <td>{item.CC_EMAILS}</td>
//                               <td>{new Date(item.CREATED_AT).toLocaleDateString()}</td>
//                               <td>
//                                 <span
//                                   style={{
//                                     backgroundColor:
//                                       item.STATUS.toLowerCase() === "pending"
//                                         ? "#e3b41c"
//                                         : item.STATUS.toLowerCase() === "approved"
//                                         ? "#18596a"
//                                         : "#ff416c",
//                                     color: "white",
//                                     padding: "4px 8px",
//                                     borderRadius: "5px",
//                                     fontWeight: "600",
//                                   }}
//                                 >
//                                   {item.STATUS.toUpperCase()}
//                                 </span>
//                               </td>
//                               <td className="text-nowrap">
//                                                    <Button
//                                                             variant="success"
//                                                             size="sm"
//                                                             className="me-2"
//                                                             onClick={() => handleAction(item.ID, "approved")}
//                                                           >
//                                                             <span
//                                                               style={{
//                                                                 backgroundColor: "#18596a",
//                                                                 color: "white",
//                                                                 padding: "8px 12px",
//                                                                 borderRadius: "10px",
//                                                                 fontWeight: "600",
//                                                                 fontSize: "12px",
//                                                               }}
//                                                             >
//                                                               <FontAwesomeIcon icon={faCheckCircle} /> Approve
//                                                             </span>
//                                                           </Button>
//                                                           <Button
//                                                             variant="danger"
//                                                             size="sm"
//                                                             className="me-2"
//                                                             onClick={() => handleAction(item.ID, "rejected")}
//                                                           >
//                                                             <span
//                                                               style={{
//                                                                 backgroundColor: "#d14249",
//                                                                 color: "white",
//                                                                 padding: "8px 12px",
//                                                                 borderRadius: "10px",
//                                                                 fontWeight: "600",
//                                                                 fontSize: "12px",
//                                                               }}
//                                                             >
//                                                               <FontAwesomeIcon icon={faCancel} /> Reject
//                                                             </span>
//                                                           </Button>
//                                                        </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               <Pagination
//                 perPage={perPage}
//                 totalUsers={filteredItems.length}
//                 paginate={paginate}
//                 currentPage={currentPage}
//               />
//             </Col>
//           </Row>
//         </CardLayout>
//       </PageLayout>
//     </div>
//   );
// }
