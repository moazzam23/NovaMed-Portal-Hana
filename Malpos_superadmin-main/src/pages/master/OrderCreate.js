import React, { useState ,useEffect} from "react";
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

export default function OrderCreate() {
  const navigate = useNavigate();
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [CustomerData, SetcustomerData] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
const [items, setItems] = useState([]);
const [selectedItems, setSelectedItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [showCustomerModal, setShowCustomerModal] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [customerSearchTerm, setCustomerSearchTerm] = useState("");
const [CustomercurrentPage, setCustomerCurrentPage] = useState(1);
const pageSize = 10; // change to 10 if needed

const itemsPerPage = 10;

// Slice items for current page
// const paginatedItems = items.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );



  const [orderHeader, setOrderHeader] = useState({
    code_name: "",
    code_card: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    fetchWarehouse();
    // fetchCustomer();
  }, []);
  
  const fetchWarehouse = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/warehouse");
      const formattedData = res.data.map((wh) => ({
        label: wh.WhsName,
        value: wh.WhsCode,
      }));
      setWarehouseOptions(formattedData);
    } catch (error) {
      console.log("Warehouse fetch error:", error);
    }
  };
  

  const fetchCustomer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Customer");
      const formattedData = res.data.map((cus) => ({
        label: cus.CardCode,
        value: cus.CardName,
      }));
      SetcustomerData(formattedData);
    } catch (error) {
      console.log("Customer fetch error:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Items");
    
      setItems(res.data);
      setShowItemModal(true);
    } catch (error) {
      console.log("Item fetch error:", error);
    }
  };
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

  // const handleItemSelect = (item) => {
  //   const exists = selectedItems.find(i => i.ItemCode === item.ItemCode);
  //   if (!exists) {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };
  
  const handleItemConfirm = () => {
    const existingCodes = new Set(orderLines.map(line => line.item_code));
    const newLines = selectedItems
      .filter(item => !existingCodes.has(item.ItemCode))
      .map(item => ({
        item_code: item.ItemCode,
        item_name: item.ItemName,
        uom: item.InvntryUom || "",
        price: "",
        quantity: "",
        warehouse: ""
      }));
    setOrderLines(prev => [...prev, ...newLines]);
    setSelectedItems([]);
    setShowItemModal(false);
  };
  // const handleItemConfirm = () => {
  //   const newLines = selectedItems.map(item => ({
  //     item_code: item.ItemCode,
  //     item_name: item.ItemName,
  //     uom: item.InvntryUom || "",
  //     price: "",
  //     quantity: "",
  //     warehouse: ""
  //   }));
  //   setOrderLines(prev => [...prev, ...newLines]);
  //   setSelectedItems([]);
  //   setShowItemModal(false);
  // };
  

  const [orderLines, setOrderLines] = useState([
    { item_name: "", item_code: "", uom: "", price: "", quantity: "", warehouse: "" },
  ]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setOrderHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleWarehouseChange = (index, event) => {
    const updatedLines = [...orderLines];
    updatedLines[index].warehouse = event.target.value;
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
      { item_name: "", item_code: "", uom: "", price: "", quantity: "", warehouse: ""  },
    ]);
  };

  const deleteRow = (index) => {
    if (orderLines.length === 1) return; // prevent deleting the last row
    const updatedLines = orderLines.filter((_, i) => i !== index);
    setOrderLines(updatedLines);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      DocDate: orderHeader.date,
      DocDueDate: orderHeader.date,
      
      CardCode: orderHeader.code_card,
      CardName: orderHeader.code_name,
      DocumentLines: orderLines.map((line) => ({
        ItemCode: line.item_code,
        ItemDescription: line.item_name,
        Quantity: parseFloat(line.quantity) || 0,
        Price: parseFloat(line.price) || 0,
        // WarehouseCode: line.warehouse,
        UoMCode: line.uom,
      })),
    };

    try {
      const res = await axiosInstance.post("/Orders", payload);
      toast.success("Sales Order Created Successfully");
      navigate("/sales-orders");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create Sales Order");
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
            <CardLayout>
          <Col md={12} className="mb-4">
            {/* <CardLayout> */}
              <h3>Create Sales Order</h3>
            {/* </CardLayout> */}
          </Col>
          <Col md={12}>
              <Row>
                <Col md={4}>
                  {/* <LabelField
                    label="Code Card"
                    name="code_card"
                    type="text"
                    value={orderHeader.code_card}
                    onChange={handleHeaderChange}
                    required
                  /> */}
                  <LabelField
  label="Code Card"
  name="code_card"
  type="text"
  value={orderHeader.code_card}
  onClick={() => {
    fetchCustomer();
    setShowCustomerModal(true);
  }}  readOnly
  required
/>
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Code Name"
                    name="code_name"
                    type="text"
                    value={orderHeader.code_name}
                    onChange={handleHeaderChange}
                    required
                    readOnly
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Date"
                    name="date"
                    type="date"
                    value={orderHeader.date}
                    onChange={handleHeaderChange}
                    required
                  />
                </Col>
              </Row>
            {/* </CardLayout> */}
          </Col>

          <Col md={12}>
            {/* <CardLayout> */}
            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
              <h3 className="mt-4 " style={{fontSize:"18px "}} >Lines</h3>
              <button
                type="button"
                style={{}}
                className="btn btn-secondary m-4 "
                onClick={addRow}
                >
                <FontAwesomeIcon icon={faPlus} />  Add Row
              </button>
                  </div>
              <Table   >
                <thead className="text-center" style={{fontSize:"14px "}}  >
                  <tr >
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>UOM</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Warehouse</th>
                    <th>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map((line, index) => (
                    <tr key={index}>
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
      style={{ paddingRight: "30px", cursor: "pointer" }}
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
                          onChange={(e) => handleLineChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="uom"
                          className="form-control"
                          value={line.uom}
                          onChange={(e) => handleLineChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          value={line.price}
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
                           options={warehouseOptions}
                           value={line.warehouse}
                           name="warehouse"
                          //  className="form-control"
                           style={{marginTop:"-24px"}}
                           onChange={(selected) => handleWarehouseChange(index, selected)}
                        />
                      </td>
                      <td>
          <button
            type="button"
            className="btn"
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
            {/* </CardLayout> */}
            {/* <CardLayout> */}
              <button type="submit" className="cus-btn">
                Submit
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
            </CardLayout>
        </Row>
      </form>
      {/* {showItemModal && (
  <div className="modal-backdrop show" style={{opacity:"1"}}>
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(255, 255, 255, 0.25)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{width: "576px", backgroundColor:"white",opacity:"1000"}}>
          <div className="modal-header">
            <h5 className="modal-title">Select Items</h5>
            <button type="button" className="btn-close" onClick={() => setShowItemModal(false)}></button>
          </div>
          <div className="modal-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>UOM</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemName}</td>
                    <td>{item.InvntryUom || "-"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleItemSelect(item)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="modal-footer justify-content-between">
  <div style={{display:"flex"}}>
    <button
      className="btn btn-outline-secondary btn-sm me-2"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={() => setCurrentPage((prev) => prev + 1)}
      disabled={currentPage * itemsPerPage >= items.length}
    >
      Next
    </button>
    <span className="ms-3 text-muted">
      Page {currentPage} of {Math.ceil(items.length / itemsPerPage)}
    </span>
  </div>
  <div>
    <button className="btn btn-success" onClick={handleItemConfirm}>
      Add Selected Items
    </button>
    <button
      className="btn btn-secondary ms-2"
      onClick={() => setShowItemModal(false)}
    >
      Cancel
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
)} */}
{showItemModal && (
  <div className="modal-backdrop show" style={{ opacity: "1" }}>
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(255, 255, 255, 0.25)" }}
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content"
          style={{ width: "576px", backgroundColor: "white" }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Select Items</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowItemModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Search item code or name..."
              className="form-control mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>UoM</th>
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
                    <td>{item.InvntryUom || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="modal-footer justify-content-between" style={{marginTop:"-20px"}} >
            <div style={{ display: "flex" ,paddingLeft:"20px"}}>
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                style={{color:"black"}}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{color:"black"}}
                disabled={currentPage * itemsPerPage >= filteredItems.length}
              >
                Next
              </button>
              <span className="ms-3 text-muted"
              style={{paddingLeft:"230px"}}
              >
                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
            </div>
            <div style={{marginTop:"10px", display:"flex", width:"650px", justifyContent:"center" ,alignItems:"center"}}>
              <button className="btn btn-success " onClick={handleItemConfirm}>
                Add Selected Items
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setShowItemModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{showCustomerModal && (
  <div className="modal-backdrop show" style={{ opacity: "1" }}>
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(255, 255, 255, 0.25)" }}>
      <div className="modal-dialog modal-md">
        <div className="modal-content" style={{ backgroundColor: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title">Select Customer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowCustomerModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Search customer..."
              className="form-control mb-3"
              value={customerSearchTerm}
              onChange={(e) => {
                setCustomerSearchTerm(e?.target?.value);
                setCurrentPage(1); // reset to first page on search
              }}
            />

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Card Code</th>
                  <th>Card Name</th>
                </tr>
              </thead>
              <tbody>
                {CustomerData
                  .filter(
                    (c) =>
                      c?.label?.toLowerCase().includes(customerSearchTerm?.toLowerCase()) ||
                      c?.value?.toLowerCase().includes(customerSearchTerm?.toLowerCase())
                  )
                  .slice((CustomercurrentPage - 1) * pageSize, CustomercurrentPage * pageSize)
                  .map((customer, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          type="radio"
                          name="selectedCustomer"
                          onChange={() => {
                            setSelectedCustomer(customer);
                            setOrderHeader((prev) => ({
                              ...prev,
                              code_card: customer.label,
                              code_name: customer.value,
                            }));
                            setShowCustomerModal(false);
                          }}
                        />
                      </td>
                      <td>{customer.label}</td>
                      <td>{customer.value}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-sm btn-outline-primary"
                disabled={CustomercurrentPage === 1}
                onClick={() => setCustomerCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <span>Page {CustomercurrentPage}</span>
              <button
                className="btn btn-sm btn-outline-primary"
                disabled={
                  CustomercurrentPage * pageSize >= CustomerData.filter(
                    (c) =>
                      c?.label?.toLowerCase().includes(customerSearchTerm?.toLowerCase()) ||
                      c?.value?.toLowerCase().includes(customerSearchTerm?.toLowerCase())
                  ).length
                }
                onClick={() => setCustomerCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



    </PageLayout>
  )
}
