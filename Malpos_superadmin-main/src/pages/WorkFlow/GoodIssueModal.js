import React, { useContext } from "react";
import { generateGoodIssuePDF } from "./GenerateGoodIssuePdf";
import { Col, Row } from "react-bootstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DrawerContext } from "../../context/Drawer";

const GoodIssueModal = ({ doc, onClose }) => {
    const { drawer } = useContext(DrawerContext);
  if (!doc) return null;
console.log(doc)
  return (
    <div
      style={{
        position: "fixed",
        top: 83,
          left: drawer ? 270 : 0, // no gap when sidebar closed
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
        {/* Header Section */}
        <div
          style={{
            borderBottom: "2px solid #ddd",
            paddingBottom: "10px",
            marginBottom: "15px",
          }}
        >
          {/* Top Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2 
      //       style={{
      //   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      //   textAlign: "center",
      //   fontWeight: "700",
      //   fontSize: "2rem",
      //   background: "linear-gradient(90deg, #4b6cb7, #182848)",
      //   WebkitBackgroundClip: "text",
      //   WebkitTextFillColor: "transparent",
      //   textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      //   marginBottom: "0px",
      //   letterSpacing: "2px",
      // }}
            style={{ margin: 0, 
              fontSize:"30px" ,fontWeight:"400"}}
            >Good Issue Document</h2>
            
           
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>
  <div style={{ display: "flex", gap: "10px" }}>
  <button
  onClick={() => generateGoodIssuePDF(doc)}
  style={{
    background: "linear-gradient(45deg, #18596a, #18596a)",
    color: "#fff",
    border: "none",
    padding: "18px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  }}
>
  📄 Download PDF
</button>

<button
  onClick={onClose}
  style={{
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "#fff",
    border: "none",
    padding: "18px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  }}
>
  ✖ Close
</button>

  </div>
</div>

          </div>

          <Row className="mt-4">

  <Col md={12}>
<div className="main-doc"> <FontAwesomeIcon icon={faEye}/>  Document Information </div>
</Col>
  </Row>

          
          <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"20px"}}>

  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Portal Document No:
    </label>
    <input
      type="text"
      value={doc.U_Portal_Doc || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

  {/* Status Badge */}
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      SAP Document No:
    </label>
   <input
      type="text"
      value={doc.DocNum || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

</div>

     
          <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"20px"}}>

  {/* User Field */}
   <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "29px" }}>
      Inventory Req No:
    </label>
    <input
      type="text"
      value={doc.InventoryRequestDocNum || ""}
      readOnly
      style={{
        width: "60%",
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
  <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "89px" }}>
      Creator:
    </label>
    <input
      type="text"
      value={doc.CreatedBy?.toUpperCase() || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>

</div>

       <div style={{ display: "flex", gap: "20px",paddingLeft:"60px" ,paddingTop:"20px",paddingBottom:"20px" }}>
          <div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "93px" }}>
      Doc Date:
    </label>
    <input
      type="text"
      value={new Date(doc.DocDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) || ""}
      readOnly
      style={{
        width: "60%", // shorter
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f9f9f9",
      }}
    />
  </div>
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
      Posted
    </span>
  </div>

</div>
        </div>


        <div style={{ flex: 1, overflow: "auto" }}>
            <h4 className="mt-1 mb-4" 
      //       style={{
      //   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      //   // textAlign: "center",
      //   fontWeight: "900",
      //   fontSize: "1.5rem",
      //   background: "linear-gradient(90deg, #4b6cb7, #182848)",
      //   WebkitBackgroundClip: "text",
      //   WebkitTextFillColor: "transparent",
      //   textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      //   marginBottom: "0px",
      //   letterSpacing: "2px",
      // }}
            style={{fontFamily:"cursive"}} 
            >Item Details</h4>
        <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden", // ensures table corners follow radius
      boxShadow: "0 6px 30px rgba(0,0,0,0.05)", // subtle shadow
    }}
  >

          <table
            style={{
                width: "max-content",
                minWidth: "100%",
                borderCollapse: "collapse",
                tableLayout: "auto",
            }}
            >
            <thead  style={{
    //   border: "1px solid #ddd",
      borderRadius: "8px",
    //   overflow: "hidden", // ensures table corners follow radius
    //   boxShadow: "0 2px 6px rgba(0,0,0,0.05)", // subtle shadow
    }} >
              <tr style={{ background: "#18596a", color:"white" }}>
                <th style={thStyle}>Item Code</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Warehouse</th>
                <th style={thStyle}>Issue Type</th>
                <th style={thStyle}>Employee</th>
                <th style={thStyle}>Cost Center</th>
                <th style={thStyle}>Project</th>
              </tr>
            </thead>
            <tbody>
                {doc.items.map((item, subIdx) => (
                    <tr key={subIdx}>
                <td style={tdStyle}>{item.ItemCode}</td>
                <td style={tdStyle}>{item.Dscription}</td>
                <td style={tdStyle}>{item.Quantity}</td>
                <td style={tdStyle}>{item.WhsCode}</td>
                <td style={tdStyle}>{item.U_Reasons}</td>
                <td style={tdStyle}>{item.U_Emp_Name}</td>
                <td style={tdStyle}>{item.OcrCode}</td>
                <td style={tdStyle}>{item.Project}</td>
              </tr>
                ))}
            </tbody>
          </table>
</div>
        </div>
      </div>
    </div>
  );
};

// Shared cell styles
const thStyle = {
    border: "1px solid #ccc",
    padding: "6px 10px",
  whiteSpace: "nowrap",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "6px 10px",
  whiteSpace: "nowrap",
  textAlign: "left",
};

export default GoodIssueModal;
