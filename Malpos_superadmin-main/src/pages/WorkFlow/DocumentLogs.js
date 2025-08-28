// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Box, Button, Form, Text } from "../../components/elements";
// import { Col, Row, Table, Modal } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import SelectField from "../../components/fields/SelectField";
// import { BASE_URL } from "../../apis/NodeApiUrl";

// export default function AllUserApprovedDocuments() {
//   const companyDB = localStorage.getItem("companyDB");
//   const [documenyLogs, setDocumentLogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [createdByOptions, setCreatedByOptions] = useState([]);
//   const [selectedCreator, setSelectedCreator] = useState("");
//   const [perPage] = useState(15);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     fetchDocumentLogs();
//   }, []);

//   const fetchDocumentLogs = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/document-logs?companyDB=${companyDB}`
//       );
//       setDocumentLogs(res.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load approved documents");
//     }
//   };

//   const filteredItems = documenyLogs


//   return (
//     <PageLayout>
//       <CardLayout>
//         <Row className="mb-3">
//           <Col>
//             <h3
//               style={{ textAlign: "left", fontSize: "30px", fontWeight: "400" }}
//             >
//               Document Logs
//             </h3>
//           </Col>
//         </Row>

//         <Row
//           className="g-1 mb-3 align-items-end filter-card"
//           style={{ backgroundColor: "#18596" }}
//         >
//           {/* <Row className="align-items-center mb-3"> */}
//           <Col md={4}>
//             <label className="form-label2 fw-semibold">Search</label>
//             <CustomSearch
//               placeholder="Search by Document No or Type..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 padding: "8px",
//                 borderRadius: "6px",
//                 border: "1px solid #ced4da",
//                 width: "100%",
//               }}
//             />
//           </Col>
//         </Row>

//         <div
//           className="p-2 pb-3"
//           style={{ border: "1px solid grey", borderRadius: "15px" }}
//         >
//           <div className="premium-table-container">
//             <div className="premium-table-wrapper">
//               <table className="premium-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Document No</th>
//                     <th>Doc Type</th>
//                     <th>Action</th>
//                     <th>Message</th>
//                     <th>Detail</th>
//                     <th>Created At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredItems.length === 0 ? (
//                     <tr>
//                       <td colSpan="7">No documents found</td>
//                     </tr>
//                   ) : (
//                     filteredItems
//                       .slice((currentPage - 1) * perPage, currentPage * perPage)
//                       .map((item, index) => (
//                         <tr
//                           key={item.approvalId}
//                           style={{ animation: "fadeIn 0.3s ease" }}
//                         >
//                           <td>{item.ID}</td>
//                           <td className="text-center">
//                             {item.REQUEST_ID}
//                           </td>
//                           <td>{item.DOC_TYPE}</td>
//                           <td>{item.ACTION}</td>
//                           <td>
//                               {item.MESSAGE}
                    
//                           </td>
//                           <td>{item.DETAILS}</td>
//                                                     <td>{new Date(
//                                     item.CREATED_AT
//                                   ).toLocaleDateString()}</td>
//                         </tr>
//                       ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         {/* </Table>
//         </Box> */}

//         <Pagination
//           perPage={perPage}
//           totalUsers={filteredItems.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       </CardLayout>
//     </PageLayout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Col, Row } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import { BASE_URL } from "../../apis/NodeApiUrl";
// import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function AllUserApprovedDocuments() {
//   const companyDB = localStorage.getItem("companyDB");
//   const [documentLogs, setDocumentLogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [docTypeFilter, setDocTypeFilter] = useState("");
//   const [actionFilter, setActionFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [perPage] = useState(15);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

// const resetFilters = () => {
//   setSearchTerm("");
//   setActionFilter("");
//   setDateFilter("");
//   setDocTypeFilter("");
//   setCurrentPage(1);
// };


//   useEffect(() => {
//     fetchDocumentLogs();
//   }, []);

//   const fetchDocumentLogs = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/document-logs?companyDB=${companyDB}`
//       );
//       setDocumentLogs(res.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load approved documents");
//     }
//   };

