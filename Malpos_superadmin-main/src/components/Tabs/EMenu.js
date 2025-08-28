import React from "react";
import { Container, Row, Col, Form, FormLabel } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
export default function EMenu() {
  return (
    <div>
      <Row>
        <Col md={4}>
          <Row>
            <Col md={12}>
              <FormLabel>Hide</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
            </Col>
            <Col md={12}>
              <LabelField
                label="Category"
                placeholder="Select Category"
                option={["Shisha", "Food", "Hot Chocolate"]}
                fieldSize="w-100 h-md"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
