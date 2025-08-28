// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Col, Row, Table } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import { Pagination } from "../../components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRotateLeft,
//   faPlus,
//   faTrash,
//   faEdit,
//   faPlusCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { Box, Text } from "../../components/elements";
// import axios from "axios";
// import { BASE_URL } from "../../apis/NodeApiUrl";

// export default function Customers() {
//   const [customers, setCustomers] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage] = useState(30);
//   const companyDB = localStorage.getItem("companyDB");
//   const [emailTemplate, setEmailTemplate] = useState([]);

//   const getCustomers = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/SAP_Customer?CompanyDB=${companyDB}`
//       );
//       setCustomers(response.data);
//       console.log(response);
//     } catch (error) {
//       console.log("Error retrieving users:", error);
//     }
//   };

//   useEffect(() => {
//     getCustomers();
//     fetchEmailTemplate();
//   }, []);

//   const fetchEmailTemplate = async () => {
//     const res = await axios.get(
//       `${BASE_URL}/api/email_template/assign?companyDB=${companyDB}`
//     );
//     setEmailTemplate(res.data);
//   };

//   const getroleName = (userId) => {
//     return (
//       emailTemplate.find((u) => u.CUSTOMER_CODE === userId)?.TEMPLATE_NAME ||
//       "Unknown"
//     );
//   };

//   const indexOfLast = currentPage * perPage;
//   const indexOfFirst = indexOfLast - perPage;
//   const currentUsers = customers.slice(indexOfFirst, indexOfLast);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <PageLayout>
//       <CardLayout>
//         <Row>
//           <Col md={12}>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <h3
//                 style={{
//                   textAlign: "left",
//                   fontSize: "30px",
//                   fontWeight: "400",
//                 }}
//               >
//                 Customer Detail
//               </h3>
//               <Link to="/email-template-assign">
//                 <button className="premium-btn premium-create">
//                   <FontAwesomeIcon icon={faPlusCircle} /> Assign Customer
//                   Subject
//                 </button>
//               </Link>
//             </div>
//           </Col>
//           <Col md={12}>
//             <Row>
//               <Col md={12}>
//                 <div
//                   className="p-2 pb-3"
//                   style={{ border: "1px solid grey", borderRadius: "15px" }}
//                 >
//                   <div className="premium-table-container">
//                     <div className="premium-table-wrapper">
//                       <table className="premium-table">
//                         <thead>
//                           <tr style={{ fontSize: "14px", textAlign: "left" }}>
//                             <th>Code</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone 1</th>
//                             <th>Phone 2</th>
//                             <th>Balance</th>
//                             <th>Email Template</th>
//                             <th>Active</th>
//                           </tr>
//                         </thead>
//                         <tbody className="mc-table-body">
//                           {currentUsers.map((user, index) => (
//                             <tr
//                               style={{ fontSize: "12px", textAlign: "left" }}
//                               key={user.CardCode}
//                             >
//                               <td>{user.CardCode}</td>
//                               <td style={{ textAlign: "left" }}>
//                                 {user.CardName}
//                               </td>
//                               <td>{user.E_Mail}</td>
//                               <td>{user.Phone1}</td>
//                               <td>{user.Phone2}</td>
//                               <td>{user.Balance}</td>
//                               <td>{getroleName(user.CardCode)}</td>
//                               <td>
//                                 <label className="switch">
//                                   <input
//                                     type="checkbox"
//                                     checked={user.validFor === "Y"}
//                                     readOnly
//                                   />
//                                   <span className="slider round"></span>
//                                 </label>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>{" "}
//                 {customers.length > 0 && (
//                   <Pagination
//                     perPage={perPage}
//                     totalUsers={customers.length}
//                     paginate={paginate}
//                     currentPage={currentPage}
//                   />
//                 )}
//                 {/* </Box> */}
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </CardLayout>
//     </PageLayout>
//   );
// }

