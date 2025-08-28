import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "./elements/";
import CardHeader from "./cards/CardHeader";
import Pagination from "./Pagination";
import { LabelField } from "./fields/";
import { DealsTable } from "./tables/";
import CustomSearch from "./CustomSearch";
import {
  faArrowRotateLeft,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Thead, Tbody, Th, Tr, Td } from "../components/elements/Table";
import {
  Heading,
  Anchor,
  Icon,
  Text,
  Input,
  Image,
  Button,
} from "../components/elements";

import { Row, Col } from "react-bootstrap";

export default function ClientRequest({ title }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box className="mc-card">
      <CardHeader title={title} />
      <Row>
        <Col md={9}>
          <Box className={"users-btn-flex"}>
            <Link to="/create-client-request">
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
              <Th>ID</Th>
              <Th>Client</Th>
              <Th>Email</Th>
              <Th>Request Type</Th>
              <Th>Issue Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody className="mc-table-body even">
            <Tr>
              <Td>1</Td>
              <Td>
                <Text>Client Name</Text>
              </Td>
              <Td>Email</Td>
              <Td>
                <Text className={`mc-table-badge`}>Request</Text>
              </Td>
              <Td>Request Data</Td>
              <Td>
                <Text className={`mc-table-badge`}>Request Status</Text>
              </Td>
              <Td>
                <Box className="mc-table-action">
                  <Button title="Delete" className="material-icons delete">
                    delete
                  </Button>

                  <Button title="Delete" className="material-icons edit">
                    edit
                  </Button>
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Pagination />
    </Box>
  );
}
