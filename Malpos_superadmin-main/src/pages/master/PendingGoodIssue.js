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
export default function PendingGoodIssue() {
    const navigate = useNavigate();
            const {user}= useContext(AuthContext)
const [items, setItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [selectedRows, setSelectedRows] = useState([]);
const [warehouseOptions, setWarehouseOptions] = useState([]);
const [showModal, setShowModal] = useState(false);
const [requiredDate, setRequiredDate] = useState(null);
const [perPage] = useState(10);
const [searchDocNum, setSearchDocNum] = useState("");
const [isGeneratingGoodIssue, setIsGeneratingGoodIssue] = useState(false);
const [isGeneratingPurchaseRequest, setIsGeneratingPurchaseRequest] = useState(false);


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
    "project",
    "department",
    "issueType",
    "empName",
    "reqQty",
    "issuedQty",
    "remainingQty",
    "enteredQty",
    "prReqQty",
    "prReqDoc"
  ]);

  // Column definitions
  const columns = {
    select: { label: "Select", width: "40px" },
    itemCode: { label: "Item Code", width: "110px" },
    itemName: { label: "Item Name", width: "280px" },
    warehouse: { label: "Warehouse", width: "180px" },
    warehouseStock: { label: "Warehouse Stock", width: "80px" },
    inStock: { label: "In Stock", width: "80px" },
    project: { label: "Project", width: "120px" },
    department: { label: "Department", width: "100px" },
    issueType: { label: "Issue Type", width: "160px" },
    empName: { label: "Emp Name", width: "160px" },
    reqQty: { label: "Req Qty", width: "80px" },
    issuedQty: { label: "Issued Qty", width: "80px" },
    remainingQty: { label: "Remaining Qty", width: "100px" },
    enteredQty: { label: "Entered Qty", width: "100px" },
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
        toast.error("Confirmed quantity cannot exceed remaining quantity");
        return;
      }
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
      toast.warn("Please select at least one row.");
      return;
    }
  
    setShowModal(true); // Show modal to get requiredDate
  };
  
  const GeneratePurhaseRequest = async (e) => {
    e.preventDefault();
  
    if (selectedRows.length === 0) {
      toast.warn("Please select at least one row.");
      return;
    }
     setIsGeneratingPurchaseRequest(true);
  
    const selectedLines = selectedRows.map(index => goodIssue[index]); 
  
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
     fetchGoodRequestIssueDocuments();
      
      setSelectedRows([]); 
      setShowModal(false); 
    setRequiredDate(null); 
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create Purchase Request",error);
    }
    finally {
    setIsGeneratingPurchaseRequest(false); // stop loading
  }
  };
const [draggingColumn, setDraggingColumn] = useState(null);
const [dragOverColumn, setDragOverColumn] = useState(null);

