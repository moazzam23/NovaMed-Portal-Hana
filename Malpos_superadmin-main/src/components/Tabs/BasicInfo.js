import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
import { Input, Item } from "../elements";
import { Image } from "../elements";
import { Box } from "../elements";
import ColorDivs from "./ColorDivs";

export default function BasicInfo({ data }) {
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Product image</Form.Label>
                      <Box className="pl-img">
                        <img src={data.src} alt="image" />
                      </Box>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <ColorDivs />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <LabelField
                type="text"
                label="Product Name"
                fieldSize="w-100 h-md"
                value={data.heading}
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="text"
                label="Product Bardcode"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Category"
                option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                placeholder={data.station}
                label="Station"
                option={["Kitchen", "Hotbar", "Shisha"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder={data.costPrice}
                label="Cost price"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Taxes"
                option={["VAT 15%", "VAT 20%", "Tobacco Tax 100%"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder="0"
                label="Sale Price"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <Box className="basicInfo-checkBoxes">
                <Form.Check type="checkbox" label="Inactive" />
                <Form.Check type="checkbox" label="Gifts" />
                <Form.Check type="checkbox" label="Can't be Discounted" />
                <Form.Check type="checkbox" label="Sold by Weight" disabled />
              </Box>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
