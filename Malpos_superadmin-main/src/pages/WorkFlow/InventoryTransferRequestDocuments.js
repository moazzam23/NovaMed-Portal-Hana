// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   faArrowRotateLeft,
//   faPlus,
//   faTrash,
//   faEdit,
//   faSquareArrowUpRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Box, Button, Text } from "../../components/elements";
// import { Col, Row, Table } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import { Link } from "react-router-dom";
// import {BASE_URL} from "../../apis/NodeApiUrl"

// export default function ViewInventoryRequestDocumentsUserWise() {
//   const companyDB = localStorage.getItem("companyDB");
//   const userId = localStorage.getItem("userId");
//   const [inventoryRequest, setInventoryRequest] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [perPage] = useState(10);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     fetchPostedGoodIssue();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 on search
//   }, [searchTerm]);

//   const FetchInventoryRequestClosed = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/INVENTORY_REQ_CLOSED_User?CompanyDB=${companyDB}&USERCODE=${userId}`
//       );
//       setInventoryRequest(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Inventory Request Documents");
//     }
//   };

//   const FetchInventoryRequestOpen = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&USERCODE=${userId}`
//       );
//       setInventoryRequest(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Inventory Request Documents");
//     }
//   };

//   const filteredData = inventoryRequest.filter((item) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     return (
//       item.DocNum.toString().includes(lowerSearch) ||
//       item.ItemCode?.toLowerCase().includes(lowerSearch) ||
//       item.Dscription?.toLowerCase().includes(lowerSearch) ||
//       item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
//       item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
//       item.U_NAME?.toLowerCase().includes(lowerSearch) ||
//       item.Project?.toLowerCase().includes(lowerSearch) ||
//       item.OcrCode?.toLowerCase().includes(lowerSearch)
//     );
//   });

//   return (
//     <div>
//       <PageLayout>
//         <Row>
//           <Col md={12}>
//             <CardLayout>
//               <h3>Inventory Request Documents</h3>
//             </CardLayout>
//           </Col>
//           <Col md={12}>
//             <CardLayout>
//               <Row>
//                 <Col md={9}>
//                   <Box className="users-btn-flex">
//                     <Col xs={12} sm={12} md={4} lg={4}>
//                       <CustomSearch
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </Col>
//                   </Box>
//                 </Col>
//               </Row>
//               <Col md={12}>
//                 <Box className="client-table">
//                   <Table className="mc-table" responsive>
//                     <thead
//                       style={{ textAlign: "center" }}
//                       className="mc-table-head primary"
//                     >
//                       <tr className="text-center">
//                         <th>#</th>
//                         <th>Document No</th>
//                         <th>Item Code</th>
//                         <th>Item Description</th>
//                         <th>Quantity</th>
//                         <th>Warehouse</th>
//                         <th>Issue Type</th>
//                         <th>Employee</th>
//                         {/* <th>Cost Center Type</th> */}
//                         <th>Cost Center</th>
//                         <th>Project</th>
//                         {/* <th>Inventory Request No</th> */}
//                         <th>Created By</th>
//                       </tr>
//                     </thead>
//                     <tbody className="tbody">
//                       {filteredData.length === 0 ? (
//                         <tr>
//                           <td colSpan="13" className="text-center">
//                             No Inventory Request Documents Found
//                           </td>
//                         </tr>
//                       ) : (
//                         filteredData
//                           .slice(
//                             (currentPage - 1) * perPage,
//                             currentPage * perPage
//                           )
//                           .map((item, index) => (
//                             <tr key={index}>
//                               <td>{(currentPage - 1) * perPage + index + 1}</td>
//                               <td>{item.DocNum}</td>
//                               <td>{item.ItemCode}</td>
//                               <td>{item.Dscription}</td>
//                               <td>{item.Quantity}</td>
//                               <td>{item.WhsCode}</td>
//                               <td>{item.U_Reasons || "-"}</td>
//                               <td>{item.U_Emp_Name || "-"}</td>
//                               {/* <td>{item.U_CCType || "-"}</td> */}
//                               <td>{item.OcrCode || "-"}</td>
//                               <td>{item.Project || "-"}</td>
//                               {/* <td>{item.InventoryRequestDocNum || "-"}</td> */}
//                               <td>{item.U_NAME || "-"}</td>
//                             </tr>
//                           ))
//                       )}
//                     </tbody>
//                   </Table>

