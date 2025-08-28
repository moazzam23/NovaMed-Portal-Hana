import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box, Text } from "../../components/elements";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailTemplate() {
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
   const companyDB = localStorage.getItem("companyDB");

  const getEmailTemplate = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/email-templates?companyDB=${companyDB}`);
      setEmailTemplate(response.data);
      console.log(response)
    } catch (error) {
      console.log("Error retrieving users:", error);
    }
  };

  useEffect(() => {
    getEmailTemplate();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/email-templates/${id}?companyDB=${companyDB}`);
      toast.success("User deleted successfully", { autoClose: 3000 });
      getEmailTemplate();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("UpdateEmailTemplateId", id);
    localStorage.setItem("UpdateEmailTemplateBtn","Update Template")
  };


  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentUsers = emailTemplate.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageLayout>
      <CardLayout>
      <Row>
        <Col md={12}>
                                        <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
                            
                                        <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Email Template Groups</h3>
                             <Link to="/email-template-create">
                              <button className="premium-btn premium-create">
                                <FontAwesomeIcon icon={faPlusCircle} /> Create Email Template
                              </button>
                            </Link>
                                  </div>
                                    </Col>
        <Col md={12}>
            <Row>
              <Col md={12}>
                     <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                  <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                      <tr style={{fontSize:"12px"}}>
                        <th>Id</th>
                        <th>Template Name</th>
                        <th>Subject</th>
                        <th>Body</th>
                        <th>Signature</th>
                        <th>Attachment Signature</th>
                
                        <th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="mc-table-body">
                      {currentUsers.map((user,index) => (
                        <tr className="slide-in-right" style={{
                          animationDelay: `${index * 0.1}s`,
                        }}  key={user.ID}>
                          <td>{user.ID}</td>
                          <td>{user.CUSTOMER_NAME}</td>
                          {/* <td>{user.EMAIL_SUBJECT}</td>
                          <td>{user.EMAIL_BODY}</td> */}
                          <td title={user.EMAIL_SUBJECT}>
  {user.EMAIL_SUBJECT.length > 50
    ? user.EMAIL_SUBJECT.substring(0, 50) + "..."
    : user.EMAIL_SUBJECT}
</td>

<td title={user.EMAIL_BODY}>
  {user.EMAIL_BODY.length > 50
    ? user.EMAIL_BODY.substring(0, 50) + "..."
    : user.EMAIL_BODY}
</td>

                          <td>{user.EMAIL_SIGNATURE}</td>
                          {/* <td>{user.SIGNATURE_ATTACHMENT}</td> */}
                          <td>
  {user.SIGNATURE_ATTACHMENT ? (
    <img
      src={`data:image/png;base64,${user.SIGNATURE_ATTACHMENT}`}
      alt="Signature"
      style={{ width: "170px", height: "50px", objectFit: "contain" }}
    />
  ) : (
    "No Attachment"
  )}
</td>

<td>
  <label className="switch">
    <input
      type="checkbox"
      checked={user.ACTIVE === "Y"} // SAP returns "Y" or "N"
      readOnly
    //   disabled
    />
    <span className="slider round"></span>
  </label>
</td>
                          <td>
                            <Box className="justify-content-center px-2 client-action-icons">
                              <Box className="px-3" style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  color="#ee3432"
                                  onClick={() => handleDelete(user.ID)}
                                  />
                              </Box>
                              <Box>
                                <Link to="/email-template-create" onClick={() => handleEdit(user.ID)}>
                                  <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                </Link>
                              </Box>
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  {/* </Table> */}
                  </table>
                  </div>
</div></div>                  {emailTemplate.length > 0 && (
                    <Pagination
                    perPage={perPage}
                      totalUsers={emailTemplate.length}
                      paginate={paginate}
                      currentPage={currentPage}
                      />
                  )}
                {/* </Box> */}
              </Col>
            </Row>
        </Col>
        </Row>
          </CardLayout>
        </PageLayout>
        )}