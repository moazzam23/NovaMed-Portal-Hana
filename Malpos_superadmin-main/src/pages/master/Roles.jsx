import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
// import { Pagination } from "react-bootstrap";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import MultiSelectField from "../../components/fields/MultiSelectField";
import { Link } from "react-router-dom";
import { Box, Text } from "../../components/elements";
import axiosInstance from "../../apis";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const companyDB = localStorage.getItem("companyDB");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const getRoles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/roles?companyDB=${companyDB}`);
      console.log(response)
      setRoles(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  useEffect(() => {
    console.log("in");
    getRoles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/roles/${id}?companyDB=${companyDB}`);
      getRoles();
      toast.success("role deleted successfully", {
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("updateroleId", id);
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentRoles = roles.slice(indexOfFirstUser, indexOfLastUser);

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
              <h3>Roles</h3>
            </CardLayout>
          </Col> */}
          <Col md={12}>
                              {/* <CardLayout> */}
                                <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
                    
                                <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Roles</h3>
                     <Link to="/roles-create">
                      <button className="premium-btn premium-create">
                        <FontAwesomeIcon icon={faPlusCircle} /> Create Role
                      </button>
                    </Link>
                          </div>
                          {/* </CardLayout> */}
                            </Col>
          <Col md={12}>
              <Row>
                <Col md={12} className={"mt0-col-2"}>
                  <Box className={"Roles-btn-flex"}>
                    {/* <Box className={"clients-btn-box"}>
                      <Text className="faArrowLeft-client" as="span">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </Text>
                    </Box> */}
                    {/* <Link to="/roles-create">
                      <button className="premium-btn premium-create">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link> */}
                    {/* <Box className={"w-300"}>
                      <MultiSelectField />
                    </Box> */}
                  </Box>
                </Col>
                {/* <Col md={2} className={"mt0-col-2"}>
                </Col> */}
                <Col md={12}>
                  {/* <Box className={"Roles-table-wrappper"}>
                    <Table className="f-13 mc-table" responsive>
                      <thead className="mc-table-head primary custom-table-header text-center"> */}
                       <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                  <div className="premium-table-container">
  <div className="premium-table-wrapper" >
    <table className="premium-table" >
      <thead >
                        <tr >
                          <th className="th-w5">Id</th>
                          <th className="th-5">Name</th>
                          <th className="th-5">Description</th>

                          {/* <th className="th-w5">Role Type</th> */}
                          <th className="th-w5">Action</th>
                        </tr>
                      </thead>
                      <tbody  className="mc-table-body">
                        {currentRoles &&
                          currentRoles.map((role) => (
                            <tr key={role.ID}>
                              <td>{role.ID}</td>
                              
                              <td>{role.NAME}</td>
                              <td>{role.DESCRIPTION}</td>

                              {/* <td>{role.role_type}</td> */}
                              <td>
                                <Box
                                  className={
                                    "justify-content-center px-2 client-action-icons"
                                  }
                                >
                                  <Box
                                    style={{ cursor: "pointer" }}
                                    className={"px-3"}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      color="#ee3432"
                                      onClick={() => handleDelete(role.ID)}
                                    />
                                  </Box>
                                  <Box>
                                    <Link
                                      to={"/roles-create"}
                                      onClick={() => {
                                        handleEdit(role.ID);
                                      }}
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        color="#f29b30"
                                      />
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
                    </div></div>
                    {Roles && (
                      <Pagination
                        perPage={perPage}
                        totalUsers={roles?.length}
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
    </div>
  );
}