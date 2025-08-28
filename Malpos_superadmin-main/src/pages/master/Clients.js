import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Text } from "../../components/elements";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import CustomSearch from "../../components/CustomSearch";
import { Link } from "react-router-dom";
import axiosInstance from "../../apis";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);

  const getClients = async () => {
    try {
      const response = await axiosInstance.get("/cdclients");
      setClients(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
      // Display the error toast with autoclose set to true and time set to 3000 milliseconds
      toast.error("Error retrieving data", { autoClose: 5000 });
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/cdclient_delete/${id}`);
      getClients();
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
      toast.success("Client deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("clientId", id);
  };

  //   Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentClients = filteredClients.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3> Clients</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={9} className={"mt0-col-2"}>
                  <Box className={"users-btn-flex"}>
                    <Box className={"clients-btn-box"}>
                      <Text className="faArrowLeft-client" as="span">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </Text>
                    </Box>
                    <Link to="/client-create">
                      <button className="btn-create">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <CustomSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <Box className={"client-table"}>
                  <Table responsive>
                    <thead className="thead text-center custom-table-header">
                      <tr>
                        <th className="th-w5">Id</th>
                        <th className="th-w15">Name</th>
                        <th className="th-w10">Email</th>
                        <th className="th-w5">Role</th>
                        <th className="th-w15">Address</th>
                        <th className="th-w5">Country</th>
                        <th className="th-w5">City</th>
                        <th className="th-w15">Phone #</th>
                        <th className="th-w5">Is Active</th>
                        <th className="th-w5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center tbody">
                      {currentClients &&
                        currentClients.map((client) => (
                          <tr key={client.cd_client_id}>
                            <td>{client.cd_client_id}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.client_role}</td>
                            <td>{client.address}</td>
                            <td>{client.country_id}</td>
                            <td>{client.city_id}</td>
                            <td>{client.phone_no}</td>
                            <td
                              style={{
                                color: client.is_active ? "green" : "red",
                              }}
                            >
                              {client.is_active ? "Yes" : "No"}
                            </td>
                            <td>
                              <Box className={"client-action-icons"}>
                                <Box>
                                  <FontAwesomeIcon
                                    style={{ cursor: "pointer" }}
                                    icon={faTrash}
                                    color="#ee3432"
                                    onClick={() => {
                                      handleDelete(client.cd_client_id);
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Link to={"/client-create"}>
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      color="#f29b30"
                                      onClick={() => {
                                        handleEdit(client.cd_client_id);
                                      }}
                                    />
                                  </Link>
                                </Box>
                              </Box>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    perPage={perPage}
                    totalUsers={filteredClients.length}
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
