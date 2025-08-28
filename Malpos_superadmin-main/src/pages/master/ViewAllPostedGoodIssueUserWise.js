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
// import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import { Link } from "react-router-dom";

// export default function ViewAllPostedGoodIssueUserWise() {
//   const companyDB = localStorage.getItem("companyDB");
//   const userId = localStorage.getItem("sapusercode");
//   const [goodIssue, setGoodIssue] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [perPage] = useState(10);
  
//     const paginate = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };

//   useEffect(() => {
//     fetchPostedGoodIssue();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 on search
//   }, [searchTerm]);

//   const filteredData = goodIssue.filter((item) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     return (
//       item.DocNum.toString().includes(lowerSearch) ||
//       item.ItemCode?.toLowerCase().includes(lowerSearch) ||
//       item.Dscription?.toLowerCase().includes(lowerSearch) ||
//       item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
//       item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
//       item.CreatedBy?.toLowerCase().includes(lowerSearch)
//     );
//   });
  

//   const fetchPostedGoodIssue = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/Posted-Good-Issue_User?CompanyDB=${companyDB}&USERCODE=${userId}`
//       );
//       const formattedData=res.data;
//       setGoodIssue(formattedData.reverse());
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Steps");
//     }
//   };

 

//   return (
//       <div>
//           <PageLayout>
//             <Row>
//               <Col md={12}>
//                 <CardLayout>
//                   <h3> Good Issue Documents</h3>
//                 </CardLayout>
//               </Col>
//               <Col md={12}>
//                 <CardLayout>
//                   <Row>
//                     <Col md={12} className={"mt0-col-2"}>
//                       <Box
//                        className={"users-btn-flex"} >
                        
//                         <Col xs={12} sm={12} md={4} lg={4}>
//                           <CustomSearch
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                           />
//                         </Col>
//                        <Col  md={2} style={{paddingLeft:"690px"}}  >
//                                       <Link to="/good-issue">
//                                                           <button className="cus-btn" style={{padding:"18px 0px",width:"150px"}}>
//                                                             {" "}
//                                                             {/* <FontAwesomeIcon icon={faPlus} />  */}
//                                                             Create Stock Issue
//                                                           </button>
//                                                         </Link>
//                                       </Col>
//                       </Box>
//                     </Col>
//                   </Row>
//                   <Col md={12}>
//                     <Box className={"client-table"}>
//                     <Table className="mc-table" responsive>
//   <thead style={{ textAlign: "center" }} className="mc-table-head primary">
//     <tr className="text-center">
//       <th>#</th>
//       <th>Document No</th>
//       <th>Item Code</th>
//       <th>Item Description</th>
//       <th>Quantity</th>
//       <th>Warehouse</th>
//       <th>Issue Type</th>
//       <th>Employee</th>
//       <th>Cost Center Type</th>
//       <th>Cost Center Code</th>
//       <th>Project</th>
//       <th>Inventory Request No</th>
//       <th>Created By</th>
//     </tr>
//   </thead>
//   <tbody className="tbody">
//   {filteredData.length === 0 ? (
//   <tr>
//     <td colSpan="13" className="text-center">
//       No Good Issue Documents
//     </td>
//   </tr>
// ) : (
//   filteredData
//     .slice((currentPage - 1) * perPage, currentPage * perPage)
//     .map((item, index) => (
//       <tr key={index}>
//         <td>{(currentPage - 1) * perPage + index + 1}</td>
//         <td>{item.DocNum}</td>
//         <td>{item.ItemCode}</td>
//         <td>{item.Dscription}</td>
//         <td>{item.Quantity}</td>
//         <td>{item.WhsCode}</td>
//         <td>{item.U_Reasons || "-"}</td>
//         <td>{item.U_Emp_Name || "-"}</td>
//         <td>{item.U_CCType || "-"}</td>
//         <td>{item.OcrCode || "-"}</td>
//         <td>{item.Project || "-"}</td>
//         <td>{item.InventoryRequestDocNum}</td>
//         <td>{item.CreatedBy}</td>
//       </tr>
//     ))
// )}
//   </tbody>
// </Table>
// <Pagination
//   perPage={perPage}
//   totalUsers={filteredData.length}
//   paginate={paginate}
//   currentPage={currentPage}
// />

//                     </Box>
//                   </Col>
//                 </CardLayout>
//               </Col>
//             </Row>
//           </PageLayout>
//           </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Box } from "../../components/elements";
// import { Col, Row, Table } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import { Link } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export default function ViewAllPostedGoodIssueUserWise() {
//   const companyDB = localStorage.getItem("companyDB");
//   const userId = localStorage.getItem("sapusercode");