const GenerateGoodIssueDocument = async (e) => {
    e.preventDefault();
  
    if (selectedRows.length === 0) {
      toast.warn("Please select at least one row.");
      return;
    }
  setIsGeneratingGoodIssue(true);
    const selectedLines = selectedRows.map(index => goodIssue[index]);
  
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
  
        const payload = {
          Reference2: docNum,
          DocumentLines: lines.map(line => ({
            ItemCode: line.item_code,
            ItemDescription: line.item_name,
            Quantity: line.ConfirmedQty,
            AccountCode: "A20301002",
            WarehouseCode: line.warehouse,
            U_Reasons: line.reason,
           ProjectCode:line.project,
           CostingCode:line.department,
          U_Emp_Name:line.EmployeeName,
          U_CCType:"Admin"
          }))
        };
        const sessionid= await sapLogin(user);
        await axiosInstance.post("/InventoryGenExits", payload);

        // console.log("good issue",goodIssue)
// const allLinesForDocNum = goodIssue.filter(line => line.doc_num === docNum);
//   const allLinesSelected = allLinesForDocNum.every(line =>
//     selectedLines.includes(line)
//   );
  
//   console.log(allLinesForDocNum)
//   if (allLinesSelected) {
//     const docEntry = lines[0].DocEntry;
//     await CloseInventoryRequestDoc(docEntry);
//   }      
// }
 
 const response = await axios.get(`${BASE_URL}/api/pendinggoodissue_user?CompanyDB=${companyDB}&usercode=${userId}`);
    const updatedPendingIssues = response.data;

    // Check if the original docNum still exists in pending issues
    const docNumsToClose = [...new Set(selectedLines.map(line => line.doc_num))];
    
    for (const docNum of docNumsToClose) {
      const docStillExists = updatedPendingIssues.some(issue => issue.DocNum === docNum);
      
      if (!docStillExists) {
        // Find the DocEntry from selectedLines (since doc is fully processed)
        const docEntry = selectedLines.find(line => line.doc_num === docNum)?.DocEntry;
        if (docEntry) {
          await CloseInventoryRequestDoc(docEntry);
          toast.success(`Document ${docNum} fully processed and closed.`);
        }
      } else {
        console.log(`Document ${docNum} still has pending items - not closing`);
      }
    }

    // Update local state with fresh data
    // setGoodIssue(updatedPendingIssues);
    fetchGoodRequestIssueDocuments();
    toast.success("Processing completed!");
    // setSelectedRows([])
  
  }
} catch (error) {
      console.error("Submission error:", error);
     if(error?.response?.data?.error){
               const backendError = error?.response?.data?.error?.message?.value;
               const fallbackMessage = error.message;
             
               toast.error("Request failed: " + (backendError || fallbackMessage));
               }
               
    }finally {
    setIsGeneratingGoodIssue(false); // stop loading
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
    <PageLayout>
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
      <th className="th" style={{ width: "40px" }}></th>
      <th className="th" style={{ width: "100px" }}>Doc Num</th>
      <th style={{ width: "120px" }}>Requested Date</th>
      <th style={{ width: "150px" }}>Requested By</th>
      <th style={{ width: "100px" }}>Doc Status</th>
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
              onClick={() => toggleDoc(docNum)}
              style={{ cursor: "pointer", fontWeight: "900", fontSize: "18px" }}
            >
              {expandedDocs.includes(docNum) ? "−" : "+"}
            </td>
            <td>{docNum}</td>
            <td className="even">{firstLine?.doc_date || "—"}</td>
            <td>{firstLine?.Req_User}</td>
            <td>
              <span className="mc-table-badge green" style={{ fontSize: "13px" }}>
                <i className="bi bi-check-circle-fill me-1"></i> OPEN
              </span>
            </td>
          </tr>
{/* {expandedDocs.includes(docNum) && (
  <tr>
    <td colSpan={5}>
      <div style={{ overflowX: 'auto' }}>
        <Table size="sm" style={{ minWidth: "1300px" }}>
          <thead className="mc-table-head primary" >
            <tr className="text-center" style={{ fontSize: "12px", fontWeight: "bold" }}>
              <th className="table-head-th" style={{fontSize:"10px"}} >Select</th>
              <th className="table-head-th" style={{ minWidth: "110px" ,fontSize:"10px"}}>Item Code</th>
              <th  style={{ minWidth: "280px",fontSize:"10px" }}>Item Name</th>
              <th  style={{ minWidth: "180px",fontSize:"10px" }}>Warehouse</th>
              <th className="table-head-th" style={{fontSize:"10px"}} >Warehouse Stock</th>
              <th className="table-head-th" style={{fontSize:"10px"}} >In Stock</th>
              <th style={{fontSize:"10px", minWidth:"120px"}}>Project</th>
              <th className="table-head-th"style={{fontSize:"10px"}}>Department</th>
              <th  style={{ minWidth:"160px", fontSize:"10px"}}>Issue Type</th>
              <th  style={{minWidth:"160px", fontSize:"10px"}}>Emp Name</th>
              <th className="table-head-th" style={{fontSize:"10px"}}>Req Qty</th>
              <th className="table-head-th" style={{fontSize:"10px"}}>Issued Qty</th>
              <th className="table-head-th" style={{fontSize:"10px"}}>Remaining Qty</th>
              <th className="table-head-th" style={{fontSize:"10px"}}>Entered Qty</th>
              <th className="table-head-th" style={{fontSize:"10px"}} >PR Req Qty</th>
              <th  style={{minWidth:"100px",fontSize:"10px"}}>PR Req Doc</th>
            </tr>
          </thead>
          <tbody>
            {groupedData[docNum].map((line, index) => {
              const globalIndex = goodIssue.findIndex((g) => g === line);
              return (
                <tr key={index} style={{ fontSize: "12px" }}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(globalIndex)}
                      onChange={() => handleCheckboxChange(globalIndex)}
                    />
                  </td>
                  <td>{line.item_code}</td>
                  <td  >{line.item_name}</td>
                  <td >
                    <SelectField
                      options={warehouseOptions}
                      value={line.warehouse}
                      name="warehouse"
                      onChange={(selected) => handleWarehouseChange(globalIndex, selected)}
                      style={{ fontSize: "12px", marginTop: "-18px" }}
                    />
                  </td>
                  <td>{Number(line.WarehouseStock).toFixed(2)}</td>
                  <td>{Number(line.TotalInStock).toFixed(2)}</td>
                  <td>{line.project}</td>
                  <td>{line.department}</td>
                  <td>{line.reason}</td>
                  <td>{line.EmployeeName}</td>
                  <td className="text-center" >{Number(line.requiredqty).toFixed(2)}</td>
                  <td className="text-center" >{Number(line.issuedqty).toFixed(2)}</td>
                  <td className="text-center" >{Number(line.remainingqty).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      name="ConfirmedQty"
                      className="form-control form-control-sm"
                      value={line.ConfirmedQty}
                      onChange={(e) => handleLineChange(globalIndex, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="PurchaseReqQty"
                      className="form-control form-control-sm"
                      value={line.PurchaseReqQty}
                      onChange={(e) => handleLineChange(globalIndex, e)}
                    />
                  </td>
                  <td className="text-center" >{line.PurchaseReqDocNUM || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </td>
  </tr>
)} */}
{expandedDocs.includes(docNum) && (
        <tr>
          <td colSpan={5}>
            <div style={{ overflowX: 'auto' }}>
              <Table size="sm" style={{ minWidth: "1300px" }}>
                <thead className="mc-table-head primary">
                  <tr className="text-center" style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {/* {columnOrder.map((columnId, index) => (
                      <Draggable
                        key={columnId}
                        axis="x"
                        defaultPosition={{ x: 0, y: 0 }}
                        position={null}
                        onStop={(e, data) => {
                          // Calculate new position based on drag distance
                          const approxNewPosition = Math.round(data.x / parseInt(columns[columnId].width));
                          const newPosition = Math.max(0, Math.min(columnOrder.length - 1, index + approxNewPosition));
                          if (newPosition !== index) {
                            handleColumnDrag(columnId, newPosition);
                          }
                        }}
                      >
                        <th 
                          className="table-head-th" 
                          style={{ 
                            width: columns[columnId].width,
                            fontSize: "10px",
                            cursor: "move",
                            userSelect: "none"
                          }}
                        >
                          {columns[columnId].label}
                        </th>
                      </Draggable>
                    ))} */}
                    {/* // Update the Draggable component in your expanded table section */}
{/* {columnOrder.map((columnId, index) => (
  <Draggable
    key={columnId}
    axis="x"
    bounds="parent"
    defaultPosition={{ x: 0, y: 0 }}
    position={null}
    onDrag={(e, data) => {
      // Highlight the column being dragged
      e.target.style.backgroundColor = "#f0f0f0";
    }}
    onStop={(e, data) => {
      // Reset highlight
      e.target.style.backgroundColor = "";
      
      // Calculate new position based on mouse movement
      const columnWidth = parseInt(columns[columnId].width);
      const dragDistance = data.x;
      const columnsMoved = Math.round(dragDistance / columnWidth);
      
      // Calculate new position with bounds checking
      const newPosition = Math.max(
        0, 
        Math.min(columnOrder.length - 1, index + columnsMoved)
      );
      
      if (newPosition !== index) {
        handleColumnDrag(columnId, newPosition);
      }
    }}
  >
    <th 
      className="table-head-th" 
      style={{ 
        minWidth: columns[columnId].width,
        fontSize: "10px",
        cursor: "move",
        userSelect: "none",
        position: "relative", // Add this for proper dragging
        zIndex: 1000, // Ensure header appears above other elements during drag
        backgroundColor: "inherit" // Reset background
      }}
    >
      {columns[columnId].label}
    </th>
  </Draggable>
))} */}

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
 </table>
</div>
</div></div>          </Col>
          

          <Col md={12}>
              {/* <button type="submit" className="cus-btn">
                Generate Good Issue 
              </button>
              <button onClick={handleGenerateRequestClick} className="cus-btn">
                                 Generate Purchase Request
                                </button> */}
              <button type="submit" className="cus-btn" disabled={isGeneratingGoodIssue}>
  {isGeneratingGoodIssue ? "Generating..." : "Generate Good Issue"}
</button>

<button
  onClick={handleGenerateRequestClick}
  className="cus-btn"
  disabled={isGeneratingPurchaseRequest}
>
  {isGeneratingPurchaseRequest ? "Generating..." : "Generate Purchase Request"}
</button>

              <Link to="/sales-orders">
                <button
                  type="button"
                  className="cus-btn-bor"
                  style={{
                    backgroundColor: "#F07632",
                    color: "white",
                    borderColor: "#F07632",
                  }}
                >
                  Back
                </button>
              </Link>
          </Col>
        </Row>
      </form>
         
            </CardLayout>
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

    </PageLayout>
  );
}

