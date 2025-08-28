import React from "react";
import { Row, Col } from "react-bootstrap";

import { Table } from "react-bootstrap";

export default function IngredientPreTab() {
  return (
    <div>
      <Col md={8}>
        <Row>
          <Col md={12}>
            <Table>
              <thead className="thead-modifier">
                <tr>
                  <th>Name</th>
                  <th className="recipePre-tab">Use Volume</th>
                  <th className="recipePre-tab">Price</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