//   const [goodIssue, setGoodIssue] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [perPage] = useState(10);
//   const [isLoading, setIsLoading] = useState(true);
//   const [issueTypeFilter, setIssueTypeFilter] = useState("");
//   const [costCenterFilter, setCostCenterFilter] = useState("");
//   const [projectFilter, setProjectFilter] = useState("");

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     fetchPostedGoodIssue();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, issueTypeFilter, costCenterFilter, projectFilter]);

//   const fetchPostedGoodIssue = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/Posted-Good-Issue_User?CompanyDB=${companyDB}&USERCODE=${userId}`
//       );
//       const formattedData = res.data;
//       setGoodIssue(formattedData.reverse());
//     } catch (err) {
//       toast.error("Failed to load Good Issue documents");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredData = goodIssue.filter((item) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const matchesSearch =
//       item.DocNum.toString().includes(lowerSearch) ||
//       item.ItemCode?.toLowerCase().includes(lowerSearch) ||
//       item.Dscription?.toLowerCase().includes(lowerSearch) ||
//       item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
//       item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
//       item.CreatedBy?.toLowerCase().includes(lowerSearch);

//     const matchesFilters =
//       (!issueTypeFilter || item.U_Reasons === issueTypeFilter) &&
//       (!costCenterFilter || item.OcrCode === costCenterFilter) &&
//       (!projectFilter || item.Project === projectFilter);

//     return matchesSearch && matchesFilters;
//   });

//   const uniqueValues = (key) =>
//     [...new Set(goodIssue.map((item) => item[key]).filter(Boolean))];

//   return (
//     <PageLayout>
//       <Row>
//         <Col md={12}>
//           <CardLayout>
//             <h3>Good Issue Documents</h3>
//           </CardLayout>
//         </Col>

//         <Col md={12}>
//           <CardLayout>
//             <Row className="align-items-center mb-3">
//               <Col md={3} sm={6} className="mb-2">
//                 <CustomSearch
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </Col>

//               <Col md={2} sm={6} className="mb-2">
//                 <select
//                   className="form-control"
//                   value={issueTypeFilter}
//                   onChange={(e) => setIssueTypeFilter(e.target.value)}
//                 >
//                   <option value="">All Issue Types</option>
//                   {uniqueValues("U_Reasons").map((reason, idx) => (
//                     <option key={idx} value={reason}>
//                       {reason}
//                     </option>
//                   ))}
//                 </select>
//               </Col>

//               <Col md={2} sm={6} className="mb-2">
//                 <select
//                   className="form-control"
//                   value={costCenterFilter}
//                   onChange={(e) => setCostCenterFilter(e.target.value)}
//                 >
//                   <option value="">All Cost Centers</option>
//                   {uniqueValues("OcrCode").map((code, idx) => (
//                     <option key={idx} value={code}>
//                       {code}
//                     </option>
//                   ))}
//                 </select>
//               </Col>

//               <Col md={2} sm={6} className="mb-2">
//                 <select
//                   className="form-control"
//                   value={projectFilter}
//                   onChange={(e) => setProjectFilter(e.target.value)}
//                 >
//                   <option value="">All Projects</option>
//                   {uniqueValues("Project").map((project, idx) => (
//                     <option key={idx} value={project}>
//                       {project}
//                     </option>
//                   ))}
//                 </select>
//               </Col>

//               <Col md={3} className="text-end mb-2">
//                 <Link to="/create-good-issue">
//                   <button className="custom2-btn">
//                     <FontAwesomeIcon icon={faPlus} /> Create Stock Issue
//                   </button>
//                 </Link>
//               </Col>
//             </Row>

