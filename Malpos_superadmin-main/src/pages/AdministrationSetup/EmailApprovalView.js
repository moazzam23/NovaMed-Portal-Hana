import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faFilterCircleXmark,
  faEye,
  faBookOpenReader,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table, Modal, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailApprovalView() {
  const companyDB = localStorage.getItem("companyDB");
  const [pendingItems, setPendingItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchApprovals();
    fetchEmailTemplate();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/approval?companyDB=${companyDB}`
      );
      console.log(res);
      setPendingItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Steps");
    }
  };

  const fetchEmailTemplate = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/email-approval?companyDB=${companyDB}`
    );
    setEmailTemplate(res.data);
  };

  const getroleName = (userId) => {
    return (
      emailTemplate.find((u) => u.ID === userId)?.TEMPLATE_NAME || "Unknown"
    );
  };

  const filteredItems = pendingItems
    .filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        !statusFilter || item.ID.toLowerCase() === statusFilter.toLowerCase()
      );
    })
    .filter((item) => {
      const docDate = new Date(item.CREATED_AT);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      if (from && to) {
        return docDate >= from && docDate <= to;
      }
      if (from) {
        return docDate >= from;
      }
      if (to) {
        return docDate <= to;
      }
      return true;
    });

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  return (
    <div>
      <PageLayout>
        <CardLayout>
          <Row>
            <Col md={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    fontSize: "30px",
                    fontWeight: "400",
                  }}
                >
                  Email Approval Report
                </h3>
                <Link to="/email-sending">
                  <button className="premium-btn premium-create">
                    <FontAwesomeIcon icon={faPlusCircle} /> Create Email
                  </button>
                </Link>
              </div>
            </Col>
            <Col md={12}>
              <Row
                className="g-1 mb-3 align-items-end filter-card"
                style={{ backgroundColor: "#18596" }}
              >
                <Col md={12} className={"mt0-col-2"}>
                  <Box className={"users-btn-flex"}>
                    <Col xs={12} sm={12} md={2} lg={3}>
                      <label className="form-label2 fw-semibold">Search</label>
                      <CustomSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={2} style={{ marginLeft: "10px" }}>
                      <label className="form-label2 fw-semibold">Status</label>
                      <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </Col>
                    <Col md={2} className="ms-2">
                      <label className="form-label2 fw-semibold">
                        From Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        style={{ border: "1px solid grey" }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Col>
                    <Col md={2} className="ms-2">
                      <label className="form-label2 fw-semibold">To Date</label>
                      <input
                        type="date"
                        className="form-control"
                        style={{ border: "1px solid grey" }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Col>
                    <Col md={12} className="text-end mt-0">
                      <button
                        className=" premium-btn premium-filter  w-40"
                        onClick={resetFilters}
                      >
                        <FontAwesomeIcon icon={faFilterCircleXmark} /> Reset
                        Filters
                      </button>
                    </Col>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <div
                  className="p-2 pb-3"
                  style={{ border: "1px solid grey", borderRadius: "15px" }}
                >
                  <div className="premium-table-container">
                    <div className="premium-table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr
                            style={{ fontSize: "15px" }}
                            className="text-center"
                          >
                            <th>ID</th>
                            <th>Email Template Group</th>
                            <th>To Emails</th>
                            <th>CC Emails</th>
                            <th>Email Subject</th>
                            {/* <th>Email Body</th> */}
                            <th>Created At</th>
                            <th className="text-center">Status </th>
                          </tr>
                        </thead>
                        <tbody className=" tbody">
                          {paginatedItems.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No pending approvals
                              </td>
                            </tr>
                          ) : (
                            paginatedItems.map((item, index) => (
                              <tr key={item.ID}>
                                {/* <td>{index + 1}</td> */}
                                <td>{item.ID}</td>
                                <td className="text-center">
                                  {getroleName(item.APPROVAL_TEMPLATE_ID)}
                                </td>
                                {/* <td>{item.TO_EMAILS}</td>
                                <td>{item.CC_EMAILS}</td> */}
                                <td>
                                  <ul
                                    style={{ paddingLeft: "15px", margin: 0 ,textAlign:"left" }}
                                  >
                                    {item.TO_EMAILS?.split(",").map(
                                      (email, i) => (
                                        <li
                                          key={i}
                                          style={{
                                            listStyle: "disc",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {email.trim()}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul
                                    style={{ paddingLeft: "15px", margin: 0 ,textAlign:"left"}}
                                  >
                                    {item.CC_EMAILS?.split(",").map(
                                      (email, i) => (
                                        <li
                                          key={i}
                                          style={{
                                            listStyle: "disc",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {email.trim()}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>

                                <td
                                  style={{
                                    maxWidth: "200px"
                                     ,textAlign:"left",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={item.SUBJECT}
                                >
                                  {item.SUBJECT}
                                </td>

                                {/* <td
                                  style={{
                                     textAlign:"left",
                                    maxWidth: "300px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={item.BODY}
                                >
                                  {item.BODY}
                                </td> */}

                                <td>
                                  {new Date(
                                    item.CREATED_AT
                                  ).toLocaleDateString()}
                                </td>

                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        item.STATUS.toLowerCase() === "pending"
                                          ? "#e3b41cff" // Yellow
                                          : item.STATUS.toLowerCase() ===
                                            "in_progress"
                                          ? "#007bff" // Blue
                                          : item.STATUS.toLowerCase() ===
                                            "approved"
                                          ? "#18596a" 
                                          : item.STATUS.toLowerCase() ===
                                            "rejected"
                                          // Green
                                          ? "#ff416c":"black", // Default

                                      textTransform: "uppercase",
                                      textAlign: "center",
                                      color: "#ffff",
                                      fontWeight: "600",
                                      borderRadius: "5px",
                                      padding: "4px 5px",
                                    }}
                                  >
                                    {item.STATUS.toUpperCase()}
                                  </span>{" "}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Pagination
                  perPage={perPage}
                  totalUsers={filteredItems.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Col>
            </Col>
          </Row>
        </CardLayout>
      </PageLayout>
    </div>
  );
}
