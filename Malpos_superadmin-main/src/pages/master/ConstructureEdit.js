import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box, Label } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LabelField } from "../../components/fields";
import { Form } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ConstructureEdit() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <Box className="construction-edit">
                    <Box className="construction-edit-h5">
                      <h5>Category / Create</h5>
                    </Box>
                    <Box className="construction-edit-icons">
                      <Box className="edit-icons">
                        <Link to="/constructure" className="addproduct-btn ">
                          <img
                            className="fas fa-user"
                            src="/images/icons/check.png"
                            alt="Save"
                          />
                        </Link>

                        <Link to="/constructure" className="addproduct-btn ">
                          <img
                            className="fas fa-user"
                            src="/images/icons/close1.png"
                            alt="Close"
                          />
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={4}>
                  <Col md={12}>
                    <LabelField
                      type="text"
                      label="Name"
                      fieldSize="w-100 h-md"
                      value="Expresso"
                    />
                    <Col md={12}>
                      <FormLabel>Parent category</FormLabel>

                      <LabelField
                        option={[
                          "Select Parent category",
                          "Sea food",
                          "Expresso",
                          "Ice drink",
                          "Pizza",
                        ]}
                        fieldSize="w-100 h-md "
                      />
                    </Col>
                    <Col md={12}>
                      <FormLabel>Inactive</FormLabel>
                      <Form.Check type="switch" id="custom-switch" label="" />
                    </Col>
                    <Col md={12}>
                      <Form>
                        <Form.Group controlId="formFile">
                          <Form.Label>Image</Form.Label>
                          <Box className="pl-img">
                            <img
                              src="/images/product/expresso.jpg"
                              alt="image"
                            />
                          </Box>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Col>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