//             <Box className="client-table">
//               <Table className="mc-table table-bordered responsive" responsive>
//                 <thead className="text-center mc-table-head primary">
//                   <tr>
//                     <th>#</th>
//                     <th>Document No</th>
//                     <th>Item Code</th>
//                     <th style={{minWidth:"210px"}}>Item Description</th>
//                     <th>Quantity</th>
//                     <th>Warehouse</th>
//                     <th>Issue Type</th>
//                     <th style={{minWidth:"180px"}}>Employee</th>
//                     <th style={{minWidth:"150px"}}>Cost Center Type</th>
//                     <th style={{minWidth:"150px"}}>Cost Center Code</th>
//                     <th style={{minWidth:"120px"}}>Project</th>
//                     <th style={{minWidth:"150px"}}>Inventory Req No</th>
//                     {/* <th>Created By</th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isLoading
//                     ? [...Array(5)].map((_, idx) => (
//                         <tr key={idx}>
//                           <td colSpan="13">
//                             <Skeleton height={25} />
//                           </td>
//                         </tr>
//                       ))
//                     : filteredData.length === 0 ? (
//                         <tr className="slide-in-right" >
//                           <td colSpan="13" className="text-center">
//                             No Good Issue Documents
//                           </td>
//                         </tr>
//                       ) : (
//                         filteredData
//                           .slice((currentPage - 1) * perPage, currentPage * perPage)
//                           .map((item, index) => (
//                             <tr key={index}>
//                               <td>{(currentPage - 1) * perPage + index + 1}</td>
//                               {/* <td>{item.U_Portal_Doc}</td> */}
//                               <td>{item.DocNum}</td>
//                               <td>{item.ItemCode}</td>
//                               <td>{item.Dscription}</td>
//                               <td>{item.Quantity}</td>
//                               <td>{item.WhsCode}</td>
//                               <td>{item.U_Reasons || "-"}</td>
//                               <td>{item.U_Emp_Name || "-"}</td>
//                               <td>{item.U_CCType || "-"}</td>
//                               <td>{item.OcrCode || "-"}</td>
//                               <td>{item.Project || "-"}</td>
//                               <td className="text-center" >{item.InventoryRequestDocNum}</td>
//                               {/* <td>{item.CreatedBy}</td> */}
//                             </tr>
//                           ))
//                       )}
//                 </tbody>
//               </Table>

//               {!isLoading && (
//                 <Pagination
//                   perPage={perPage}
//                   totalUsers={filteredData.length}
//                   paginate={paginate}
//                   currentPage={currentPage}
//                 />
//               )}
//             </Box>
//           </CardLayout>
//         </Col>
//       </Row>
//     </PageLayout>
//   );
// }


import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPlus, faEye, faCircleArrowUp, faCirclePlus, faFilePdf, faPlusCircle, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "../../components/elements";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GoodIssueModal from "../WorkFlow/GoodIssueModal";
import { generateGoodIssuePDF } from "../WorkFlow/GenerateGoodIssuePdf";