//                   <Pagination
//                     perPage={perPage}
//                     totalUsers={filteredData.length}
//                     paginate={paginate}
//                     currentPage={currentPage}
//                   />
//                 </Box>
//               </Col>
//             </CardLayout>
//           </Col>
//         </Row>
//       </PageLayout>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   faArrowRotateLeft,
//   faPlus,
//   faTrash,
//   faEdit,
//   faSquareArrowUpRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Box, Button, Text } from "../../components/elements";
// import { Col, Row, Table } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";
// import { Pagination } from "../../components";
// import CustomSearch from "../../components/CustomSearch";
// import { Link } from "react-router-dom";
// import {BASE_URL} from "../../apis/NodeApiUrl"

// export default function InventoryTransferRequestDocuments() {
//   const companyDB = localStorage.getItem("companyDB");
//   const userId = localStorage.getItem("userId2");

//   const [inventoryRequest, setInventoryRequest] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [perPage] = useState(10);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     fetchAllInventoryRequests();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter]);

//   const fetchAllInventoryRequests = async () => {
//     try {
//       const [openRes, closedRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&usercode=${userId}`),
//         axios.get(`${BASE_URL}/api/INVENTORY_REQ_CLOSED_User?CompanyDB=${companyDB}&USERCODE=${userId}`)
//       ]);

//       // Transform open
//       const openData = openRes.data.map((item) => ({
//         DocNum: item.DocNum,
//         ItemCode: item.ItemCode,
//         Dscription: item.Dscription,
//         Quantity: item.req_qty,
//         WhsCode: item.FromWhsCod,
//         U_Reasons: item.U_Reasons,
//         U_Emp_Name: item.U_Emp_Name,
//         OcrCode: item.DistributionRule,
//         Project: item.Project,
//         U_NAME: item.Req_User,
       
//         Status: "Open"
//       }));

      // Transform closed
      // const closedData = closedRes.data.map((item) => ({
        // DocNum: item.DocNum,
        // ItemCode: item.ItemCode,
        // Dscription: item.Dscription,
        // Quantity: item.req_qty,
        // WhsCode: item.FromWhsCod,
        // U_Reasons: item.U_Reasons,
        // U_Emp_Name: item.U_Emp_Name,
        // OcrCode: item.DistributionRule,
        // Project: item.Project,
        // U_NAME: item.Req_User,
//         DocNum: item.DocNum,
//         ItemCode: item.ItemCode,
//         Dscription: item.Dscription,
//         Quantity: item.Quantity,
//         WhsCode: item.WhsCode,
//         U_Reasons: item.U_Reasons,
//         U_Emp_Name: item.U_Emp_Name,
//         OcrCode: item.OcrCode,
//         Project: item.Project,
//         U_NAME: item.U_NAME,
//         Status: "Closed"
//       }));

//       setInventoryRequest([...openData, ...closedData]);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load Inventory Request Documents");
//     }
//   };

//   const filteredData = inventoryRequest.filter((item) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const matchSearch =
//       item.DocNum.toString().includes(lowerSearch) ||
//       item.ItemCode?.toLowerCase().includes(lowerSearch) ||
//       item.Dscription?.toLowerCase().includes(lowerSearch) ||
//       item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
//       item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
//       item.U_NAME?.toLowerCase().includes(lowerSearch) ||
//       item.Project?.toLowerCase().includes(lowerSearch) ||
//       item.OcrCode?.toLowerCase().includes(lowerSearch);

//     const matchStatus =
//       statusFilter === "All" || item.Status === statusFilter;

//     return matchSearch && matchStatus;
//   });

//   return (
//     <PageLayout>
//       <Row>
//         <Col md={12}>
//           <CardLayout>
//             <h3>Inventory Request Documents</h3>
//           </CardLayout>
//         </Col>

