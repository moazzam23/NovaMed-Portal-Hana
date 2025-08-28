  import React, { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import {
    faArrowRotateLeft,
    faPlus,
    faTrash,
    faEdit,
    faFilterCircleXmark,
    faFilePdf,
    faEye,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Box, Button, Text } from "../../components/elements";
  import { Col, Row, Table,Modal } from "react-bootstrap";
  import { CardLayout } from "../../components/cards";
  import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
  import PageLayout from "../../layouts/PageLayout";
  import axios from "axios";
  import { Pagination } from "../../components";
  import CustomSearch from "../../components/CustomSearch";
  import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { generateGoodIssuePDF } from "../WorkFlow/GenerateGoodIssuePdf";
import GoodIssueModal from "../WorkFlow/GoodIssueModal";

  export default function ViewAllPostedGoodIssue() {
    const companyDB = localStorage.getItem("companyDB");
    const [goodIssue, setGoodIssue] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
    const [selectedDoc, setSelectedDoc] = useState(null);

    const [perPage] = useState(10);
    
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    useEffect(() => {
      fetchPostedGoodIssue();
    }, []);

    useEffect(() => {
      setCurrentPage(1); 
    }, [searchTerm]);

  //   const filteredData = goodIssue
  // .filter((item) =>
  //   item.DocNum.toString().toLowerCase().includes(searchTerm)  ||
  //     item.U_Portal_Doc?.toString().toLowerCase().includes(searchLower)
  // )
  // .filter((item) =>
  //   (createdByFilter ? item.CreatedBy?.toUpperCase() === createdByFilter : true) 
    
  // );

const filteredData = goodIssue
  // Search filter on DocNum or Portal Document No
  .filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.DocNum?.toString().toLowerCase().includes(searchLower) ||
      item.U_Portal_Doc?.toString().toLowerCase().includes(searchLower)
    );
  })
  // CreatedBy filter
  .filter((item) =>
    createdByFilter ? item.CreatedBy?.toUpperCase() === createdByFilter : true
  )
  // Date range filter
  .filter((item) => {
    const docDate = new Date(item.DocDate);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    // If both start and end dates are selected
    if (from && to) {
      return docDate >= from && docDate <= to;
    }
    // If only start date is selected
    if (from) {
      return docDate >= from;
    }
    // If only end date is selected
    if (to) {
      return docDate <= to;
    }
    return true;
  });


    const uniqueCreatedBy = [...new Set(goodIssue.map((item) => item.CreatedBy?.toUpperCase()))];


    const fetchPostedGoodIssue = async () => {
       setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/Posted-Good-Issue?CompanyDB=${companyDB}`
        );
        setGoodIssue(res.data.reverse());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load Steps");
      }finally{
         setIsLoading(false);
      }
    };
const resetFilters = () => {
  setSearchTerm("");
  setStatusFilter("All");
  setStartDate("");
  setCreatedByFilter("")
  setEndDate("");
  setCurrentPage(1);
};
  

    return (
        <div>
          

             <PageLayout>
<CardLayout>
      <Row>
<Col md={12}>
            <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>

            <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Good Issue Documents</h3>
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
    <Col md={3}>
      <label className="form-label2 fw-semibold">From Date</label>
      <input
        type="date"
        className="form-control"
        style={{border:"1px solid grey"}}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        />
    </Col>
    <Col md={3}>
      <label className="form-label2 fw-semibold">To Date</label>
      <input
        type="date"
        className="form-control"
        style={{border:"1px solid grey"}}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        />
    </Col>
        <Col md={3}  >
    <label className="form-label2 fw-semibold">Creator</label>
    <select className="form-control" value={createdByFilter} onChange={(e) => setCreatedByFilter(e.target.value)}>
      <option value="">All</option>
      {uniqueCreatedBy.map((user, idx) => (
        <option key={idx} value={user}>{user}</option>
      ))}
    </select>
  </Col>
<Col md={12} className="text-end mt-2" >
  <button
    className=" premium-btn premium-filter  w-40"
    // onClick={resetFilters}
  >
    <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset Filters
  </button>
</Col>

  </Row>
              </Col>
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
            </div>
    );
  }