//   // --- Filtering Logic ---
//   const filteredItems = documentLogs.filter((item) => {
//     const matchesSearch =
//       item.REQUEST_ID?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.DOC_TYPE?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesDocType = docTypeFilter ? item.DOC_TYPE === docTypeFilter : true;
//     const matchesAction = actionFilter ? item.ACTION === actionFilter : true;

//     const matchesDate = dateFilter
//       ? new Date(item.CREATED_AT).toLocaleDateString() ===
//         new Date(dateFilter).toLocaleDateString()
//       : true;

//     return matchesSearch && matchesDocType && matchesAction && matchesDate;
//   });

//   // Unique dropdown options
//   const docTypes = [...new Set(documentLogs.map((d) => d.DOC_TYPE))];
//   const actions = [...new Set(documentLogs.map((d) => d.ACTION))];

//   return (
//     <PageLayout>
//       <CardLayout>
//         <Row className="mb-3">
//           <Col>
//             <h3 style={{ textAlign: "left", fontSize: "26px", fontWeight: "500" }}>
//               Document Logs
//             </h3>
//           </Col>
//         </Row>

//         {/* Filters */}
//  <Row
//           className="g-1 mb-3 align-items-end filter-card"
//           style={{ backgroundColor: "#18596" }}
//         >
//           <Col md={3}>
//             <label className="form-label2 fw-semibold">Search</label>
//             <CustomSearch
//               placeholder="Search by Document No or Type..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 padding: "8px",
//                 borderRadius: "6px",
//                 border: "1px solid #ced4da",
//                 width: "100%",
//               }}
//             />
//           </Col>
//           <Col md={3}>
//             <label className="form-label2 fw-semibold">Doc Type</label>
//             <select
//               className="form-select"
//               value={docTypeFilter}
//               onChange={(e) => setDocTypeFilter(e.target.value)}
//             >
//               <option value="">All</option>
//               {docTypes.map((type, i) => (
//                 <option key={i} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </Col>
//           <Col md={3}>
//             <label className="form-label2 fw-semibold">Action</label>
//             <select
//               className="form-select"
//               value={actionFilter}
//               onChange={(e) => setActionFilter(e.target.value)}
//             >
//               <option value="">All</option>
//               {actions.map((action, i) => (
//                 <option key={i} value={action}>
//                   {action}
//                 </option>
//               ))}
//             </select>
//           </Col>
//           <Col md={3}>
//             <label className="form-label2 fw-semibold">Date</label>
//             <input
//               type="date"
//               className="form-control"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//             />
//           </Col>
//           <Col md={12} className="text-end mt-2" >
//             <button
//               className=" premium-btn premium-filter  w-40"
//               onClick={resetFilters}
//             >
//               <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
//             </button>
//           </Col>
//         </Row>

//         {/* Table */}
//         <div
//           className="p-2 pb-3"
//           style={{ border: "1px solid grey", borderRadius: "15px" }}
//         >
//           <div className="premium-table-container">
//             <div className="premium-table-wrapper">
//               <table className="premium-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Document No</th>
//                     <th>Doc Type</th>
//                     <th>Action</th>
//                     <th>Message</th>
//                     <th>Detail</th>
//                     <th>Created At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredItems.length === 0 ? (
//                     <tr>
//                       <td colSpan="7">No documents found</td>
//                     </tr>
//                   ) : (
//                     filteredItems
//                       .slice((currentPage - 1) * perPage, currentPage * perPage)
//                       .map((item) => (
//                         <tr key={item.ID} style={{ animation: "fadeIn 0.3s ease" }}>
//                           <td>{item.ID}</td>
//                           <td className="text-center">{item.REQUEST_ID}</td>
//                           <td>{item.DOC_TYPE}</td>
//                           <td>{item.ACTION}</td>
//                           <td>{item.MESSAGE}</td>
//                           {/* Truncate details */}
//                           <td
//                             style={{
//                               maxWidth: "200px",
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               cursor: "pointer",
//                             }}
//                             title={item.DETAILS}
//                           >
//                             {item.DETAILS}
//                           </td>
//                           <td>
//                             {new Date(item.CREATED_AT).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <Pagination
//           perPage={perPage}
//           totalUsers={filteredItems.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       </CardLayout>
//     </PageLayout>
//   );
// }