//         <Col md={12}>
//           <CardLayout>
//             <Row className="mb-3">
//             <Col md={3}>
//                 <CustomSearch
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </Col>
//               <Col md={3} >
//                 <select
//                   className="form-control"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="All">All</option>
//                   <option value="Open">Open</option>
//                   <option value="Closed">Closed</option>
//                 </select>
//               </Col>
//              <Col  md={3} style={{marginRight:"-120px", marginLeft:"17%"}}  >
//                <Link to="/inventory">
//                                    <button className="cus-btn" style={{padding:"18px 20px"}}>
//                                      {" "}
//                                      {/* <FontAwesomeIcon icon={faPlus} />  */}
//                                      Create Inventory Request
//                                    </button>
//                                  </Link>
//                </Col>
//                <Col  md={2}   >
//                <Link to="/good-issue">
//                                    <button className="cus-btn" style={{padding:"18px 20px"}}>
//                                      {" "}
//                                      {/* <FontAwesomeIcon icon={faPlus} />  */}
//                                      Create Stock Issue
//                                    </button>
//                                  </Link>
//                </Col>
//             </Row>

//             <Box className="client-table">
//               <Table className="mc-table" responsive>
//                 <thead className="mc-table-head primary" style={{ textAlign: "center" }}>
//                   <tr className="text-center">
//                     <th>#</th>
//                     <th>Document No</th>
//                     <th>Item Code</th>
//                     <th>Item Description</th>
//                     <th>Quantity</th>
//                     <th>Warehouse</th>
//                     <th>Issue Type</th>
//                     <th>Employee</th>
//                     <th>Cost Center</th>
//                     <th>Project</th>
//                     <th>Status</th>
//                     <th>Created By</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length === 0 ? (
//                     <tr>
//                       <td colSpan="13" className="text-center">No Inventory Request Documents Found</td>
//                     </tr>
//                   ) : (
//                     filteredData
//                       .slice((currentPage - 1) * perPage, currentPage * perPage)
//                       .map((item, index) => (
//                         <tr key={index}>
//                           <td>{(currentPage - 1) * perPage + index + 1}</td>
//                           <td>{item.DocNum}</td>
//                           <td>{item.ItemCode}</td>
//                           <td>{item.Dscription}</td>
//                           <td>{item.Quantity}</td>
//                           <td>{item.WhsCode}</td>
//                           <td>{item.U_Reasons || "-"}</td>
//                           <td>{item.U_Emp_Name || "-"}</td>
//                           <td>{item.OcrCode || "-"}</td>
//                           <td>{item.Project || "-"}</td>
//                           <td>
//   <span
//     className={`badge ${
//       item.Status === "Open" ? "bg-success" : "bg-secondary"
//     }`}
//     style={{ fontSize: "0.85rem" }}
//   >
//     {item.Status}
//   </span>
// </td>

//                           <td>{item.U_NAME || "-"}</td>
//                         </tr>
//                       ))
//                   )}
//                 </tbody>
//               </Table>

//               <Pagination
//                 perPage={perPage}
//                 totalUsers={filteredData.length}
//                 paginate={paginate}
//                 currentPage={currentPage}
//               />
//             </Box>
//           </CardLayout>
//         </Col>
//       </Row>
//     </PageLayout>
//   );
// }



import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowDown,
  faArrowUp,
  faCopy,
  faEye,
  faFilePdf,
  faFilterCircleDollar,
  faFilterCircleXmark,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { BASE_URL } from "../../apis/NodeApiUrl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
   import axiosInstance from "../../apis";

import { Link, useNavigate } from "react-router-dom";
import InventoryRequestModal from "./InventoryRequestModal";
import ViewDocumentModal from "./InventoryRequestModal";
import { generatePDF } from "./generatePDF";
import { AuthContext } from "../../context/Auth";
import { sapLogin } from "../../apis/SapLogin";

