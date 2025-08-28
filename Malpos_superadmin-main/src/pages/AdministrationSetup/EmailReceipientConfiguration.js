import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faPlus, faTrash, faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailConfiguration() {
  const [configs, setConfigs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
 const companyDB = localStorage.getItem("companyDB");
  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email-recipients?companyDB=${companyDB}`);
      setConfigs(res.data);
    } catch (err) {
      toast.error("Failed to fetch email configs");
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("EmailConfigId", id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/email-recipients/${id}?companyDB=${companyDB}`);
      toast.success("Configuration deleted");
      fetchConfigs();
    } catch (err) {
      toast.error("Failed to delete configuration");
    }
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentConfigs = configs.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    // <PageLayout>
      <Row>
        {/* <Col md={12}>
          <CardLayout>
            <h3>Email Notification Configurations</h3>
          </CardLayout>
        </Col> */}

        <Col md={12}>
          {/* <CardLayout> */}
            <Row>
              <Col md={12}>
                <Box className="Roles-btn-flex text-end">
                  {/* <Link to="/email-config-create">
                    <button className="btn-create">
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </button>
                  </Link> */}

                  <Link to="/email-config-create">
                                                                  <button className="premium-btn premium-create">
                                                                    <FontAwesomeIcon icon={faPlusCircle} /> Configure Recipient Data
                                                                  </button>
                                                                </Link>
                </Box>
              </Col>

              <Col md={12}>
                {/* <Box className="Roles-table-wrappper">
                  <Table className="f-13 mc-table" responsive>
                    <thead className="mc-table-head primary custom-table-header text-center"> */}
              <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                   <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Document Type</th>
                        <th>Event Type</th>
                        <th>Emails</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mc-table-body">
                      {currentConfigs.map((cfg) => (
                        <tr key={cfg.id}>
                          <td>{cfg.id}</td>
                          <td>{cfg.documentType}</td>
                          <td>{cfg.eventType}</td>
                          <td>
                            <ul style={{ listStyle: "disc", paddingLeft: "1rem", margin: 0 }}>
                              {cfg.emails.map((email, idx) => (
                                <li key={idx}>{email}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <Box className="justify-content-center px-2 client-action-icons">
                              <Box className="px-3" style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  color="#ee3432"
                                  onClick={() => handleDelete(cfg.id)}
                                />
                              </Box>
                              <Box>
                                <Link to="/email-config-create" onClick={() => handleEdit(cfg.id)}>
                                  <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                </Link>
                              </Box>
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  {/* </Table> */}
                  </table></div>
                  </div>
                  </div>

                  {configs.length > 0 && (
                    <Pagination
                      perPage={perPage}
                      totalUsers={configs.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  )}
                {/* </Box> */}
              </Col>
            </Row>
          {/* </CardLayout> */}
        </Col>
      </Row>
    // </PageLayout>
  );
}