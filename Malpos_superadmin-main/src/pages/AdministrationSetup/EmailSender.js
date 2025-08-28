import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailSenderList() {
  const [emailConfigs, setEmailConfigs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
 const companyDB = localStorage.getItem("companyDB");
  useEffect(() => {
    fetchEmailConfigs();
  }, []);

  const fetchEmailConfigs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/email-setup?companyDB=${companyDB}`);
      setEmailConfigs(res.data);
      console.log(res)
    } catch (err) {
      toast.error("Failed to fetch email configurations");
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("EmailSetupId", id);
    localStorage.setItem("EmailSetupBtnText", "Update Email Setup");
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentConfigs = emailConfigs.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // <PageLayout>
        
      <Row>
        {/* <Col md={8}>
          <CardLayout>
            <h3>Email Setup List</h3>
          </CardLayout>
        </Col> */}
        <Col md={12}>
          {/* <CardLayout> */}
            <Row>
              <Col md={12}>
                <Box className="Roles-btn-flex text-end">
                  {/* <Link to="/email-setup-create">
                    <button className="btn-create">
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </button>
                  </Link> */}
                   <Link to="/email-setup-create">
                                                <button className="premium-btn premium-create">
                                                  <FontAwesomeIcon icon={faPlusCircle} /> Configure Sender Data
                                                </button>
                                              </Link>
                </Box>
              </Col>

              <Col md={12}>
                {/* <Box className="Roles-table-wrappper">
                  <Table className="f-13 mc-table" responsive>
                    <thead className="mc-table-head primary text-center"> */}
                   <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                   <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Sender Email</th>
                        <th>SMTP Server</th>
                        <th>Port</th>
                        <th>Username</th>
                        <th>CC Emails</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mc-table-body ">
                      {currentConfigs.length > 0 ? (
                        currentConfigs.map((item) => (
                          <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.SENDEREMAIL}</td>
                            <td>{item.SMTPHOST}</td>
                            <td>{item.SMTPPORT}</td>
                            <td>{item.SMTPUSER}</td>
                            <td>{item.CCEMAILS}</td>
                            <td>
                              <Box className="justify-content-center px-2 client-action-icons">
                                <Box>
                                  <Link
                                    to="/email-setup-create"
                                    onClick={() => handleEdit(item.ID)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                  </Link>
                                </Box>
                              </Box>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">No email configurations found</td>
                        </tr>
                      )}
                    </tbody>
                  {/* </Table> */}
                  </table>
                  </div> </div></div>

                  {emailConfigs.length > 0 && (
                    <Pagination
                      perPage={perPage}
                      totalUsers={emailConfigs.length}
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