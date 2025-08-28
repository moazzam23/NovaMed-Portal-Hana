import React, { useState ,useEffect, useContext} from "react";
import { Col, Pagination, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import axiosInstance from "../../apis";
import axios from "axios";
import SelectField from "../../components/fields/SelectField";
import CustomSearch from "../../components/CustomSearch";
import { sapLogin } from "../../apis/SapLogin";
import { AuthContext } from "../../context/Auth";
import { BASE_URL } from "../../apis/NodeApiUrl";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faArrowsToCircle, faPlus, faSquareArrowUpRight, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Next } from "react-bootstrap/esm/PageItem";
import { LabelField } from "../../components/fields";
import { DrawerContext } from "../../context/Drawer";
export default function PendingGoodIssueWithModel() {
  const { drawer } = useContext(DrawerContext);
    const navigate = useNavigate();
            const {user}= useContext(AuthContext)
const [items, setItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [selectedRows, setSelectedRows] = useState([]);
const [warehouseOptions, setWarehouseOptions] = useState([]);
const [showModal, setShowModal] = useState(false);
const [requiredDate, setRequiredDate] = useState(null);
const [perPage] = useState(10);
const [modalErrorMessage, setModalErrorMessage] = useState(""); // For modal-level error
const [searchDocNum, setSearchDocNum] = useState("");
const [isGeneratingGoodIssue, setIsGeneratingGoodIssue] = useState(false);
const [isGeneratingPurchaseRequest, setIsGeneratingPurchaseRequest] = useState(false);
const [activeDocModal, setActiveDocModal] = useState(null); // stores docNum being viewed
  const [docDate, setDocDate] = useState("");
const [docTime, setDocTime] = useState("");


useEffect(() => {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // yyyy-mm-dd
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  setDocDate(dateStr);
  setDocTime(timeStr);
}, []);

const User_ID = localStorage.getItem("userId");
  const userId = localStorage.getItem("sapusercode");
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

   
const companyDB = localStorage.getItem("companyDB");

const itemsPerPage = 10;

const [searchTerm, setSearchTerm] = useState("");

const filteredItems = items.filter(
item =>
item.ItemName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
item.ItemCode?.toLowerCase().includes(searchTerm?.toLowerCase())
);

const handleCheckboxChange = (index) => {
const isSelected = selectedRows.includes(index);
if (isSelected) {
  setSelectedRows(selectedRows.filter((i) => i !== index));
} else {
  setSelectedRows([...selectedRows, index]);
}
};

const paginatedItems = filteredItems.slice(
(currentPage - 1) * itemsPerPage,
currentPage * itemsPerPage
);

useEffect(()=>{
fetchGoodRequestIssueDocuments();
fetchWarehouse();
FetchnextDocuemntNo();
},[])

const handleWarehouseChange = async (index, selected) => {
  const updated = [...goodIssue];
  const line = updated[index];

  line.warehouse = selected.target.value;

  try {
    const res = await axios.get(`http://localhost:5000/api/Instockquantity?CompanyDB=${companyDB}&ItemCode=${line.item_code}&WhsCode=${selected.target.value}`);
    const stockData = res.data[0] || {};
    console.log(stockData)
    console.log(res)
    line.WarehouseStock = stockData["WareHouse stock"] || 0;
    line.TotalInStock = stockData["Total in stock"] || 0;
  } catch (error) {
    console.error("Error updating stock on warehouse change:", error);
    line.WarehouseStock = 0;
    line.TotalInStock = 0;
  }

  setGoodIssue(updated);
};


 const [columnOrder, setColumnOrder] = useState([
    "select",
    "itemCode",
    "itemName",
    "warehouse",
    "warehouseStock",
    "inStock",
    "reqQty",
    "issuedQty",
    "remainingQty",
    "enteredQty",
    "project",
    "department",
    "issueType",
    "empName",
    "prReqQty",
    "prReqDoc"
  ]);

  // Column definitions
  const columns = {
    select: { label: "Select", width: "40px" },
    itemCode: { label: "Item Code", width: "110px" },
    itemName: { label: "Item Name", width: "320px" },
    warehouse: { label: "Warehouse", width: "180px" },
    warehouseStock: { label: "Warehouse Stock", width: "156px" },
    inStock: { label: "In Stock", width: "80px" },
    reqQty: { label: "Req Qty", width: "80px" },
    issuedQty: { label: "Issued Qty", width: "80px" },
    remainingQty: { label: "Remaining Qty", width: "130px" },
    enteredQty: { label: "Entered Qty", width: "100px" },
    project: { label: "Project", width: "120px" },
    department: { label: "Department", width: "100px" },
    issueType: { label: "Issue Type", width: "160px" },
    empName: { label: "Emp Name", width: "190px" },
    prReqQty: { label: "PR Req Qty", width: "100px" },
    prReqDoc: { label: "PR Req Doc", width: "100px" }
  };

  // Handle column reordering
  const handleColumnDrag = (draggedId, newPosition) => {
    const currentPosition = columnOrder.indexOf(draggedId);
    const newOrder = [...columnOrder];
    
    // Remove from current position
    newOrder.splice(currentPosition, 1);
    // Insert at new position
    newOrder.splice(newPosition, 0, draggedId);
    
    setColumnOrder(newOrder);
  };
const [goodIssue, setGoodIssue] = useState([
    { item_name: "", item_code: "",DocEntry:"",doc_num:"", requiredqty: "",PurchaseReqQty:"",PurchaseReqDocNUM:"", Req_User:"", warehouse: "",TotalInStock: "",WarehouseStock: "",issuedqty:"",remainingqty:"",ConfirmedQty:"" },
  ]);

  const handleLineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLines = [...goodIssue];
  
    if (name === "ConfirmedQty") {
      const remaining = parseFloat(updatedLines[index].remainingqty);
      const inputQty = parseFloat(value);

      if (inputQty > remaining) {
        // toast.error("Confirmed quantity cannot exceed remaining quantity");
        setModalErrorMessage("Confirmed quantity cannot exceed remaining quantity")
        return;
      }
      setModalErrorMessage("")
    }
  
    updatedLines[index][name] = value;
    setGoodIssue(updatedLines);
  };
  
  const fetchGoodRequestIssueDocuments = async () => {
   
    try {
      const res = await  axios.get(`${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&usercode=${userId}`)
       
      
const rawData = res.data;
console.log(rawData);

const withStock = await Promise.all(
  rawData.map(async (item) => {
    try {
      const stockRes = await axios.get(`http://localhost:5000/api/Instockquantity?CompanyDB=${companyDB}&ItemCode=${item.ItemCode}&WhsCode=${item.FromWhsCod}`);
    
      const stockData = stockRes.data[0] || {}; // handle empty result
      const rawDate = item.DocDate.split(" ")[0]; // "2025-05-24"
      const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        item_name: item.Dscription,
        item_code: item.ItemCode,
        DocEntry: item.DocEntry,
        doc_num: item.DocNum,
        U_Portal_Doc:item.U_Portal_Doc,
        doc_date: formattedDate,
        project:item?.Project,
        department:item?.DistributionRule,
        reason:item?.U_Reasons,
        EmployeeName:item?.U_Emp_Name,
        requiredqty: item.req_qty,
        Req_User:item.Req_User,
        warehouse: item.FromWhsCod,
        issuedqty: item.Issued_qty,
        remainingqty: item.R_qty,
        PurchaseReqDocNUM: localStorage.getItem(`PurchaseReqDocNUM_${item.ItemCode}`) || "",
        ConfirmedQty: "",
        PurchaseReqQty:"",
        WarehouseStock: stockData["WareHouse stock"] || 0,
        TotalInStock: stockData["Total in stock"] || 0,
      };
    } catch (error) {
      console.error("Error fetching stock for item:", item.ItemCode, error);
      return {
        ...item,
        WarehouseStock: 0,
        TotalInStock: 0,
        ConfirmedQty: "",
      };
    }
  })
);

setGoodIssue(withStock.reverse());
    } catch (error) {
      console.log("Stock Request Issue Documents fetch error:", error);
    }
  };
  const fetchWarehouse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/warehouse?CompanyDB=${companyDB}`);
      const formattedData = res.data.map((wh) => ({
        label: wh.WhsCode+"  -  "+wh.WhsName,
        value: wh.WhsCode,
      }));
      setWarehouseOptions(formattedData);
    } catch (error) {
      console.log("Warehouse fetch error:", error);
    }
  };

  // PurchaseRequests
  const handleGenerateRequestClick = (e) => {
    e.preventDefault();
  
    if (selectedRows.length === 0) {
          setModalErrorMessage("Please select at least one row");
      // toast.warn("Please select at least one row.");
      return;
    }
      const selectedLines = selectedRows.map(index => goodIssue[index]); 
const invalidLine = selectedLines.find(
  line => !line.PurchaseReqQty || parseFloat(line.PurchaseReqQty) <= 0
);

if (invalidLine) {
  setModalErrorMessage("Purchase Quantity is required and must be greater than zero.");
      //  setIsGeneratingPurchaseRequest(false);
  return;
}
    setActiveDocModal(null);
    setShowModal(true); // Show modal to get requiredDate
    setModalErrorMessage("");
  };
  
  const GeneratePurhaseRequest = async (e) => {
    e.preventDefault();
  
    if (selectedRows.length === 0) {
        setModalErrorMessage("Purchase Quantity is required and must be greater than zero.");
      // toast.warn("Please select at least one row.");
      return;
    }
     setIsGeneratingPurchaseRequest(true);
     setModalErrorMessage("")
  
    const selectedLines = selectedRows.map(index => goodIssue[index]); 
  // const selectedLines = selectedRows.map(index => goodIssue[index]);

    try {
      const payload = {
       RequriedDate: requiredDate,
        DocumentLines: selectedLines.map(line => ({
          ItemCode: line.item_code,
          Quantity: line.PurchaseReqQty,

        }))
      };
      const sessionid= await sapLogin(user);
     const res=   await axiosInstance.post("/PurchaseRequests", payload);

     const generatedDocNum = res.data.DocNum;

     const updatedGoodIssue = goodIssue.map((item, index) => {
       if (selectedRows.includes(index)) {
         localStorage.setItem(`PurchaseReqDocNUM_${item.item_code}`, generatedDocNum); // Step 2: Store in localStorage
         return {
           ...item,
           PurchaseReqDocNUM: generatedDocNum
         };
       }
       return item;
     });
 
     setGoodIssue(updatedGoodIssue);
 
     toast.success(`Purchase Request ${generatedDocNum} created successfully!`);
 
     setSelectedRows([]);
     setShowModal(false);
     setRequiredDate(null);
     setActiveDocModal(null);
     fetchGoodRequestIssueDocuments();
      
      setSelectedRows([]); 
      setShowModal(false); 
    setRequiredDate(null); 
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create Purchase Request",error);
      setActiveDocModal(null);
           setSelectedRows([]);
    }
    finally {
    setIsGeneratingPurchaseRequest(false); 
         setSelectedRows([]);// stop loading
  }
  };
const [draggingColumn, setDraggingColumn] = useState(null);
const [dragOverColumn, setDragOverColumn] = useState(null);
const [nextId, setNextId] = useState(null);
  const FetchnextDocuemntNo = async () => {
        try {
           const docType = "Good Issue";
    const res = await axios.get(`${BASE_URL}/api/document-sequence/next/${encodeURIComponent(docType)}?companyDB=${companyDB}`);
     setNextId(res.data.documentNo)
        } catch (error) {
          console.log("Next Document No fetch error:", error);
        }
      };
const GenerateGoodIssueDocument = async (e) => {
  e.preventDefault();

  if (selectedRows.length === 0) {
    setModalErrorMessage("Please select at least one row.");
    return;
  }

  

  setIsGeneratingGoodIssue(true);
  setModalErrorMessage("");

  const selectedLines = selectedRows.map(index => goodIssue[index]);

  // Check all selected lines for invalid ConfirmedQty
const hasInvalidQty = selectedLines.some(line => {
  return !line.ConfirmedQty || parseFloat(line.ConfirmedQty) <= 0;
});

if (hasInvalidQty) {
  setModalErrorMessage("Confirmed Quantity is required and must be greater than zero.");
  setIsGeneratingGoodIssue(false);
  return;
}
 setModalErrorMessage("");

  const groupedByDocNum = selectedLines.reduce((groups, line) => {
    const docNum = line.doc_num;
    if (!groups[docNum]) {
      groups[docNum] = [];
    }
    groups[docNum].push(line);
    return groups;
  }, {});

  try {
    for (const docNum in groupedByDocNum) {
      const lines = groupedByDocNum[docNum];

      // Step 1: Construct local document payload
      const docDate = new Date().toISOString();
      const docTypeId = "Good Issue";
      const docNumber = nextId; // or your own doc ID generator

      const payload = {
        U_Type: "Good_Issue",
        U_Portal_Doc: nextId,
        U_AdjType: "Inter_Company", // optional
        StockTransferLines: lines.map(line => ({
          ItemCode: line.item_code,
          ItemDescription: line.item_name,
          Quantity: line.ConfirmedQty,
          AccountCode: "A20301002",
          WarehouseCode: line.warehouse,
          U_Reasons: line.reason,
          ProjectCode: line.project,
          CostingCode: line.department,
          U_Emp_Name: line.EmployeeName,
          U_CCType: "Admin"
        }))
      };

      // Step 2: POST to local documents table
      const docRes = await axios.post(`${BASE_URL}/documents?CompanyDB=${companyDB}`, {
        docTypeId,
        docNumber,
        docDate,
        payload,
        User_ID: User_ID,
      });

      toast.success(`Local document ${docNumber} created successfully.`);

      const docId = docRes?.data?.docId;

      // Step 3: If approved immediately, post to SAP
      if (docRes.data?.Approved === true) {
        const sessionid = await sapLogin(user);
        const sapPayload = {
          Reference2: docNum,
          U_Portal_Doc: nextId,
          DocumentLines: payload.StockTransferLines
        };
      const res=  await axiosInstance.post("/InventoryGenExits", sapPayload);
       
        const sapDocNum = res.data?.DocNum || res.data?.DocEntry;

            await axios.put(`${BASE_URL}/api/documents/update-sap-Issue-status?CompanyDB=${companyDB}`, {
      docId: docId,
      sapDocNum,
      isPostedToSAP: true
    });
        toast.success(`SAP Good Issue posted for ${docNumber}`);
      }
      // Step 4: Close if all items processed
      const response = await axios.get(`${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&usercode=${userId}`);
      const updatedPendingIssues = response.data;
      console.log(updatedPendingIssues)

      const docStillExists = updatedPendingIssues.some(issue => String(issue.DocNum) === String(docNum));
      console.log(docStillExists);
      console.log(docNum)
      if (!docStillExists) {
        // const docEntry = lines.find(line => line.doc_num === docNum)?.DocEntry;
const docEntry = lines.find(line => String(line.doc_num) === String(docNum))?.DocEntry;

        if (docEntry) {
          await CloseInventoryRequestDoc(docEntry);
          // toast.success(`Document ${docNum} fully processed and closed.`);
        }
      } else {
        // console.log(`Document ${docNum} still has pending items - not closing`);
      }
    }
    
    fetchGoodRequestIssueDocuments();
    setActiveDocModal(null);
    setSelectedRows([]);
  } catch (error) {
    console.error("Submission error:", error);
//     await axios.put(`${BASE_URL}/api/documents/update-sap-Issue-status?CompanyDB=${companyDB}`, {
// docId: docId,
// sapDocNum: null,
// isPostedToSAP: false
// });
    const backendError = error?.response?.data?.error?.message?.value;
    const fallbackMessage = error.message;
    toast.error("Request failed: " + (backendError || fallbackMessage));
    setActiveDocModal(null);
    setSelectedRows([]);
  } finally {
    setIsGeneratingGoodIssue(false);
         setSelectedRows([]);
  }
};
 
const CloseInventoryRequestDoc = async (DocEntry) => {
    try {
      console.log("docentryinsats",DocEntry)
      const sessionid= await sapLogin(user);
      const res = await axiosInstance.post(`/InventoryTransferRequests(${DocEntry})/Close`);
      toast.success("Good Issue Created  And Request Is Close Successfully");
    
    } catch (error) {
      
      console.error("Submit error:", error);
      toast.error("Failed to close document",error);
    }
  };
  
  const groupedData = goodIssue.reduce((acc, item) => {
    const docNum = item.doc_num;
    if (!acc[docNum]) {
      acc[docNum] = [];
    }
    acc[docNum].push(item);
    return acc;
  }, {});

  const [expandedDocs, setExpandedDocs] = useState([]);
const toggleDoc = (docNum) => {
setExpandedDocs(prev =>
prev.includes(docNum)
  ? prev.filter(d => d !== docNum)
  : [...prev, docNum]
);
};

const filteredGroupedData = Object.entries(groupedData).filter(
  ([docNum, items]) =>
    docNum.toLowerCase().includes(searchDocNum.toLowerCase())
);


  return (
              <>
    {/* <PageLayout> */}
      <CardLayout>
      <form onSubmit={GenerateGoodIssueDocument}>
        <Row>
          <Col md={12} className="mb-4">
              <h3>Create Pending Good Issue</h3>
              
          </Col>
          <Col md={3}>
  <CustomSearch
    placeholder="Search Document No"
    value={searchDocNum}
    
    onChange={(e) => setSearchDocNum(e.target.value)}
  />
</Col>


          <Col md={12}>
          {/* <Table size="sm mc-table" style={{  width: "100%" }}>
  <thead className="mc-table-head primary"  > */}
   <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>
             <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
    <tr className="text-center primary  " style={{  fontSize: "12px" }}>
      <th className="th" style={{ width: "40px",textAlign:"center" }}></th>
      <th className="th" style={{ width: "100px",textAlign:"center" }}>Portal Doc Num</th>
      
      <th className="th" style={{ width: "100px",textAlign:"center" }}>Doc Num</th>
      <th style={{ width: "120px" ,textAlign:"center"}}>Requested Date</th>
      <th style={{ width: "150px",textAlign:"center" }}>Requested By</th>
      <th style={{ width: "100px",textAlign:"center" }}>Doc Status</th>
    </tr>
  </thead>
  <tbody className="mc-table-body " >
    {Object.entries(groupedData)
    .filter(([docNum]) =>
      docNum.toLowerCase().includes(searchDocNum.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a[1][0]?.doc_date || 0);
      const dateB = new Date(b[1][0]?.doc_date || 0);
      return dateB - dateA;
    })
    .map(([docNum, items]) => {
      const firstLine = groupedData[docNum][0];
      return (
        <React.Fragment key={docNum}>
          <tr  >
            <td
              // onClick={() => toggleDoc(docNum)}
              onClick={() => setActiveDocModal(docNum)}
              style={{ cursor: "pointer", fontWeight: "900", fontSize: "18px", textAlign:"center" }}
            >
              {/* {expandedDocs.includes(docNum) ? "−" : "+"} */}
              {/* {activeDocModal === docNum ? "−" : "+"} */}
                            {activeDocModal === docNum ? <FontAwesomeIcon icon={faSquareCaretRight }/> : <FontAwesomeIcon icon={faSquareArrowUpRight } color="#18596a" />}


            </td>
            <td style={{textAlign:"center"}}>{firstLine?.U_Portal_Doc}</td>
            <td style={{textAlign:"center"}}>{docNum}</td>
            <td className="even" style={{textAlign:"center"}} >{firstLine?.doc_date || "—"}</td>
            <td style={{textAlign:"center"}}>{firstLine?.Req_User.toUpperCase()}</td>
            <td style={{textAlign:"center"}}> 
              <span className="mc-table-badge green" style={{ fontSize: "13px" }}>
                <i className="bi bi-check-circle-fill me-1 "></i> OPEN
              </span>
            </td>
          </tr>
{expandedDocs.includes(docNum) && (
        <tr>
          <td colSpan={5}>
            <div style={{ overflowX: 'auto' }}>
              <Table size="sm" style={{ minWidth: "1300px" }}>
                <thead className="mc-table-head primary">
                  <tr className="text-center" style={{ fontSize: "12px", fontWeight: "bold" }}>

{columnOrder.map((columnId, index) => (
  <th
    key={columnId}
    className="table-head-th"
    style={{
      minWidth: columns[columnId].width,
      fontSize: "10px",
      cursor: "move",
      userSelect: "none",
      position: "relative",
      backgroundColor: 
        draggingColumn === columnId ? "#f0f0f0" :
        dragOverColumn === columnId ? "#e0e0e0" : "inherit",
      transition: "background-color 0.2s ease"
    }}
    draggable
    onDragStart={() => setDraggingColumn(columnId)}
    onDragOver={(e) => {
      e.preventDefault();
      if (columnId !== draggingColumn) {
        setDragOverColumn(columnId);
      }
    }}
    onDragLeave={() => setDragOverColumn(null)}
    onDrop={(e) => {
      e.preventDefault();
      if (draggingColumn && draggingColumn !== columnId) {
        const newOrder = [...columnOrder];
        const fromIndex = newOrder.indexOf(draggingColumn);
        const toIndex = newOrder.indexOf(columnId);
        
        // Remove from current position
        newOrder.splice(fromIndex, 1);
        // Insert at new position
        newOrder.splice(toIndex, 0, draggingColumn);
        
        setColumnOrder(newOrder);
      }
      setDragOverColumn(null);
      setDraggingColumn(null);
    }}
    onDragEnd={() => {
      setDragOverColumn(null);
      setDraggingColumn(null);
    }}
  >
    {columns[columnId].label}
    {dragOverColumn === columnId && (
      <div style={{
        position: "absolute",
        top: 0,
        [draggingColumn && columnOrder.indexOf(draggingColumn) > columnOrder.indexOf(columnId) ? 'left' : 'right']: 0,
        height: "100%",
        width: "2px",
        backgroundColor: "#F07632"
      }} />
    )}
  </th>
))}
                  </tr>
                </thead>
                <tbody>
                  {groupedData[docNum].map((line, index) => {
                    const globalIndex = goodIssue.findIndex((g) => g === line);
                    return (
                      <tr key={index} style={{ fontSize: "12px" }}>
                        {columnOrder.map(columnId => {
                          switch (columnId) {
                            case "select":
                              return (
                                <td key={columnId} className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(globalIndex)}
                                    onChange={() => handleCheckboxChange(globalIndex)}
                                  />
                                </td>
                              );
                            case "itemCode":
                              return <td key={columnId}>{line.item_code}</td>;
                            case "itemName":
                              return <td key={columnId}>{line.item_name}</td>;
                            case "warehouse":
                              return (
                                <td key={columnId}>
                                  <SelectField
                                    options={warehouseOptions}
                                    value={line.warehouse}
                                    name="warehouse"
                                    onChange={(selected) => handleWarehouseChange(globalIndex, selected)}
                                    style={{ fontSize: "12px", marginTop: "-18px" }}
                                  />
                                </td>
                              );
                            case "warehouseStock":
                              return <td key={columnId}>{Number(line.WarehouseStock).toFixed(2)}</td>;
                            case "inStock":
                              return <td key={columnId}>{Number(line.TotalInStock).toFixed(2)}</td>;
                            case "project":
                              return <td key={columnId}>{line.project}</td>;
                            case "department":
                              return <td key={columnId}>{line.department}</td>;
                            case "issueType":
                              return <td key={columnId}>{line.reason}</td>;
                            case "empName":
                              return <td key={columnId}>{line.EmployeeName}</td>;
                            case "reqQty":
                              return <td key={columnId} className="text-center">{Number(line.requiredqty).toFixed(2)}</td>;
                            case "issuedQty":
                              return <td key={columnId} className="text-center">{Number(line.issuedqty).toFixed(2)}</td>;
                            case "remainingQty":
                              return <td key={columnId} className="text-center">{Number(line.remainingqty).toFixed(2)}</td>;
                            case "enteredQty":
                              return (
                                <td key={columnId}>
                                  <input
                                    type="number"
                                    name="ConfirmedQty"
                                    className="form-control form-control-sm"
                                    value={line.ConfirmedQty}
                                    onChange={(e) => handleLineChange(globalIndex, e)}
                                  />
                                </td>
                              );
                            case "prReqQty":
                              return (
                                <td key={columnId}>
                                  <input
                                    type="number"
                                    name="PurchaseReqQty"
                                    className="form-control form-control-sm"
                                    value={line.PurchaseReqQty}
                                    onChange={(e) => handleLineChange(globalIndex, e)}
                                  />
                                </td>
                              );
                            case "prReqDoc":
                              return <td key={columnId} className="text-center">{line.PurchaseReqDocNUM || "—"}</td>;
                            default:
                              return null;
                          }
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </td>
        </tr>
      )}

        </React.Fragment>
      );
    })}
  </tbody>

{/* </Table> */}
</table></div>
</div></div> 
          </Col>
          

          <Col md={12}>
               </Col>
        </Row>
      </form>
         
            </CardLayout>
{/* </PageLayout> */}
      {showModal && (
  <div className="modal-backdrop"  style={{ opacity: "1" ,background: "rgba(75, 70, 70, 0.66)"}}>
    <div className="modal-content p-4" style={{ backgroundColor: 'white', borderRadius: '8px', width: '300px', margin: '200px auto' }}>
      <h5>Select Required Date</h5>
      <input
      style={{margin:"20px 0"}}
        type="date"
        className="form-control"
        value={requiredDate || ""}
        onChange={(e) => setRequiredDate(e.target.value)}
        />
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
        {/* <button className="btn btn-success" onClick={GeneratePurhaseRequest}>Confirm</button> */}
     <button className="btn btn-success" onClick={GeneratePurhaseRequest} disabled={isGeneratingPurchaseRequest}>
  {isGeneratingPurchaseRequest ? "Generating..." : "Confirm"}
</button>

      </div>
    </div>
  </div>
)}


{activeDocModal && (
  <div
  style={{
        position: "fixed",
        top: 83,
          left: drawer ? 270 : 0, 
    width: drawer ? "84%" : "100%",
        // left: 270,
        // width: "84%",
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
      <button
        className="btn btn-sm btn-danger"
        style={{ position: "absolute", top: 10, right: 10 }}
onClick={() => {
  setActiveDocModal(null);
  setSelectedRows([]);
}}

      >
        Close
      </button>

      <h2 style={{fontWeight:"400",fontSize:"35px", textAlign:"left"}}>Create Good Issue</h2>
      {modalErrorMessage && (
        <div className="alert alert-danger py-3 px-2 mt-3 " style={{ fontSize: "13px" ,fontWeight:"600"}}>
          {modalErrorMessage}
        </div>
      )}

      
                <Row className="mt-4">
      
        <Col md={12}>
      <div className="main-doc"> <FontAwesomeIcon icon={faPlus}/>  Document Information </div>
      </Col>
        </Row>
      <Row style={{padding:"50px 30px 15px 30px"}}>
<div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Portal Document No:
    </label>
    <input
      type="text"
      value={nextId || ""}
      readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Inventory Req No:
    </label>
    <input
      type="text"
value={goodIssue.length > 0 ? goodIssue[0].doc_num : ""}
      readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Total Req Qty:
    </label>
    <input
      type="text"
     value={
  groupedData[activeDocModal]
    ? groupedData[activeDocModal]
        .reduce((sum, line) => sum + (Number(line.requiredqty) || 0), 0)
        .toFixed(2)
    : "0.00"
}

       readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

          </Row>

      <Row style={{padding:"10px 30px"}}>
<div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "90px" }}>
       Doc Date:
    </label>
    <input
      type="date"
      value={docDate || ""}
      onChange={(e) => setDocDate(e.target.value)} 
      // readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "105px" }}>
      Time:
    </label>
    <input
      type="text"
      value={docTime || ""}
      readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "50px" }}>
      Creator:
    </label>
    <input
      type="text"
      value={goodIssue.length > 0 ? goodIssue[0].Req_User.toUpperCase() : ""}
      // value={goodIssue.Req_User || ""}
      readOnly
      style={{
        width: "40%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
          </Row>
                <Row style={{padding:"15px 30px 10px 30px"}}>
                  
<div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "105px" }}>
      Status:
    </label>
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "12px",
        background: "#d4edda",
        color: "#155724",
        fontWeight: "bold",
        fontSize: "0.9rem",
      }}
    >
      Pending
    </span>
  </div>
          </Row>
<hr style={{paddingBottom:"20px"}} />

<h3 style={{fontFamily:"cursive",padding:"0px 50px 20px 0px"}} >Item Details</h3>
         <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
          <thead className="mc-table-head primary" style={{ height: "30px" }}>
            <tr className="text-center" style={{ fontSize: "10px", fontWeight: "bold" }}>
              {columnOrder.map((columnId) => (
                <th
                  key={columnId}
                  className="table-head-th"
                  style={{ minWidth: columns[columnId].width, fontSize: "13px",borderRight:"1px solid white"  }}
                >
                  {columns[columnId].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupedData[activeDocModal]?.map((line, index) => {
              const globalIndex = goodIssue.findIndex((g) => g === line);
              return (
                <tr key={index} style={{ fontSize: "12px", fontWeight: "500" }}>
                  {columnOrder.map((columnId) => {
                    switch (columnId) {
                      case "select":
                        return (
                          <td key={columnId} className="text-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(globalIndex)}
                              onChange={() => handleCheckboxChange(globalIndex)}
                            />
                          </td>
                        );
                      case "itemCode":
                        return <td style={{borderRight:"1px solid white"}}  key={columnId}>{line.item_code}</td>;
                      case "itemName":
                        return <td style={{textAlign:"left"}} key={columnId}>{line.item_name}</td>;
                      case "warehouse":
                        return (
                          <td key={columnId}>
                            <SelectField
                              options={warehouseOptions}
                              value={line.warehouse}
                              name="warehouse"
                              onChange={(selected) => handleWarehouseChange(globalIndex, selected)}
                              style={{ fontSize: "12px", marginTop: "-18px" }}
                            />
                          </td>
                        );
                      case "warehouseStock":
                        return <td key={columnId}>{Number(line.WarehouseStock).toFixed(2)}</td>;
                      case "inStock":
                        return <td  key={columnId}>{Number(line.TotalInStock).toFixed(2)}</td>;
                        case "reqQty":
                          return <td key={columnId}>{Number(line.requiredqty).toFixed(2)}</td>;
                          case "issuedQty":
                            return <td key={columnId}>{Number(line.issuedqty).toFixed(2)}</td>;
                            case "remainingQty":
                              return <td key={columnId}>{Number(line.remainingqty).toFixed(2)}</td>;
                              case "enteredQty":
                                return (
                                  <td key={columnId}>
                            <input
                              type="number"
                              name="ConfirmedQty"
                              className="form-control form-control-sm"
                              value={line.ConfirmedQty}
                              onChange={(e) => handleLineChange(globalIndex, e)}
                            />
                          </td>
                        );
                        case "project":
                          return <td key={columnId}>{line.project}</td>;
                        case "department":
                          return <td key={columnId}>{line.department}</td>;
                        case "issueType":
                          return <td key={columnId}>{line.reason}</td>;
                        case "empName":
                          return <td key={columnId}>{line.EmployeeName}</td>;
                      case "prReqQty":
                        return (
                          <td key={columnId}>
                            <input
                              type="number"
                              name="PurchaseReqQty"
                              className="form-control form-control-sm"
                              value={line.PurchaseReqQty}
                              onChange={(e) => handleLineChange(globalIndex, e)}
                            />
                          </td>
                        );
                      case "prReqDoc":
                        return <td key={columnId}>{line.PurchaseReqDocNUM || "—"}</td>;
                      default:
                        return null;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        {/* </Table> */}
        </table>
        </div></div>      


      {/* Fixed Button Section */}
      <div className="d-flex justify-content-end gap-3 mt-3" style={{ paddingTop: "10px" }}>
        <button
          className="btn btn-success"
          onClick={GenerateGoodIssueDocument}
          disabled={isGeneratingGoodIssue}
          >
          {isGeneratingGoodIssue ? "Generating..." : "Generate Good Issue"}
        </button>

        <button
          className="btn btn-primary"
          onClick={handleGenerateRequestClick}
          disabled={isGeneratingPurchaseRequest}
          >
          {isGeneratingPurchaseRequest ? "Generating..." : "Generate Purchase Request"}
        </button>
      </div>
    </div>
    </div>
)}


</>
  );
}

