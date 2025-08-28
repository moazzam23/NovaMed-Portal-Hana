    import React, { useState ,useEffect, useContext} from "react";
    import { Col, Row, Table } from "react-bootstrap";
    import { toast } from "react-toastify";
    import { Link, useNavigate } from "react-router-dom";
    import PageLayout from "../../layouts/PageLayout";
    import { CardLayout } from "../../components/cards";
    import { LabelField } from "../../components/fields";
    import axiosInstance from "../../apis";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import {
      faCircleArrowLeft,
      faCirclePlus,
      faPlus,
      faTrash,
    } from "@fortawesome/free-solid-svg-icons";
    import axios from "axios";
    import { MultiSelect } from "react-multi-select-component";
    import MultiSelectField from "../../components/fields/MultiSelectField";
    import SelectField from "../../components/fields/SelectField";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { sapLogin } from "../../apis/SapLogin";
import { AuthContext } from "../../context/Auth";
import { Label } from "../../components/elements";
    
    export default function InventoryMoveDuplicate() {
        const {user}= useContext(AuthContext)
        const navigate = useNavigate();
      const [showItemModal, setShowItemModal] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [issueType, setIssueType] = useState([]);
    const [department, setDepartment] = useState([]);
              const [warehouseOptions, setWarehouseOptions] = useState([]);
              const [warehouseOptionsTo, setWarehouseOptionsTo] = useState([]);
    const [project, setProject] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
        const [nextId, setNextId] = useState(null);
    const companyDB = localStorage.getItem("companyDB");
    const User_ID = localStorage.getItem("userId");
    const itemsPerPage = 15;
    const [docDate, setDocDate] = useState("");
const [docTime, setDocTime] = useState("");

const [documentId, setDocumentID] = useState("");

useEffect(() => {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // yyyy-mm-dd
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  setDocDate(dateStr);
  setDocTime(timeStr);
}, []);

    
    const [searchTerm, setSearchTerm] = useState("");

const filteredItems = items.filter(
  item =>
    item.ItemName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.ItemCode?.toLowerCase().includes(searchTerm?.toLowerCase())
);


const fetchWarehouse = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/warehouse?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.WhsName,
            value: wh.WhsCode,
          }));
          setWarehouseOptions(formattedData);
        } catch (error) {
          console.log("Warehouse fetch error:", error);
        }
      };
      
      const fetchWarehouseTo = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/warehouse?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.WhsName,
            value: wh.WhsCode,
          }));
          setWarehouseOptionsTo(formattedData);
        } catch (error) {
          console.log("WarehouseTo fetch error:", error);
        }
      };
    
       const handleWarehouseChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].warehouse = event.target.value;
        setOrderLines(updatedLines);
      };

       const handleWarehouseToChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].warehouseTo = event.target.value;
        setOrderLines(updatedLines);
      };


const paginatedItems = filteredItems.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handleItemSelect = (item) => {
  const exists = selectedItems.find(i => i.ItemCode === item.ItemCode);
  if (exists) {
    setSelectedItems(selectedItems.filter(i => i.ItemCode !== item.ItemCode));
  } else {
    setSelectedItems([...selectedItems, item]);
  }
};

