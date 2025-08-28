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

export default function Usersp() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
   const companyDB = localStorage.getItem("companyDB");
  const [roleName, setRoleName] = useState([]);

useEffect(() => {
  // fetchProjects();
  fetchRoles();
}, []);



const fetchRoles = async () => {
  const res = await axios.get(`${BASE_URL}/api/roles?companyDB=${companyDB}`);
  setRoleName(res.data);
};

const getroleName = (userId) => {
  return roleName.find(u => u.ID === userId)?.NAME || "Unknown";
};


  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users?companyDB=${companyDB}`);
      setUsers(response.data);
      console.log(response)
    } catch (error) {
      console.log("Error retrieving users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}?companyDB=${companyDB}`);
      toast.success("User deleted successfully", { autoClose: 3000 });
      getUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("UpdateUserId", id);
    localStorage.setItem("UpdateUserBtn","Update User")
  };


  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageLayout>
      <CardLayout>
      <Row>
        {/* <Col md={12}>
          <CardLayout>
            <h3>Users</h3>
          </CardLayout>
        </Col> */}

        <Col md={12}>
                                      {/* <CardLayout> */}
                                        <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
                            
                                        <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Users Detail</h3>
                             <Link to="/create-user">
                              <button className="premium-btn premium-create">
                                <FontAwesomeIcon icon={faPlusCircle} /> Create user
                              </button>
                            </Link>
                                  </div>
                                  {/* </CardLayout> */}
                                    </Col>
        <Col md={12}>
            <Row>
              {/* <Col md={12}>
                <Box className="Roles-btn-flex">
                  <Link to="/create-user">
                    <button className="premium-btn premium-create">
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </button>
                  </Link>
                </Box>
              </Col> */}
              <Col md={12}>
                {/* <Box className="Roles-table-wrappper">
                  <Table className="f-13 mc-table" responsive>
                    <thead className="mc-table-head primary custom-table-header text-center"> */}
                    

                     <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                  <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>
                      <tr style={{fontSize:"12px"}}>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                
                        <th>Role</th>
                        <th>SAP User Code</th>
                        <th>SAP Username</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="mc-table-body">
                      {currentUsers.map((user,index) => (
                        <tr className="slide-in-right" style={{
                          animationDelay: `${index * 0.1}s`,
                        }}  key={user.ID}>
                          <td>{user.ID}</td>
                          <td>{user.USERNAME}</td>
                          <td>{user.NAME}</td>
                          <td>{user.EMAIL}</td>
                          <td>{user.PHONE}</td>
                          <td>{user.GENDER}</td>
<td>{user.SAPUSERCODE}</td>
<td>{user.SAPUSERNAME}</td>

                          <td>{getroleName(user.ROLEID)}</td>
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
                                <Link to="/create-user" onClick={() => handleEdit(user.ID)}>
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
</div></div>                  {users.length > 0 && (
                    <Pagination
                    perPage={perPage}
                      totalUsers={users.length}
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