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
} from "@fortawesome/free-solid-svg-icons";
// import MultiSelectField from "../../components/fields/MultiSelectField";
import { Link } from "react-router-dom";
import { Box, Text } from "../../components/elements";
import axiosInstance from "../../apis";
import CustomModal from "./Modal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/getuser");
      setUsers(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/user_delete/${id}`);
  //     getUsers();
  //     const updatedUsers = users.filter((user) => user.id !== id);
  //     setUsers(updatedUsers);
  //     toast.success("User deleted successfully", {
  //       autoClose: 4000,
  //       closeButton: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDelete = (id) => {
    setBranchToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (branchToDelete) {
    try {
      await axiosInstance.delete(`/user_delete/${branchToDelete}`);
      getUsers();
      // const updatedBranches = branches.filter((branch) => branch.id !== id);
      // setBranches(updatedBranches);
      toast.success("user deleted successfully", {
        autoClose: 4000,
        closeButton: true,
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
   } };
 
   const cancelDelete = () => {
    setBranchToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEdit = (id) => {
    localStorage.setItem("userId", id);
    console.log("userid",id)
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Users</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12} className={"mt0-col-2"}>
                  <Box className={"users-btn-flex"}>
                    <Box className={"clients-btn-box"}>
                      <Text className="faArrowLeft-client" as="span">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </Text>
                    </Box>
                    <Link to="/users-create" style={{marginLeft:"80%"}} >
                      <button className="btn-create">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                    {/* <Box className={"w-300"}>
                      <MultiSelectField />
                    </Box> */}
                  </Box>
                </Col>
                {/* <Col md={2} className={"mt0-col-2"}>
                </Col> */}
                <Col md={12}>
                  <Box className={"users-table-wrappper"}>
                    <Table className="f-13" responsive>
                      <thead className="thead custom-table-header text-center">
                        <tr className="thead">
                          <th className="th-w5">Id</th>
                          <th className="th-20">Name</th>
                          <th className="th-20">Email</th>
                          <th className="th-5">Role</th>
                          <th className="th-w5">IsActive</th>
                          <th className="th-w5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentUsers &&
                          currentUsers.length > 0 &&
                          currentUsers.map((user) => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.role.name}</td>
                              <td
                                style={{
                                  color: user.is_active ? "green" : "red",
                                }}
                              >
                                {user.is_active ? "Yes" : "No"}
                              </td>
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
                                      onClick={() => handleDelete(user.id)}
                                    />
                                  </Box>
                                  <Box>
                                    <Link
                                      to={"/users-create"}
                                      onClick={() => {
                                        handleEdit(user.id);
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
                    </Table>
                    {users && (
                      <Pagination
                        perPage={perPage}
                        totalUsers={users?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    )}
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
      <CustomModal
  show={showDeleteModal}
  onHide={cancelDelete}
  onConfirm={confirmDelete}
/>
    </div>
  );
}
