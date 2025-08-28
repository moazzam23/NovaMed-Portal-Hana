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
    
    export default function InventoryMove() {
        const {user}= useContext(AuthContext)
        const navigate = useNavigate();
      const [warehouseOptions, setWarehouseOptions] = useState([]);
      const [warehouseOptionsTo, setWarehouseOptionsTo] = useState([]);
      const [showItemModal, setShowItemModal] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [issueType, setIssueType] = useState([]);
    const [department, setDepartment] = useState([]);
    const [project, setProject] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
        const [nextId, setNextId] = useState(null);
    const companyDB = localStorage.getItem("companyDB");
    const User_ID = localStorage.getItem("userId");
    const itemsPerPage = 15;
    
    const [searchTerm, setSearchTerm] = useState("");

const filteredItems = items.filter(
  item =>
    item.ItemName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.ItemCode?.toLowerCase().includes(searchTerm?.toLowerCase())
);

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

    // Slice items for current page
    // const paginatedItems = items.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // );
    
    
      useEffect(() => {

        const editDocId = localStorage.getItem("EditDocId");
        const EditAPPDocId = localStorage.getItem("EditAPPDocId");
   
        
        if (editDocId) {
          getDocumentData(editDocId);
        } else if (EditAPPDocId) {
          getDocumentData(EditAPPDocId);
        }
        // fetchWarehouse();
        // fetchWarehouseTo();
        FetchProjects();
        FetchDepartments();
        FetchTransferType();
        FetchReasons();
        FetchnextDocuemntNo();
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
      


      const getDocumentData = async (docId) => {
      //   try {
      //     const res = await axios.get(`http://localhost:5000/documents/${docId}`);
      //     const doc = res.data.document;
      
      //     if (doc && doc.PAYLOAD?.StockTransferLines) {
      //       const prefilledLines = doc.PAYLOAD.StockTransferLines.map(line => ({
      //         item_code: line.ItemCode || "",
      //         item_name: "", // You can fetch item name using ItemCode if needed
      //         price: "", // Not included in payload
      //         quantity: line.Quantity || "",
      //         IssueType: line.U_Reasons || "",
      //         Department: line.DistributionRule || "",
      //         Project: line.ProjectCode || "",
      //         Employee_Name: line.U_Emp_Name || "",
      //         warehouse: line.WarehouseCode || "",
      //         warehouseTo: line.FromWarehouseCode || "",
      //       }));
      
      //       setOrderLines(prefilledLines);
      //     }
      //   } catch (error) {
      //     console.error("Failed to fetch document:", error);
      //     toast.error("Failed to load document for editing");
      //   }
      // };
      try {
        const res = await axios.get(`${BASE_URL}/documents/${docId}?CompanyDB=${companyDB}`);
        const doc = res.data.document;
        console.log(doc)
    
        const fetchedItems = await axios.get(
          `${BASE_URL}/api/Items?CompanyDB=${companyDB}`
        );
        setItems(fetchedItems.data); // optional, for selection modal reuse
    console.log(items)
        const enrichedLines = doc.PAYLOAD.StockTransferLines.map((line) => {
          const matchedItem = fetchedItems.data.find(
            (item) => item.ItemCode === line.ItemCode
          );
          return {
            item_code: line.ItemCode,
            item_name: matchedItem?.ItemName || "", // 🟡 Add ItemName here
            price: "", // or prefill from backend if available
            quantity: line.Quantity,
            IssueType: line.U_Reasons,
            Department: line.DistributionRule,
            Project: line.ProjectCode,
            Employee_Name: line.U_Emp_Name,
            warehouse: line.WarehouseCode,
            warehouseTo: line.FromWarehouseCode,
          };
        });
    
        setOrderLines(enrichedLines);
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
    
      // const handleItemSelect = (item) => {
      //   const exists = selectedItems.find(i => i.ItemCode === item.ItemCode);
      //   if (!exists) {
      //     setSelectedItems([...selectedItems, item]);
      //   }
      // };
      
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
        // setOrderLines(prev => [...prev, ...newLines]);
        setOrderLines(prev => {
          const updated = [...prev];
      
          // Check if first row is empty and use it
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
            // Replace the first row with the first new line
            updated[0] = newLines[0];
      
            // Append the rest if there are more selected items
            return [...updated, ...newLines.slice(1)];
          }
      
          // Else, append all
          return [...updated, ...newLines];
        });
        setSelectedItems([]);
        setShowItemModal(false);
      };
      
    
      const [orderLines, setOrderLines] = useState([
        { item_name: "", item_code: "", price: "", quantity: "", IssueType:"",Department:"",Project:"",Employee_Name:"", warehouse: "",warehouseTo:"" },
      ]);
    
      const handleWarehouseChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].warehouse = event.target.value;
        setOrderLines(updatedLines);
      };
      
      const handleProjectChange = (index, event) => {
        // const updatedLines = [...orderLines];
        const selectedValue = event.target.value;
        const selectedProject = project.find(p => p.value === selectedValue); // find by PrjCode

        const updatedLines = [...orderLines];
        updatedLines[index].Project = selectedValue;
        updatedLines[index].Employee_Name = selectedProject?.label || ""; 
        // updatedLines[index].Project = event.target.value;
        // updatedLines[index].Employee_Name = event.target.value;
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

      const handleWarehouseToChange = (index, event) => {
        const updatedLines = [...orderLines];
        updatedLines[index].warehouseTo = event.target.value;
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
        if (orderLines.length === 1) return; // prevent deleting the last row
        const updatedLines = orderLines.filter((_, i) => i !== index);
        setOrderLines(updatedLines);
      };
      
    
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   var res="";
      //   console.log("docu user id",User_ID)

      //   const docTypeId = "inventory"; // set document type
      //   const docNumber = `INV-${Date.now()}`; // or get from user input
      //   const docDate = new Date().toISOString();
      //   const payload = {
      //     U_Type: "General_Issuance",
      //     U_AdjType:"Inter_Company",
      //     StockTransferLines: orderLines.map(line => ({
      //       ItemCode: line.item_code, 
      //       Quantity: line.quantity,  
      //       U_Reasons:line.IssueType,
      //       ProjectCode:line.Project,
      //       U_Emp_Name:line.Employee_Name, 
      //       DistributionRule:line.Department,   
      //       WarehouseCode: "WH-15",
      //       FromWarehouseCode: "WH-14"
      //     }))
      //   };
      //   console.log(orderLines);
      //   console.log(payload);
    
      //   try {
      //     //  res = await axiosInstance.post("/InventoryTransferRequests", payload);
      //                res = await axios.post("http://localhost:5000/documents", {
      //                  docTypeId,
      //                  docNumber,
      //                  docDate,
      //                  payload,
      //                  User_ID
      //                 });
      //     toast.success("Inventory Transfer Request Created Successfully");
      //     setOrderLines([]);
        
      //     // navigate("/sales-orders");
      //   } catch (error) {
      //     console.error("Submit error:", error);
      //     if(error?.response?.data?.error){
      //     const backendError = error?.response?.data?.error?.message?.value;
      //     const fallbackMessage = error.message;
        
      //     toast.error("Request failed: " + (backendError || fallbackMessage));
      //     }
      //   }
      // };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
  const editDocId = localStorage.getItem("EditDocId");
  const editAPPDocId = localStorage.getItem("EditAPPDocId");

  for (let i = 0; i < orderLines.length; i++) {
  const line = orderLines[i];
  const missingFields = [];

  if (!line.IssueType) missingFields.push("Issue Type");
  if (!line.Employee_Name) missingFields.push("Employee Name");
  if (!line.Project) missingFields.push("Project");
  if (!line.Department) missingFields.push("Department");
  

  if (missingFields.length > 0) {
    toast.error(`Line ${i + 1}: Missing ${missingFields.join(", ")}`);
    return;
  }
}

  const isEditMode = !!editDocId || !!editAPPDocId;
  const docId = editDocId || editAPPDocId;
      
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
          if (isEditMode) {
            // PUT to appropriate endpoint
            const endpoint = editAPPDocId
              ? `${BASE_URL}/documents/${docId}/approver-edit?CompanyDB=${companyDB}`
              : `${BASE_URL}/documents/${docId}?CompanyDB=${companyDB}`;
      
            await axios.put(endpoint, {
              payload,
              docDate,
            });
      
            toast.success("Document updated successfully");
            navigate("/pending-approvals");
      
          } else {
            // POST create
            const res=await axios.post(`${BASE_URL}/documents?CompanyDB=${companyDB}`, {
              docTypeId,
              docNumber,
              docDate,
              payload,
              User_ID,
            });
            toast.success("Document Created Successfully And Is In Pending Documents" + res?.data?.message);
const docId=res?.data?.docId

            if (res.data?.Approved === true) {
              await postInventoryRequest(payload,docId);
              navigate("/inventory_request");
            }else {
              // ❗ Otherwise, go to pending-approvals
              navigate("/pending-approvals");
            }
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
          localStorage.removeItem("EditDocId");
          localStorage.removeItem("EditAPPDocId");
          // Optionally redirect
         
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
                {/* <CardLayout> */}
                <CardLayout>
              <Col md={12} className="">
                  <h3>Create Inventory Transfer Request</h3>
              </Col>
                </CardLayout>
    
                <CardLayout>
              <Col md={12}>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                 <LabelField readOnly  label="Document No"
                  type="text"
                  className="form-control"
                  value={nextId} />
                  <button
                    type="button"
                    style={{}}
                    className="btn btn-secondary m-4 "
                    onClick={addRow}
                    >
                    <FontAwesomeIcon icon={faPlus} />  Add Row
                  </button>
                      </div>
                  <Table >
                    <thead className="thead text-center ptable custom-table-header " style={{fontSize:"13px"}}  >
                      <tr >
                        <th style={{ width:"150px" ,paddingLeft:"30px"}}>Item Code</th>
                        <th style={{width:"350px" , paddingLeft:"30px"}}>Item Name</th>
                        {/* <th>Price</th> */}
                        <th style={{ width:"20px" ,paddingLeft:"10px"}} >Quantity</th>
                        <th style={{  width:"250px" ,paddingLeft:"30px"}} >Issue Type</th>
                        <th style={{ width:"220px" ,paddingLeft:"30px"}} >Department</th>
                        <th style={{ width:"250px" ,paddingLeft:"30px"}} >Project</th>
                        <th style={{ width:"250px" ,paddingLeft:"30px"}} >Employee Name</th>
                        
                        {/* <th>Warehouse From </th>
                        <th>Warehouse To </th> */}
                        <th style={{paddingLeft:"0px"}} >Action</th> 
                      </tr>
                    </thead>
                    <tbody  className=" mc-table-body table-bordered" >
                      {orderLines.map((line, index) => (
                        <tr  key={index}>
                          {/* <td>
                            <input
                              type="text"
                              name="item_code"
                              className="form-control"
                              value={line.item_code}
                              onChange={(e) => handleLineChange(index, e)}
                            
                            />
                          </td> */}
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
                          <td >
              <button
            style={{paddingLeft:"10px"}}
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
              </Col>
    
              <Col md={12}>
                  <button type="submit" className="custom3-btn">
                   CREATE REQUEST 
                  </button>
                  
                  <Link to="/viewDocuments">
                    <button
                      type="button"
                      className="customback-btn"
                      style={{
                        color: "white",
                      }}
                      >
                      BACK
                    </button>
                  </Link>
              </Col>
                      </CardLayout>
                {/* </CardLayout> */}
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
    
