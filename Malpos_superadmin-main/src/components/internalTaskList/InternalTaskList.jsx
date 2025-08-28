import { useState } from "react";
import { Link } from "react-router-dom";
import CardHeader from "../cards/CardHeader";
import CustomSearch from "../CustomSearch";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Text, Button } from "../elements";
import { Box } from "../elements";

const InternalTaskList = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box className="mc-card">
      <CardHeader title={title} />
      <Row>
        <Col md={9}>
          <Box className={"users-btn-flex"}>
            <Link to="/create-internal-task">
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
      <Box className="mc-table-responsive">
        <Table className="mc-table">
          <Thead className="mc-table-head primary">
            <Tr>
              <Th>Task ID</Th>
              <Th>Task Type</Th>
              <Th>From</Th>
              <Th>Assigned To</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody className="mc-table-body">
            <Tr>
              <Td>#1232</Td>
              <Td>
                <Text className={`mc-table-badge pending`}>Demo</Text>
              </Td>
              <Td>Email</Td>
              <Td>
                <Box className="mc-table-profile">
                  <Text>Test</Text>
                </Box>
              </Td>
              <Td>
                <Text className={`mc-table-badge complete`}>complete</Text>
              </Td>

              <Td>
                <Box className="mc-table-action">
                  <Anchor
                    href="/message"
                    title="Chat"
                    className="material-icons delete"
                  >
                    delete
                  </Anchor>
                  <Anchor
                    href="/user-profile"
                    title="View"
                    className="material-icons edit"
                  >
                    edit
                  </Anchor>
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default InternalTaskList;
