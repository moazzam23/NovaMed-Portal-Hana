import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Text } from "../../components/elements";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import {BASE_URL} from "../../apis/NodeApiUrl"

export default function ViewInventoryRequestDocumentsUserWise() {
  const companyDB = localStorage.getItem("companyDB");
  const userId = localStorage.getItem("sapusercode");
  const [inventoryRequest, setInventoryRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchPostedGoodIssue();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchTerm]);

  const fetchPostedGoodIssue = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/INVENTORY_REQ_CLOSED_User?CompanyDB=${companyDB}&USERCODE=${userId}`
      );
      setInventoryRequest(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Inventory Request Documents");
    }
  };

  const filteredData = inventoryRequest.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.DocNum.toString().includes(lowerSearch) ||
      item.ItemCode?.toLowerCase().includes(lowerSearch) ||
      item.Dscription?.toLowerCase().includes(lowerSearch) ||
      item.U_Emp_Name?.toLowerCase().includes(lowerSearch) ||
      item.U_Reasons?.toLowerCase().includes(lowerSearch) ||
      item.U_NAME?.toLowerCase().includes(lowerSearch) ||
      item.Project?.toLowerCase().includes(lowerSearch) ||
      item.OcrCode?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Inventory Request Documents</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={9}>
                  <Box className="users-btn-flex">
                    <Col xs={12} sm={12} md={4} lg={4}>
                      <CustomSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <Box className="client-table">
                  <Table className="mc-table" responsive>
                    <thead
                      style={{ textAlign: "center" }}
                      className="mc-table-head primary"
                    >
                      <tr className="text-center">
                        <th>#</th>
                        <th>Document No</th>
                        <th>Item Code</th>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Warehouse</th>
                        <th>Issue Type</th>
                        <th>Employee</th>
                        {/* <th>Cost Center Type</th> */}
                        <th>Cost Center</th>
                        <th>Project</th>
                        {/* <th>Inventory Request No</th> */}
                        <th>Created By</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      {filteredData.length === 0 ? (
                        <tr>
                          <td colSpan="13" className="text-center">
                            No Inventory Request Documents Found
                          </td>
                        </tr>
                      ) : (
                        filteredData
                          .slice(
                            (currentPage - 1) * perPage,
                            currentPage * perPage
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{(currentPage - 1) * perPage + index + 1}</td>
                              <td>{item.DocNum}</td>
                              <td>{item.ItemCode}</td>
                              <td>{item.Dscription}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.WhsCode}</td>
                              <td>{item.U_Reasons || "-"}</td>
                              <td>{item.U_Emp_Name || "-"}</td>
                              {/* <td>{item.U_CCType || "-"}</td> */}
                              <td>{item.OcrCode || "-"}</td>
                              <td>{item.Project || "-"}</td>
                              {/* <td>{item.InventoryRequestDocNum || "-"}</td> */}
                              <td>{item.U_NAME || "-"}</td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>

                  <Pagination
                    perPage={perPage}
                    totalUsers={filteredData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </Box>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