export default function ViewAllPostedGoodIssueUserWise() {
  const companyDB = localStorage.getItem("companyDB");
  const userId = localStorage.getItem("sapusercode");

  const [goodIssue, setGoodIssue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchPostedGoodIssue();
  }, []);

  const fetchPostedGoodIssue = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/Posted-Good-Issue_User?CompanyDB=${companyDB}&USERCODE=${userId}`
      );

      // Group items by DocNum so modal can show all items
      const grouped = res.data.reduce((acc, curr) => {
        if (!acc[curr.DocNum]) {
          acc[curr.DocNum] = {
            DocNum: curr.DocNum,
            U_Portal_Doc: curr.U_Portal_Doc,
            InventoryRequestDocNum: curr.InventoryRequestDocNum,
            DocDate:curr.DocDate,
            CreatedBy: curr.CreatedBy,
            items: [],
          };
        }
        acc[curr.DocNum].items.push(curr);
        return acc;
      }, {});

      setGoodIssue(Object.values(grouped).reverse());
    } catch (err) {
      toast.error("Failed to load Good Issue documents");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetFilters = () => {
  setSearchTerm("");
  setStatusFilter("All");
  setStartDate("");
  setEndDate("");
  setCurrentPage(1);
};

  // const filteredData = goodIssue.filter((doc) => {
  //   const lowerSearch = searchTerm.toLowerCase();
  //   return (
  //     doc.DocNum.toString().includes(lowerSearch) ||
  //     doc.U_Portal_Doc?.toLowerCase().includes(lowerSearch) ||
  //     doc.InventoryRequestDocNum?.toLowerCase().includes(lowerSearch) ||
  //     doc.CreatedBy?.toLowerCase().includes(lowerSearch)
  //   );
  // });
  const filteredData = goodIssue.filter((doc) => {
  const lowerSearch = searchTerm.toLowerCase();

  const matchesSearch =
    doc.DocNum.toString().includes(lowerSearch) ||
    doc.U_Portal_Doc?.toLowerCase().includes(lowerSearch) ||
    doc.InventoryRequestDocNum?.toLowerCase().includes(lowerSearch) ||
    doc.CreatedBy?.toLowerCase().includes(lowerSearch);

  // Convert DocDate to Date object for comparison
  const docDateObj = new Date(doc.DocDate);
  const matchesStart = !startDate || docDateObj >= new Date(startDate);
  const matchesEnd = !endDate || docDateObj <= new Date(endDate);

  return matchesSearch && matchesStart && matchesEnd;
});


  return (
    <PageLayout>
<CardLayout>
      <Row>
<Col md={12}>
          {/* <CardLayout> */}
            <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>

            <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Good Issue Documents</h3>
 <Link to="/create-good-issue">
  <button className="premium-btn premium-create">
    <FontAwesomeIcon icon={faPlusCircle} /> Pending Stock Issue
  </button>
</Link>
      </div>
      {/* </CardLayout> */}
        </Col>
        <Col md={12}>
            <Row className="align-items-center mb-1">
              <Col md={12} sm={6} className="mb-2">
              
                <Row className="g-1 mb-1 align-items-end filter-card">
    <Col md={3}>
      <label className="form-label2 fw-semibold">Search</label>
      <CustomSearch
        value={searchTerm}
        style={{border:"1px solid grey"}}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    </Col>
    <Col md={2}>
      <label className="form-label2 fw-semibold">From Date</label>
      <input
        type="date"
        className="form-control"
        style={{border:"1px solid grey"}}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        />
    </Col>
    <Col md={2}>
      <label className="form-label2 fw-semibold">To Date</label>
      <input
        type="date"
        className="form-control"
        style={{border:"1px solid grey"}}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        />
    </Col>
    <Col md={3}></Col>
<Col md={2}>
  <button
    className=" premium-btn premium-filter  w-40"
    onClick={resetFilters}
    >
    <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
  </button>
</Col>

  </Row>
              </Col>

              {/* <Col md={9} className="text-end ">
                <Link to="/create-good-issue">
                <button className="premium-btn premium-create">
                <FontAwesomeIcon icon={faCirclePlus} /> Pending Stock Issue
                </button>
                </Link>
                </Col> */}
            </Row>

                     <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
     
                  <tr>
                    <th style={{borderRight:"1px solid white"}} >#</th>
                    <th style={{borderRight:"1px solid white"}} >Document No</th>
                    <th style={{borderRight:"1px solid white"}}>Portal Document No</th>
                    <th style={{borderRight:"1px solid white"}}>Inventory Req No</th>
                    <th style={{borderRight:"1px solid white"}}>Doc Date</th>
                    <th style={{borderRight:"1px solid white"}}>Creator</th>
                    <th >Action</th>
                  </tr>
                </thead>
                <tbody >
                  {isLoading
                    ? [...Array(5)].map((_, idx) => (
                        <tr key={idx}>
                          <td colSpan="6">
                            <Skeleton height={25} />
                          </td>
                        </tr>
                      ))
                    : filteredData.length === 0 ? (
                      <tr>
                          <td colSpan="6" className="text-center">
                            No Good Issue Documents
                          </td>
                        </tr>
                      ) : (
                        filteredData
                        .slice((currentPage - 1) * perPage, currentPage * perPage)
                          .map((doc, index) => (
                            <tr key={index}>
                              <td>{(currentPage - 1) * perPage + index + 1}</td>
                              <td>{doc.DocNum}</td>
                              <td>{doc.U_Portal_Doc || "-"}</td>
                              <td>{doc.InventoryRequestDocNum || "-"}</td>
                                   <td>
  {new Date(doc.DocDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</td>
                              <td>{doc.CreatedBy.toUpperCase() || "-"}</td>
                              <td className="text-center ">
                                <button
                                  className="premium-btn premium-view btn-sm"
                                  onClick={() => setSelectedDoc(doc)}
                                >
                                  <FontAwesomeIcon icon={faEye} className="me-1" />
                                  View
                                </button>
                                <button
                                  className="premium-btn premium-download btn-sm ms-2"
                                  onClick={() => generateGoodIssuePDF(doc)}
                                > <FontAwesomeIcon icon={faFilePdf} />  PDF
                                </button>
                                
                              </td>
                            </tr>
                          ))
                      )}
                </tbody>
              {/* </Table> */}
</table>
</div>
                          </div>
</div>
              {!isLoading && (
                <Pagination
                  perPage={perPage}
                  totalUsers={filteredData.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            {/* </Box> */}
        </Col>
      </Row>
          </CardLayout>

      {selectedDoc && (
        <GoodIssueModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </PageLayout>
  );
}
