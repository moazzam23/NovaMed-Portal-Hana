import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row, Table, Form, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewSingleGoodIssuePerPage() {
  const companyDB = localStorage.getItem("companyDB");
  const userId = localStorage.getItem("sapusercode");

  const [goodIssues, setGoodIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPostedGoodIssue();
  }, []);

  const fetchPostedGoodIssue = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/Posted-Good-Issue_User?CompanyDB=${companyDB}&USERCODE=${userId}`
      );
      const data = res.data;
      setGoodIssues(data);
setFilteredIssues(groupByDocument(data).reverse());

    } catch (err) {
      toast.error("Failed to load Good Issue documents");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  if (!searchTerm.trim()) {
    const groupedAll = groupByDocument(goodIssues);
    setFilteredIssues(groupedAll.reverse());
    setCurrentIndex(0);
    setSearchTerm("")
  }
}, [searchTerm]);

  const groupByDocument = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.DocNum]) grouped[item.DocNum] = [];
      grouped[item.DocNum].push(item);
    });
    return Object.values(grouped);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredIssues(groupByDocument(goodIssues).reverse());
      setCurrentIndex(0);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = goodIssues.filter((item) =>
      item.DocNum.toString().includes(lowerSearch) ||
      item.ItemCode?.toLowerCase().includes(lowerSearch) ||
      item.Dscription?.toLowerCase().includes(lowerSearch) ||
      item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
      item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
      item.CreatedBy?.toLowerCase().includes(lowerSearch)
    );

    const grouped = groupByDocument(filtered);
    setFilteredIssues(grouped);
    setCurrentIndex(0);
  };

  const currentDocument = filteredIssues[currentIndex] || [];

  const docHeader = currentDocument.length > 0 ? currentDocument[0] : {};

  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          <CardLayout>
            <Row className="mb-1 align-items-center">
              <Col md={4}>
                {/* <h3>Good Issue Document</h3> */}
              </Col>
              <Col md={3} >
                <Form.Control
                  type="text"
                  placeholder="Search by DocNum, Item, Employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </Col>
              <Col md={2} >
                <Button className="premium-btn premium-view" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Button>
              </Col>
               {/* <Col md={3} className="text-end">
        <Link to="/create-good-issue">
          <Button variant="primary" className="premium-btn premium-create">
            <FontAwesomeIcon icon={faPlus} /> Pending Good Issue
          </Button>
        </Link>
      </Col> */}
            </Row>
            {!isLoading && (
           <Row className="mt-1 justify-content-between">
  <Col md="auto" className="d-flex gap-2">
    <Button
      variant="secondary"
            className="premium-btn premium-view "
      disabled={currentIndex === 0}
      onClick={() => setCurrentIndex(0)}
    >
      First
    </Button>
    <Button
      variant="secondary"
      disabled={currentIndex === 0}
            className="premium-btn premium-duplicate "
      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Previous
    </Button>
  </Col>

  {/* <Col md="auto" className="align-self-center">
    <strong>
      Document {currentIndex + 1} of {filteredIssues.length}
    </strong>
  </Col> */}

  <Col md="auto" className="d-flex gap-2">
    <Button
      variant="secondary"
      className="premium-btn premium-next "
      disabled={currentIndex === filteredIssues.length - 1}
      onClick={() =>
        setCurrentIndex((prev) => Math.min(filteredIssues.length - 1, prev + 1))
      }
    >
      Next <FontAwesomeIcon icon={faArrowRight} />
    </Button>
    <Button
      variant="secondary"
      className="premium-btn premium-view"
      disabled={currentIndex === filteredIssues.length - 1}
      onClick={() => setCurrentIndex(filteredIssues.length - 1)}
    >
      Last
    </Button>
  </Col>
</Row>
 )}
            <Row className="mb-1 mt-1">
              {isLoading ? (
                <Skeleton height={150} />
              ) : currentDocument.length === 0 ? (
                <Col>
                  <p>No Good Issue Documents Found</p>
                </Col>
              ) : (
                <>
                  {/* <Col md={4}>
                    <strong>Document No:</strong> {docHeader.DocNum}
                  </Col>
                  <Col md={4}>
                    <strong>Portal Doc No:</strong> {docHeader.U_Portal_Doc || "-"}
                  </Col>
                  <Col md={4}>
                    <strong>Inventory Request No:</strong> {docHeader.InventoryRequestDocNum || "-"}
                  </Col> */}

  <Row style={{padding:"0px 30px 0px 30px"}}>
<h3 
style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
        fontWeight: "900",
        fontSize: "2rem",
        background: "linear-gradient(90deg, #4b6cb7, #182848)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        marginBottom: "0px",
        letterSpacing: "2px",
      }}
// style={{fontFamily:"cursive",textAlign:"center", paddingBottom:"20px",textDecoration:"underline"}} 
>Document Information</h3>
<div style={{ flex: 1 }}>
    <label style={{ fontWeight: "bold", marginRight: "6px" }}>
      Portal Document No:
    </label>
    <input
      type="text"
      value={docHeader.U_Portal_Doc || ""}
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
value={docHeader.DocNum || ""}
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
      value={docHeader.CreatedBy.toUpperCase() || ""}
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
        <Row style={{padding:"0px 30px 0px 30px"}}>
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
          </Row>
<hr style={{paddingBottom:"0px"}} />

<h3 style={{fontFamily:"cursive",padding:"0px 50px 10px 0px",textDecoration:"underline"}} >Item Details</h3>
         

                </>
              )}
            </Row>

            {/* <Table className="table-bordered responsive " responsive> */}
             <div className="premium-table-container">
  <div className="premium-table-wrapper" style={{paddingBottom:"30px"}} >
    <table className="premium-table" >
              <thead        >
                <tr>
                  <th>#</th>
                  <th style={{minWidth:"120px"}}>Item Code</th>
                  <th style={{minWidth:"260px"}}>Description</th>
                  <th>Quantity</th>
                  <th>Warehouse</th>
                  <th>Issue Type</th>
                  <th style={{minWidth:"200px"}}>Employee</th>
                  <th style={{minWidth:"160px"}}>Cost Center Type</th>
                  <th>Cost Center</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody >
                {isLoading ? (
                  [...Array(5)].map((_, idx) => (
                    <tr key={idx}>
                      <td colSpan="10">
                        <Skeleton height={25} />
                      </td>
                    </tr>
                  ))
                ) : (
                  currentDocument.map((item, index) => (
                    <tr key={index}  className="slide-in-right" style={{
    animationDelay: `${index * 0.1}s`,
    // backgroundColor: "#f8f9fa",
    fontSize:"13px",
  }}>
                      <td>{index + 1}</td>
                      <td>{item.ItemCode}</td>
                      <td>{item.Dscription}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.WhsCode}</td>
                      <td>{item.U_Reasons || "-"}</td>
                      <td>{item.U_Emp_Name || "-"}</td>
                      <td>{item.U_CCType || "-"}</td>
                      <td>{item.OcrCode || "-"}</td>
                      <td>{item.Project || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            {/* </Table> */}
          </table>
            </div>
            </div>


        <Col md="auto" style={{textAlign:"center" , padding:"40px 0px"}} className="align-self-center">
    <strong>
      Document {currentIndex + 1} of {filteredIssues.length}
    </strong>
  </Col>
          </CardLayout>
        </Col>
        
      </Row>
    </PageLayout>
  );
}