import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { faFilterCircleXmark, faEye, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllUserApprovedDocuments() {
  const companyDB = localStorage.getItem("companyDB");
  const [documentLogs, setDocumentLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [perPage] = useState(15);

  // Modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState("");

  const handleOpenDetail = (detail) => {
    setSelectedDetail(detail);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail("");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActionFilter("");
    setDateFilter("");
    setDocTypeFilter("");
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchDocumentLogs();
  }, []);

  const fetchDocumentLogs = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/document-logs?companyDB=${companyDB}`
      );
      setDocumentLogs(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load approved documents");
    }
  };

  // --- Filtering Logic ---
  const filteredItems = documentLogs.filter((item) => {
    const matchesSearch =
      item.REQUEST_ID?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.DOC_TYPE?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDocType = docTypeFilter ? item.DOC_TYPE === docTypeFilter : true;
    const matchesAction = actionFilter ? item.ACTION === actionFilter : true;

    const matchesDate = dateFilter
      ? new Date(item.CREATED_AT).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;

    return matchesSearch && matchesDocType && matchesAction && matchesDate;
  });

  // Unique dropdown options
  const docTypes = [...new Set(documentLogs.map((d) => d.DOC_TYPE))];
  const actions = [...new Set(documentLogs.map((d) => d.ACTION))];

  return (
    <PageLayout>
      <CardLayout>
        <Row className="mb-3">
          <Col>
            <h3 style={{ textAlign: "left", fontSize: "26px", fontWeight: "500" }}>
              Document Logs
            </h3>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="g-1 mb-3 align-items-end filter-card">
          <Col md={3}>
            <label className="form-label2 fw-semibold">Search</label>
            <CustomSearch
              placeholder="Search by Document No or Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <label className="form-label2 fw-semibold">Doc Type</label>
            <select
              className="form-select"
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              {docTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Col>
          <Col md={3}>
            <label className="form-label2 fw-semibold">Action</label>
            <select
              className="form-select"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <option value="">All</option>
              {actions.map((action, i) => (
                <option key={i} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </Col>
          <Col md={3}>
            <label className="form-label2 fw-semibold">Date</label>
            <input
              type="date"
              className="form-control"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </Col>
          <Col md={12} className="text-end mt-2">
            <button
              className=" premium-btn premium-filter  w-40"
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
            </button>
          </Col>
        </Row>

        {/* Table */}
        <div className="p-2 pb-3" style={{ border: "1px solid grey", borderRadius: "15px" }}>
          <div className="premium-table-container">
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Document No</th>
                    <th>Doc Type</th>
                    <th>Action</th>
                    <th>Message</th>
                    <th>Detail</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="7">No documents found</td>
                    </tr>
                  ) : (
                    filteredItems
                      .slice((currentPage - 1) * perPage, currentPage * perPage)
                      .map((item) => (
                        <tr key={item.ID}>
                          <td>{item.ID}</td>
                          <td className="text-center">{item.REQUEST_ID}</td>
                          <td>{item.DOC_TYPE}</td>
                          <td>{item.ACTION}</td>
                          <td>{item.MESSAGE}</td>
                          {/* Eye icon for detail */}
                          <td className="text-center">
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ cursor: "pointer", color: "#007bff" }}
                              onClick={() => handleOpenDetail(item.DETAILS)}
                            />
                          </td>
                          <td>
                            {new Date(item.CREATED_AT).toLocaleDateString()}
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
      </CardLayout>

      {/* Custom Modal for detail (replaces react-bootstrap Modal) */}
      {showDetailModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              width: "90%",          // take 90% width of screen
              maxWidth: "1000px",    // max width for large screens
              maxHeight: "80vh",     // prevent overflow on small screens
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h4 style={{ margin: 0 }}>Document Detail</h4>
              <button
                onClick={handleCloseDetail}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedDetail}
            </div>

            {/* Footer */}
            <div style={{ textAlign: "right", marginTop: "15px" }}>
              <button
                onClick={handleCloseDetail}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faClose}/>  
                  <span>  </span>Close
              </button>
            </div>
          </div>
        </div>
      )}

    </PageLayout>
  );
}
