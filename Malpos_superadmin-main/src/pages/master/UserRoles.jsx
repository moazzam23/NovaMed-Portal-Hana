import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function UserRoles() {
  const [userRoles, setUserRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
const companyDB = localStorage.getItem("companyDB");

  const getRolesPermission = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/permissions?companyDB=${companyDB}`);
      setUserRoles(response.data);
    } catch (error) {
      console.error("Error retrieving roles", error);
      toast.error("Failed to fetch user roles");
    }
  };

  useEffect(() => {
    getRolesPermission();
  }, []);

  const handleEdit = (id) => {
    localStorage.setItem("userroleid", id);
  };

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentRoles = userRoles.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <PageLayout>
    <CardLayout>
        <Row>
          {/* <Col md={12}>
            <CardLayout>
              <h3>User Permissions</h3>
            </CardLayout>
          </Col> */}

          <Col md={12}>
                    {/* <CardLayout> */}
                      <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
          
                      <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>User Permissions</h3>
           <Link to="/create-user-role">
            <button className="premium-btn premium-create">
              <FontAwesomeIcon icon={faPlusCircle} /> Create Permission
            </button>
          </Link>
                </div>
                {/* </CardLayout> */}
                  </Col>
          <Col md={12}>
              <Row>
                {/* <Col md={12} className="mt0-col-2">
                  <Box className="Roles-btn-flex">
                    <Link to="/create-user-role">
                      <button className="btn-create">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Box>
                </Col> */}

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
                          <th>Role</th>
                          <th>Permissions</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="mc-table-body">
                        {currentRoles && currentRoles.length > 0 ? (
                          currentRoles.map((role) => (
                            <tr key={`role-${role.ROLE_ID}`}>
                              <td > {role.ROLE_NAME || role.ROLE_ID}</td>
                              <td style={{textAlign:"left"}}>
                                {role.PERMISSIONS
                                  ? role.PERMISSIONS.split(",").filter(p => p).map((perm, i) => (
                                      <span key={i} className="badge bg-secondary m-1">
                                        {perm.replaceAll("_", " ").toUpperCase()}
                                      </span>
                                    ))
                                  : "No Permissions"}
                              </td>
                              <td className="text-center">
                                <Box className="client-action-icons px-0 justify-content-center">
                                  <Link
                                    to="/create-user-role"
                                    onClick={() => handleEdit(role.ROLE_ID)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                  </Link>
                                </Box>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    {/* </Table> */}
                    </table>
</div></div></div>
                    <Pagination
                      perPage={perPage}
                      totalUsers={userRoles.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  {/* </Box> */}
                </Col>
              </Row>
          </Col>
        </Row>
            </CardLayout>
      </PageLayout>
    </div>
  );
}