export default function InventoryTransferRequestDocuments() {
  const companyDB = localStorage.getItem("companyDB");
  // const [nextId, setNextId] = useState(null);
    const User_ID = localStorage.getItem("userId");
  const [inventoryRequest, setInventoryRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedDocs, setExpandedDocs] = useState([]);
  const [perPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
const [selectedDoc, setSelectedDoc] = useState(null);
const navigate = useNavigate();
       const {user}= useContext(AuthContext)
  const handleView = (doc) => {
    setSelectedDoc(doc);
  };
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

// const applyDateFilter = () => {
//   setCurrentPage(1); // Reset pagination
// };


  const userId = localStorage.getItem("sapusercode");

  useEffect(() => {
    fetchAllInventoryRequests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const fetchAllInventoryRequests = async () => {
     setIsLoading(true);
    try {
      const [openRes, closedRes] = await Promise.all([

        axios.get(`${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&usercode=${userId}`),
        axios.get(`${BASE_URL}/api/INVENTORY_REQ_CLOSED_User?CompanyDB=${companyDB}&USERCODE=${userId}`)
      ]);
console.log("invenotry",inventoryRequest)
      const openData = openRes.data.map((item) => ({
        U_Portal_Doc:item.U_Portal_Doc,
        DocNum: item.DocNum,
        DocDate:item.DocDate,
        ItemCode: item.ItemCode,
        Dscription: item.Dscription,
        Quantity: item.req_qty,
        WhsCode: item.FromWhsCod,
        U_Reasons: item.U_Reasons,
        U_Emp_Name: item.U_Emp_Name,
        OcrCode: item.DistributionRule,
        Project: item.Project,
        U_NAME: item.Req_User,
        Status: "Open",
      }));

      const closedData = closedRes.data.map((item) => ({
         U_Portal_Doc:item.U_Portal_Doc,
        DocNum: item.DocNum,
        ItemCode: item.ItemCode,
        Dscription: item.Dscription,
        DocDate:item.DocDate,
        Quantity: item.Quantity,
        WhsCode: item.WhsCode,
        U_Reasons: item.U_Reasons,
        U_Emp_Name: item.U_Emp_Name,
        OcrCode: item.OcrCode,
        Project: item.Project,
        U_NAME: item.U_NAME,
        Status: "Closed",
      }));

const allData = [...openData, ...closedData];
// allData.sort((a, b) => Number(a.DocNum) > Number(b.DocNum)); 
console.log(allData)
setInventoryRequest(allData);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load Inventory Request Documents");
    }finally {
    setIsLoading(false);
  }
  };

  const groupedData = inventoryRequest.reduce((acc, item) => {
    const doc = acc[item.DocNum] || {
      DocNum: item.DocNum,
      Status: item.Status,
      U_Portal_Doc: item.U_Portal_Doc,
      U_NAME: item.U_NAME,
      DocDate:item.DocDate,
      items: [],
    };
    doc.items.push(item);
    acc[item.DocNum] = doc;
    return acc;
  }, {});

  const groupedList = Object.values(groupedData).sort((a, b) => Number(b.DocNum) - Number(a.DocNum)).filter((doc) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchHeader =
      doc.DocNum.toString().includes(lowerSearch) ||
      (doc.U_Portal_Doc || "").toLowerCase().includes(lowerSearch) ||
      doc.U_NAME?.toLowerCase().includes(lowerSearch) ||
      doc.Status?.toLowerCase().includes(lowerSearch);

    const matchLine = doc.items.some((item) =>
      item.ItemCode?.toLowerCase().includes(lowerSearch) ||
      item.Dscription?.toLowerCase().includes(lowerSearch) ||
      item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
      item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
      item.Project?.toLowerCase().includes(lowerSearch) ||
      item.OcrCode?.toLowerCase().includes(lowerSearch)
    );

    const matchStatus = statusFilter === "All" || doc.Status === statusFilter;

    // return (matchHeader || matchLine) && matchStatus;
      const docDateObj = new Date(doc.DocDate);
    const fromOk = !startDate || docDateObj >= new Date(startDate);
    const toOk = !endDate || docDateObj <= new Date(endDate);

    return (matchHeader || matchLine) && matchStatus && fromOk && toOk;
  });
  // });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleExpand = (docNum) => {
    setExpandedDocs((prev) =>
      prev.includes(docNum)
        ? prev.filter((d) => d !== docNum)
        : [...prev, docNum]
    );
  };
  const handleDocDuplicate = (id) => {
    localStorage.setItem("DuplicateDocId", id);
  };

 const handleDuplicate = async (doc) => {
  try {
    // Prepare payload similar to your handleSubmit POST logic
    const docTypeId = "Inventory Request";

    const matchingLines = inventoryRequest.filter(
      (line) => line.U_Portal_Doc === doc.U_Portal_Doc
    );

    const newDocNumber = await fetchNextDocNumber();
    const docDate = new Date().toISOString();
console.log("matchig", matchingLines)
    const payload = {
      U_Type: "General_Issuance",
      U_AdjType: "Inter_Company",
      U_Portal_Doc: newDocNumber,
      StockTransferLines: matchingLines.map(line => ({
        ItemCode: line.ItemCode,
        Quantity: line.req_qty || 1,
        U_Reasons: line.U_Reasons,
        ProjectCode: line.Project,
        U_Emp_Name: line.U_Emp_Name,
        DistributionRule: line.OcrCode,
        WarehouseCode: "WH-15",
        FromWarehouseCode: line.FromWhsCod || "WH-14",
      })),
    };
    console.log(payload)
    // Post to documents (create)
    const createDocRes = await axios.post(`${BASE_URL}/documents?CompanyDB=${companyDB}`, {
      docTypeId,
      docNumber: newDocNumber,
      docDate,
      payload,
      User_ID: User_ID,
    });

    toast.success("Document duplicated successfully!");

    if (createDocRes.data?.Approved === true) {
      const newDocId = createDocRes.data?.docId;

      await postInventoryRequest(payload, newDocId);

      navigate("/inventory_request");
      fetchAllInventoryRequests()
    } else {
      navigate("/pending-approvals");
    }
  } catch (error) {
    console.error("Duplicate error:", error);
    toast.error("Failed to duplicate document: " + (error?.response?.data?.error?.message?.value || error.message));
  }
};

   const postInventoryRequest = async (payload,docId) => {
        // e.preventDefault();
        var res="";
      
        try {

          const sessionid= await sapLogin(user);
          console.log(user)
           res = await axiosInstance.post("/InventoryTransferRequests", payload);
           
              const sapDocNum = res.data?.DocNum || res.data?.DocEntry;

            await axios.put(`${BASE_URL}/api/documents/update-sap-status?CompanyDB=${companyDB}`, {
      docId: docId,
      sapDocNum,
      isPostedToSAP: true
    });
          toast.success("Inventory Transfer Request Created Successfully");
          navigate("/good-issue");
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

// Helper function to fetch next doc number (using your existing FetchnextDocuemntNo logic)
const fetchNextDocNumber = async () => {
  try {
    const docType = "Inventory Request";
    const res = await axios.get(`${BASE_URL}/api/document-sequence/next/${encodeURIComponent(docType)}?companyDB=${companyDB}`);
    return res.data.documentNo;
  } catch (error) {
    console.error("Next Document No fetch error:", error);
    throw error;
  }
};

const resetFilters = () => {
  setSearchTerm("");
  setStatusFilter("All");
  setStartDate("");
  setEndDate("");
  setCurrentPage(1);
};


  return (
    <PageLayout>
          <CardLayout>
      <Row>
        <Col md={12}>
            <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>

            <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Inventory Request Documents</h3>
 <Link to="/inventory">
  <button className="premium-btn premium-create">
    <FontAwesomeIcon icon={faPlusCircle} /> Create Inventory Request
  </button>
</Link>
      </div>
      {/* </CardLayout> */}
        </Col>
        <Col md={12}>
  <Row className="g-1 mb-3 align-items-end filter-card" style={{backgroundColor:"#18596"}} >
    <Col md={4} >
      <label className="form-label2 fw-semibold">Search</label>
      <CustomSearch
        value={searchTerm}
                style={{border:"1px solid grey"}}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    </Col>
    <Col md={3} className="ms-2" >
      <label className="form-label2 fw-semibold">Status</label>
      <select
        className="form-select"
        value={statusFilter}
                style={{border:"1px solid grey"}}
        onChange={(e) => setStatusFilter(e.target.value)}
        >
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
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
  </Row>

        {/* <CardLayout> */}
          <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

            <div className="premium-table-container ">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                  <tr className="text-center">
                    <th style={{borderRight:"1px solid white"}}>Portal Document No</th>
                    <th style={{borderRight:"1px solid white"}}>SAP Document No</th>
                    <th style={{borderRight:"1px solid white"}}>Doc Date</th>
                    <th style={{borderRight:"1px solid white"}}>Created By</th>
                    <th style={{borderRight:"1px solid white"}}>Status</th>
                     <th >Action</th>
                  </tr>
                </thead>
                <tbody>
                 {isLoading ? (
                   [...Array(5)].map((_, idx) => (
                     <tr key={idx}>
        <td><Skeleton height={20} /></td>
        <td><Skeleton height={20} /></td>
        <td><Skeleton height={20} /></td>
        <td><Skeleton height={20} /></td>
      </tr>
    ))
  ) : groupedList.length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center">
        No Inventory Request Documents Found
      </td>
    </tr>
  ) : (
    groupedList
    .slice((currentPage - 1) * perPage, currentPage * perPage)
    .map((doc, index) => (
      <React.Fragment key={doc.DocNum}>
                          <tr 
                          // className="slide-in-right" style={{
                          //   animationDelay: `${index * 0.1}s`,
                          // }}
                          >
                              <td>{doc.U_Portal_Doc}</td>
                            <td>{doc.DocNum}</td>
                           <td>
  {new Date(doc.DocDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</td>

                            <td>{doc.U_NAME?.toUpperCase()}</td>
                            <td>
                              
                            <span
                className={`status-badge ${
                  doc.Status === "Open" ? "status-open" : "status-closed"
                }`} 
              >
                {doc.Status}
              </span>
                            </td>
                            <td >
                              <div style={{  display: "flex", gap: "10px",justifyContent:"center"}}>
                    <button
  className="premium-btn premium-view btn-sm"
  onClick={() => handleView(doc)}
>
  <FontAwesomeIcon icon={faEye} /> View
</button>

<button
  className="premium-btn premium-download btn-sm"
  onClick={() => generatePDF(doc)}
>
  <FontAwesomeIcon icon={faFilePdf} />  PDF
</button>
 <Link to="/Duplicate-Inventory-Request">
                         
<button
  className="premium-btn premium-duplicate btn-sm"
  onClick={() => handleDocDuplicate(doc.U_Portal_Doc)}

>
  <FontAwesomeIcon icon={faCopy} /> Duplicate
</button></Link>
                    </div>
              </td>

                          </tr>
                          {expandedDocs.includes(doc.DocNum) && (
                            <tr>
    <td colSpan="4">

      <Table className="table table-bordered" style={{ marginBottom: 0 }}>
        <thead className="mc-table-head primary text-center">
          <tr>
            <th>Item Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Warehouse</th>
            <th>Issue Type</th>
            <th>Employee</th>
            <th>Cost Center</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {doc.items.map((item, subIdx) => (
            <tr key={subIdx} className="text-center">
              <td>{item.ItemCode}</td>
              <td>{item.Dscription}</td>
              <td>{item.Quantity}</td>
              <td>{item.WhsCode}</td>
              <td>{item.U_Reasons || "-"}</td>
              <td>{item.U_Emp_Name || "-"}</td>
              <td>{item.OcrCode || "-"}</td>
              <td>{item.Project || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </td>
  </tr>
)}

                        </React.Fragment>
                      ))
                    )}
                </tbody>
               </table>
  </div>
</div>
</div>
              <Pagination
                perPage={perPage}
                totalUsers={groupedList.length}
                paginate={paginate}
                currentPage={currentPage}
                />
        </Col>
      </Row>
                </CardLayout>
   {selectedDoc && (
     <ViewDocumentModal
     doc={selectedDoc}
     onClose={() => setSelectedDoc(null)}
     />
    )}

    </PageLayout>
  );
}
