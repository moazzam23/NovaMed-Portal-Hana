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
  faCheckCircle,
  faCancel,
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

export default function EmailApprovalDecision() {
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
        `${BASE_URL}/api/approval/pending?companyDB=${companyDB}`
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

  const handleAction = async (id, action) => {
  try {
    const endpoint =
      action === "approved"
        ? `${BASE_URL}/api/approval/approve?companyDB=${companyDB}`
        : `${BASE_URL}/api/approval/reject?companyDB=${companyDB}`;

    const res = await axios.post(endpoint, { requestId: id });

    toast.success(res.data.message || `Request ${action}`);
    // Refresh the list after action
    fetchApprovals();
  } catch (err) {
    console.error(err);
    toast.error(`Failed to ${action} request`);
  }
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
                  Email Approval Decision
                </h3>
              </div>
            </Col>
            <Col md={12}>
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
                            <th>Email Template</th>
                            <th>To Emails</th>
                            <th>CC Emails</th>
                            <th>Created At</th>
                            <th className="text-center">Status </th>
                            <th>Actions</th>
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
                                <td>{item.ID}</td>
                                <td className="text-center">
                                  {getroleName(item.APPROVAL_TEMPLATE_ID)}
                                </td>
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
                                          ? "#18596a" // Green
                                          : "#ff416c", // Default

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
                                 <td className="text-nowrap">
                                                          <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleAction(item.ID, "approved")}
                                                          >
                                                            <span
                                                              style={{
                                                                backgroundColor: "#18596a",
                                                                color: "white",
                                                                padding: "8px 12px",
                                                                borderRadius: "10px",
                                                                fontWeight: "600",
                                                                fontSize: "12px",
                                                              }}
                                                            >
                                                              <FontAwesomeIcon icon={faCheckCircle} /> Approve
                                                            </span>
                                                          </Button>
                                                          <Button
                                                            variant="danger"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleAction(item.ID, "rejected")}
                                                          >
                                                            <span
                                                              style={{
                                                                backgroundColor: "#d14249",
                                                                color: "white",
                                                                padding: "8px 12px",
                                                                borderRadius: "10px",
                                                                fontWeight: "600",
                                                                fontSize: "12px",
                                                              }}
                                                            >
                                                              <FontAwesomeIcon icon={faCancel} /> Reject
                                                            </span>
                                                          </Button>
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