import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilterCircleXmark,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(30);

  const companyDB = localStorage.getItem("companyDB");
  const [emailTemplate, setEmailTemplate] = useState([]);

  // 🔎 filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTemplate("");
    setCurrentPage(1);
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/SAP_Customer?CompanyDB=${companyDB}`
      );
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.log("Error retrieving users:", error);
    }
  };

  useEffect(() => {
    getCustomers();
    fetchEmailTemplate();
  }, []);

  const fetchEmailTemplate = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/email_template/assign?companyDB=${companyDB}`
    );
    setEmailTemplate(res.data);
  };

  const getTemplateName = (userId) => {
    return (
      emailTemplate.find((u) => u.CUSTOMER_CODE === userId)?.TEMPLATE_NAME ||
      "Unknown"
    );
  };

  // 🧠 filtering logic
  useEffect(() => {
    let result = customers;

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.CardCode?.toLowerCase().includes(lower) ||
          u.CardName?.toLowerCase().includes(lower) ||
          u.E_Mail?.toLowerCase().includes(lower) ||
          u.Phone1?.toLowerCase().includes(lower) ||
          u.Phone2?.toLowerCase().includes(lower)
      );
    }

    if (selectedTemplate) {
      result = result.filter(
        (u) => getTemplateName(u.CardCode) === selectedTemplate
      );
    }

    setFilteredCustomers(result);
    setCurrentPage(1); // reset to first page when filter applied
  }, [searchTerm, selectedTemplate, customers]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentUsers = filteredCustomers.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageLayout>
      <CardLayout>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "30px",
                  fontWeight: "400",
                }}
              >
                Customer Detail
              </h3>
              <Link to="/email-template-assign">
                <button className="premium-btn premium-create">
                  <FontAwesomeIcon icon={faPlusCircle} /> Assign Customer
                  Subject
                </button>
              </Link>
            </div>
          </Col>
          <Col md={12}>
            <Row
              className="g-1 mb-3 align-items-end filter-card"
              style={{ backgroundColor: "#18596" }}
            >
              <Col md={4}>
                <label className="form-label2 fw-semibold">Search</label>
                <input
                  type="text"
                  placeholder="Search by Code, Name, Email, Phone"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={1}></Col>
              <Col md={4}>
                <label className="form-label2 fw-semibold">
                  Email Template
                </label>
                {/* Dropdown filter */}
                <select
                  className="form-control"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Filter by Template</option>
                  {[
                    ...new Set(emailTemplate.map((tpl) => tpl.TEMPLATE_NAME)),
                  ].map((templateName) => (
                    <option key={templateName} value={templateName}>
                      {templateName}
                    </option>
                  ))}
                </select>
              </Col>
              <Col md={3} className="text-end mt-0">
                <button
                  className=" premium-btn premium-filter  w-40"
                  onClick={resetFilters}
                >
                  <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
                </button>
              </Col>
            </Row>
          </Col>

          <Col md={12}>
            <Row>
              <Col md={12}>
                <div
                  className="p-2 pb-3"
                  style={{ border: "1px solid grey", borderRadius: "15px" }}
                >
                  <div className="premium-table-container">
                    <div className="premium-table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr style={{ fontSize: "14px", textAlign: "left" }}>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone 1</th>
                            <th>Phone 2</th>
                            <th>Balance</th>
                            <th>Email Template</th>
                            <th>Active</th>
                          </tr>
                        </thead>
                        <tbody className="mc-table-body">
                          {currentUsers.map((user) => (
                            <tr
                              style={{ fontSize: "12px", textAlign: "left" }}
                              key={user.CardCode}
                            >
                              <td>{user.CardCode}</td>
                              <td style={{ textAlign: "left" }}>
                                {user.CardName}
                              </td>
                              <td>{user.E_Mail}</td>
                              <td>{user.Phone1}</td>
                              <td>{user.Phone2}</td>
                              <td>{user.Balance}</td>
                              <td>{getTemplateName(user.CardCode)}</td>
                              <td>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={user.validFor === "Y"}
                                    readOnly
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {filteredCustomers.length > 0 && (
                  <Pagination
                    perPage={perPage}
                    totalUsers={filteredCustomers.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
