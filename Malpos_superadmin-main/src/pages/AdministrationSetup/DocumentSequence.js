import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Pagination } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";
import axios from "axios";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function DocumentSequenceList() {
  const [sequences, setSequences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
   const companyDB = localStorage.getItem("companyDB");

  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/document-sequence?companyDB=${companyDB}`);
      setSequences(res.data);
    } catch (err) {
      toast.error("Failed to fetch document sequences");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/document-sequence/${id}?companyDB=${companyDB}`);
      toast.success("Sequence deleted successfully");
      fetchSequences();
    } catch (err) {
      toast.error("Failed to delete sequence");
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("UpdateSequenceId", id);
    localStorage.setItem("UpdateSequenceBtn", "Update Sequence");
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentSequences = sequences.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageLayout>
          <CardLayout>
      <Row>
        <Col md={12}>
         <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
                                    
                                                <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Document Sequences</h3>
                                     <Link to="/create-doc-seq">
                                      <button className="premium-btn premium-create">
                                        <FontAwesomeIcon icon={faPlusCircle} /> Create
                                      </button>
                                    </Link>
                                          </div>
            {/* <h3>Document Sequences</h3> */}
          {/* </CardLayout> */}
        </Col>
        <Col md={12}>
          {/* <CardLayout> */}
            <Row>
              {/* <Col md={12}>
                <Box className="Roles-btn-flex">
                  <Link to="/create-doc-seq">
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
                        <th>ID</th>
                        <th>Document Type</th>
                        <th>Prefix</th>
                        <th>Next Number</th>
                        <th>Padding Length</th>
                        <th>Active</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mc-table-body text-center">
                      {currentSequences.length > 0 ? (
                        currentSequences.map((seq) => (
                          <tr key={seq.ID}>
                            <td>{seq.ID}</td>
                            <td>{seq.DOCUMENTTYPE}</td>
                            <td>{seq.PREFIX}</td>
                            <td>{seq.NEXTNUMBER}</td>
                            <td>{seq.PADDINGLENGTH}</td>
                            {/* <td>{seq.isActive ? "Yes" : "No"}</td> */}
                            <td>
  <input type="checkbox" checked={seq.ISACTIVE}  />
</td>

                            <td>
                              <Box className="justify-content-center px-2 client-action-icons">
                                {/* <Box className="px-3" style={{ cursor: "pointer" }}>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#ee3432"
                                    onClick={() => handleDelete(seq.id)}
                                  />
                                </Box> */}
                                <Box>
                                  <Link
                                    to="/create-doc-seq"
                                    onClick={() => handleEdit(seq.ID)}
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
                          <td colSpan="7">No document sequences found</td>
                        </tr>
                      )}
                    </tbody>
                  {/* </Table> */}
                  </table>
                  </div></div></div>

                  {sequences.length > 0 && (
                    <Pagination
                      perPage={perPage}
                      totalUsers={sequences.length}
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
  );
}