const isSelected = (item) => {
  return selectedItems.some(i => i.ItemCode === item.ItemCode);
};

    
    
      useEffect(() => {

        const DuplicateDocId = localStorage.getItem("DuplicateDocId");
                const editDocId = localStorage.getItem("EditDocId");
   
        
      //   if (DuplicateDocId) {
      //     getDocumentData(DuplicateDocId);
      //   }
      // else if(editDocId){
      //             getDocumentData(editDocId);
      // }

       if (DuplicateDocId) {
    // New mode — load data but keep nextId as next available number
    getDocumentData(DuplicateDocId, { isDuplicate: true });
  } else if (editDocId) {
    // Edit mode — load data and set nextId to existing DOC_NUMBER
    getDocumentData(editDocId, { isDuplicate: false });
  } 
 fetchWarehouse();
        fetchWarehouseTo();
        FetchProjects();
        FetchDepartments();
        FetchTransferType();
        FetchReasons();
        // FetchnextDocuemntNo();
      }, []);
     
      const FetchProjects = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/projects?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.PrjName,
            value: wh.PrjCode,
          }));
          setProject(formattedData);
        } catch (error) {
          console.log("Warehouse fetch error:", error);
        }
      };
      
      const FetchDepartments = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/departments?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.PrcName,
            value: wh.PrcCode,
          }));
          setDepartment(formattedData);
        } catch (error) {
          console.log("Warehouse fetch error:", error);
        }
      };

      
      const FetchnextDocuemntNo = async () => {
        try {
           const docType = "Inventory Request";
    const res = await axios.get(`${BASE_URL}/api/document-sequence/next/${encodeURIComponent(docType)}?companyDB=${companyDB}`);
     setNextId(res.data.documentNo)
        } catch (error) {
          console.log("Next Document No fetch error:", error);
        }
      };
      


      const getDocumentData = async (docId,options = { isDuplicate: false }) => {
      try {
        const res = await axios.get(`${BASE_URL}/documents/PortalNum/${docId}?CompanyDB=${companyDB}`);
        const doc = res.data.document;
        console.log(doc)
    setDocumentID(doc.DOC_ID)
        const fetchedItems = await axios.get(
          `${BASE_URL}/api/Items?CompanyDB=${companyDB}`
        );
        setItems(fetchedItems.data); 
    console.log(items)
        const enrichedLines = doc.PAYLOAD.StockTransferLines.map((line) => {
          const matchedItem = fetchedItems.data.find(
            (item) => item.ItemCode === line.ItemCode
          );
          return {
            item_code: line.ItemCode,
            item_name: matchedItem?.ItemName || "", 
            price: "", 
            quantity: line.Quantity,
            IssueType: line.U_Reasons,
            Department: line.DistributionRule,
            Project: line.ProjectCode,
            Employee_Name: line.U_Emp_Name,
            warehouse: line.WarehouseCode,
            warehouseTo: line.FromWarehouseCode,
          };
        });
    // setNextId(fetchedItems.data.DOC_NUMBER)
    setOrderLines(enrichedLines)
      if (options.isDuplicate) {
      // New mode: fetch next doc number to avoid duplicate document numbers
      FetchnextDocuemntNo();
    } else {
      // Edit mode: keep the existing DOC_NUMBER for editing
      setNextId(doc.DOC_NUMBER);
    }
      } catch (error) {
        console.error("Error loading document for edit:", error);
        toast.error("Failed to load document for edit");
      }
    };



      const FetchTransferType = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/TransferType?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.FldValue,
            value: wh.FldValue,
          }));
          setIssueType(formattedData);
        } catch (error) {
          console.log("Warehouse fetch error:", error);
        }
      };

      const FetchReasons = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/Reason?CompanyDB=${companyDB}`);
          const formattedData = res.data.map((wh) => ({
            label: wh.FldValue,
            value: wh.FldValue,
          }));
          setEmployeeName(formattedData);
        } catch (error) {
          console.log("Warehouse fetch error:", error);
        }
      };


      

      const fetchItems = async () => {
        console.log("db",companyDB)
        try {
          const res = await axios.get(`${BASE_URL}/api/Items?CompanyDB=${companyDB}`);
        
          setItems(res.data);
          setShowItemModal(true);
        } catch (error) {
          console.log("Item fetch error:", error);
        }
      };
    
      const handleItemConfirm = () => {
        const newLines = selectedItems.map(item => ({
          item_code: item.ItemCode,
          item_name: item.ItemName,
          price: "",
          quantity: "1",
          IssueType:"",
          Department:"",
          Project:"",
          Employee_Name:"",
          warehouse: "",
          warehouseTo:""
        }));
        setOrderLines(prev => {
          const updated = [...prev];
      
          if (
            updated.length === 1 &&
            !updated[0].item_code &&
            !updated[0].item_name &&
            !updated[0].quantity &&
            !updated[0].IssueType &&
            !updated[0].Department &&
            !updated[0].Project &&
            !updated[0].Employee_Name &&
            !updated[0].warehouse &&
            !updated[0].warehouseTo
          ) {
           
            updated[0] = newLines[0];
      
            return [...updated, ...newLines.slice(1)];
          }
          return [...updated, ...newLines];
        });
        setSelectedItems([]);
        setShowItemModal(false);
      };
      
    
      const [orderLines, setOrderLines] = useState([
        { item_name: "", item_code: "", price: "", quantity: "", IssueType:"",Department:"",Project:"",Employee_Name:"", warehouse: "",warehouseTo:"" },
      ]);
    
     
      
      const handleProjectChange = (index, event) => {
        const selectedValue = event.target.value;
        const selectedProject = project.find(p => p.value === selectedValue); // find by PrjCode

        const updatedLines = [...orderLines];
        updatedLines[index].Project = selectedValue;
        updatedLines[index].Employee_Name = selectedProject?.label || ""; 
           setOrderLines(updatedLines);
      };

      const handleDepartmentChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].Department = event.target.value;
        setOrderLines(updatedLines);
      };

      const handleIssueTyepChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].IssueType = event.target.value;
        setOrderLines(updatedLines);
      };

      
    
      const handleLineChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLines = [...orderLines];
        updatedLines[index][name] = value;
        setOrderLines(updatedLines);
      };
    
      const addRow = () => {
        setOrderLines([
          ...orderLines,
          { item_name: "", item_code: "", price: "", quantity: "", IssueType:"",Department:"",Project:"",Employee_Name:"", warehouse: "" ,warehouseTo:"" },
        ]);
      };
    
      const deleteRow = (index) => {
        if (orderLines.length === 1) return; 
        const updatedLines = orderLines.filter((_, i) => i !== index);
        setOrderLines(updatedLines);
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();

  for (let i = 0; i < orderLines.length; i++) {
  const line = orderLines[i];
  const missingFields = [];

  if (!line.IssueType) missingFields.push("Issue Type");
  // if (!line.Employee_Name) missingFields.push("Employee Name");
  // if (!line.Project) missingFields.push("Project");
  if (!line.Department) missingFields.push("Department");
  

  if (missingFields.length > 0) {
    toast.error(`Line ${i + 1}: Missing ${missingFields.join(", ")}`);
    return;
  }
}

        const docTypeId = "Inventory Request";
        const docNumber = nextId;
        const docDate = new Date().toISOString();
      
        const payload = {
          U_Type: "General_Issuance",
          U_AdjType: "Inter_Company",
          U_Portal_Doc: nextId,  
          StockTransferLines: orderLines.map((line) => ({
            ItemCode: line.item_code,
            Quantity: line.quantity,
            U_Reasons: line.IssueType,
            ProjectCode: line.Project,
            U_Emp_Name: line.Employee_Name,
            DistributionRule: line.Department,
            WarehouseCode: line.warehouse || "WH-15",
            FromWarehouseCode: line.warehouseTo || "WH-14",
          })),
        };
      
        try {
          
          // if (isEditMode) {
            // PUT to appropriate endpoint
    //         const endpoint = `${BASE_URL}/documents/${documentId}?CompanyDB=${companyDB}`;
    // const res=  await axios.put(endpoint, {
    //           payload,
    //           docDate,
    //         });
            // POST create
            const res=await axios.post(`${BASE_URL}/documents?CompanyDB=${companyDB}`, {
              docTypeId,
              docNumber,
              docDate,
              payload,
              User_ID,
            });
            toast.success("Document Updated Successfully" + res?.data?.message);
const docId=res?.data?.docId

            if (res.data?.Approved === true) {
              await postInventoryRequest(payload,docId);
              navigate("/inventory_request");
            }else {
              navigate("/pending-approvals");
            
          }
      
          // Clear form
          setOrderLines([
            {
              item_name: "",
              item_code: "",
              price: "",
              quantity: "",
              IssueType: "",
              Department: "",
              Project: "",
              Employee_Name: "",
              warehouse: "",
              warehouseTo: "",
            },
          ]);
         
        } catch (error) {
          console.error("Submit error:", error);
          const backendError = error?.response?.data?.error?.message?.value;
          const fallbackMessage = error.message;
          toast.error("Request failed: " + (backendError || fallbackMessage));
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
      

      return (
        <PageLayout>
          <form onSubmit={handleSubmit}>
            <Row>
                <CardLayout>
              <Col md={12} style={{marginBottom:"70px"}} >
                  <h2 style={{textAlign:"center"}}>Create Inventory Transfer Request</h2>
              </Col>
              <Col md={12}>
<Row className="mb-3">
  {/* <Col md={1} className="d-none d-md-block"></Col> */}
<Col md={12}>
<div className="main-doc"> <FontAwesomeIcon icon={faPlus}/> Document Information </div>
</Col>
  {/* Document No */}
  <Col xs={12} md={4} className="mb-2 d-flex flex-wrap align-items-center gap-2">
    <Label className="mb-0">
      <strong>Document No:</strong>
    </Label>
    <LabelField
      readOnly
      style={{ flex: "1" }}
      type="text"
      className="form-control"
      value={nextId}
    />
  </Col>

  {/* Date */}

  <Col xs={12} md={4} className="mb-2 d-flex flex-wrap align-items-center gap-2">
    <Label style={{marginRight:"25px" }} className="mb-0">
      <strong>Date:</strong>
    </Label>
    <LabelField
      // readOnly
      style={{ flex: "1" }}
      type="date"
      className="form-control"
      value={docDate}
      onChange={(e) => setDocDate(e.target.value)} 
    />
  </Col>
   <Col xs={12} md={3} className="mb-2 d-flex flex-wrap align-items-center gap-2">
    <Label style={{marginRight:"25px" }} className="mb-0">
      <strong>Time:</strong>
    </Label>
    <LabelField
      readOnly
      style={{ flex: "1" }}
      type="text"
      className="form-control"
      value={docTime}
    />
  </Col>
</Row>

  <Row>
    <Col md={4} style={{ display: "flex", gap: "10px"}}>
      <Label style={{marginTop:"10px"}}><strong>Creator:</strong> </Label>
  
      <LabelField
        readOnly
        type="text"
                style={{marginLeft:"45px"}}
        className="form-control"
        value={user?.NAME || "Unknown"}
      />
    </Col>
    <Col md={4} style={{ display: "flex", gap: "10px"}}>
      <Label style={{marginTop:"5px"}}><strong>Status:</strong> </Label>
  
      <span
      style={{
        display: "inline-block",
        padding: "6px 15px",
        borderRadius: "12px",
        background: "#d4edda",
        color: "#155724",
        fontWeight: "bold",
        fontSize: "0.9rem",
      }}
    >
      Open
    </span>
    </Col>
  </Row>
<hr style={{height:"3px",marginTop:"30px" }}/>
  <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
    <h4  >Item Details</h4>
    <button
      type="button"
      className="premium-btn premium-filter"
      onClick={addRow}
    >
      <FontAwesomeIcon icon={faPlus} /> Add Row
    </button>
  </div>
            <div className="premium-table-container" style={{overflowX:"auto"}}>
            <Table responsive bordered hover className="premium-table align-middle text-center"    style={{ tableLayout: "fixed", minWidth: "2100px" }}>
                <thead className=" " style={{fontSize:"13px"}}  >
                      <tr >
                        <th style={{ width:"150px" ,paddingLeft:"30px"}}>Item Code</th>
                        <th style={{width:"350px" , paddingLeft:"30px"}}>Item Name</th>
                        <th style={{ width:"100px" ,paddingLeft:"10px"}} >Quantity</th>
                        <th style={{  width:"250px" ,paddingLeft:"30px"}} >Issue Type</th>
                        <th style={{ width:"220px" ,paddingLeft:"30px"}} >Department</th>
                        <th style={{ width:"250px" ,paddingLeft:"30px"}} >Project</th>
                        <th style={{ width:"250px" ,paddingLeft:"30px"}} >Employee Name</th>
                                                                    <th style={{ width:"200px" ,paddingLeft:"30px"}}>Warehouse From </th>
                        <th style={{ width:"200px" ,paddingLeft:"30px"}}>Warehouse To </th>
                        <th style={{paddingLeft:"10px",textAlign:"center"}} >Action</th> 
                      </tr>
                    </thead>
                    <tbody  className=" mc-table-body table-bordered" >
                      {orderLines.map((line, index) => (
                        <tr  key={index}>
                         
                          <td>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          name="item_code"
          className="form-control"
          value={line.item_code}
          readOnly
          style={{  cursor: "pointer",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          onClick={fetchItems}
        />
        <FontAwesomeIcon
          icon={faPlus}
          onClick={fetchItems}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#007bff",
            cursor: "pointer",
            zIndex: 1,
          }}
        />
      </div>
    </td>
    
                          <td  >
                            <input
                              type="text"
                              name="item_name" 
                              className="form-control"
                              value={line.item_name}
                              style={{fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                              onChange={(e) => handleLineChange(index, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control"
                              value={line.quantity}
                              onChange={(e) => handleLineChange(index, e)}
                            />
                          </td>
                          <td>
                          <SelectField
                               options={employeeName}
                               value={line.IssueType}
                               name="IssueType"
                              //  className="form-control"
                               style={{marginTop:"-18px",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                               onChange={(selected) => handleIssueTyepChange(index, selected)}
                            />
                          </td>
                          <td>
                          <SelectField
                               options={department}
                               value={line.Department}
                               name="Department"
                               style={{marginTop:"-18px",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                               onChange={(selected) => handleDepartmentChange(index, selected)}
                            />
                          </td>
                          <td>
                          <SelectField
                               options={project}
                               value={line.Project}
                               name="Project"
                               style={{marginTop:"-18px",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                               onChange={(selected) => handleProjectChange(index, selected)}
                            />
                          </td>
                          <td>
                           <input
                           type="text"
                           name="Employee_Name"
                           className="form-control"
                           style={{fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                           value={line.Employee_Name}
                           onChange={(e) => handleLineChange(index, e)}
                         />
                          </td>
                          <td>
                                                      <SelectField
                                                         options={warehouseOptions}
                                                         value={line.warehouse}
                                                         name="warehouse"
                                                         style={{marginTop:"-18px",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                                                         onChange={(selected) => handleWarehouseChange(index, selected)}
                                                      />
                                                    </td>
                                                     <td>
                                                      <SelectField
                                                         options={warehouseOptionsTo}
                                                         value={line.warehouseTo}
                                                         name="warehouseTo"
                                                         style={{marginTop:"-18px",fontSize:"14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                                                         onChange={(selected) => handleWarehouseToChange(index, selected)}
                                                      />
                                                    </td>
                          <td >
              <button
            style={{paddingLeft:"0px",fontSize:"17px"}}
                type="button"
                // className="btn"
                onClick={() => deleteRow(index)}
                disabled={orderLines.length === 1}
              >
                <FontAwesomeIcon
                                                        icon={faTrash}
                                                        color="red"
                                                      />
              </button>
            </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  </div>
              </Col>
    
              <Col md={12} style={{paddingTop:"20px"}} >
                  <button type="submit" className="premium-btn premium-create">
                 <FontAwesomeIcon icon={faCirclePlus}/>  CREATE REQUEST 
                  </button>
                  
                  <Link to="/inventory_request" style={{paddingLeft:"20px"}}>
                    <button
                      type="button"
                      className="premium-btn premium-filter"
                      style={{
                        color: "white",
                      }}
                      >
                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                      BACK
                    </button>
                  </Link>
              </Col>
                </CardLayout>
            </Row>
          </form>
        
{showItemModal && (
  <div className="modal-backdrop show" style={{ opacity: "1" }}>
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        zIndex: 1050,
      }}
    >
      <div
        className="container-fluid h-100 d-flex justify-content-center align-items-center"
      >
        <div
          className="modal-content w-100"
          style={{
            maxWidth: "95%",
            height: "95%",
            backgroundColor: "#fff",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="modal-header text-white">
            <h5 className="modal-title">Select Items</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={handleItemConfirm}
              >
                Add Selected Items
              </button>
              <button
                type="button"
                className="btn-close btn-close-dark"
                onClick={() => setShowItemModal(false)}
              ></button>
            </div>
          </div>

          <div className="modal-body p-3" style={{ overflowY: "auto" }}>
            <input
              type="text"
              placeholder="Search item code or name..."
              className="form-control mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Table striped bordered hover responsive size="sm">
              <thead className="text-center">
                <tr>
                  <th>Select</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={isSelected(item)}
                        onChange={() => handleItemSelect(item)}
                      />
                    </td>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="modal-footer justify-content-between">
            <div>
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                 style={{color:"black"}}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                style={{color:"black"}}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * itemsPerPage >= filteredItems.length}
              >
                Next
              </button>
            </div>
            <span className="text-muted">
              Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </PageLayout>
      );
    }
    
