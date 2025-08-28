import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Text } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { Link } from "react-router-dom";
import CustomSearch from "../../components/CustomSearch";
import axiosInstance from "../../apis";
import CustomModal from "./Modal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

  const getBrands = async () => {
    try {
      const response = await axiosInstance.get("/cdbrand");
      setBrands(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };
  //   Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentBrands = filteredBrands.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBrands();
  }, []);


  const handleDelete = (id) => {
    setBranchToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (branchToDelete) {
    try {
      await axiosInstance.delete(`/cdbrand_delete/${branchToDelete}`);
      getBrands();
      // const updatedBranches = branches.filter((branch) => branch.id !== id);
      // setBranches(updatedBranches);
      toast.success("Brand deleted successfully", {
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
  // const handleDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/cdbrand_delete/${id}`);
  //     getBrands();
  //     const updatedBrands = brands.filter((brand) => brand.id !== id);
  //     setBrands(updatedBrands);
  //     toast.success("Brand deleted successfully", {
  //       autoClose: false,
  //       closeButton: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleEdit = (id) => {
    localStorage.setItem("brandId", id);
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Brands</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                {/* <Col md={1} className="clients-btn-box mt0-col-2">
                 
                </Col> */}
                <Col md={12} className={"mt0-col-2"}>
                  <Box className={"users-btn-flex"}>
                    <Box className={"clients-btn-box"}>
                      <Text className="faArrowLeft-client" as="span">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </Text>
                    </Box>
                    <Col xs={12} sm={12} md={3} lg={3}>
                      <CustomSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                    <Link to="/create-brand" style={{marginLeft:"50%"}}>
                      <button className="btn-create">
                        {" "}
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Box>
                </Col>

                <Col md={12}>
                  <Box>
                    <Box className={"brands"}>
                      <Table responsive>
                        <thead className="f-13 thead custom-table-header text-center">
                          <tr className="thead">
                            <th className="th-w5">Id</th>
                            <th className="th-w15">Name</th>
                            <th className="th-w10">IsActive</th>
                            <th className="th-w5">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="f-13 text-center">
                          {currentBrands &&
                            currentBrands.map((brand) => (
                              <tr className="tbody" key={brand.cd_brand_id}>
                                <td>{brand.cd_brand_id}</td>
                                <td>{brand.name}</td>
                                <td
                                  style={{
                                    color: brand.is_active ? "green" : "red",
                                  }}
                                >
                                  {brand.is_active ? "Yes" : "No"}
                                </td>
                                <td>
                                  <Box className="d-flex flex-row justify-content-center">
                                    <Box>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        color="#ee3432"
                                        className="px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleDelete(brand.cd_brand_id);
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Link to={"/create-brand"}>
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() => {
                                            handleEdit(brand.cd_brand_id);
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
                        totalUsers={filteredBrands.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    </Box>
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
