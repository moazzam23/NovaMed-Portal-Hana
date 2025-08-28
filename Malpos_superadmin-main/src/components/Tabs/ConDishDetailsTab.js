import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
import { Input } from "../elements";
import { Image } from "../elements";
import { Box } from "../elements";
import ColorDivs from "./ColorDivs";
import { FormLabel } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState } from "react";
export default function ConDishDetailsTab() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showDetails = () => {
    setShow(!show);
  };
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <LabelField
                type="text"
                label="Product Name"
                fieldSize="w-100 h-md"
                value="Fish"
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
                label="Accounting Category"
                option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                fieldSize="w-100 h-md"
                disabled
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Station"
                option={["Kitchen", "Hotbar", "Shisha"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            {/* <Col md={6}>
            <LabelField
              type="number"
              placeholder="0"
              label="Cost price"
              fieldSize="w-100 h-md"
            />
          </Col> */}
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
                label="Maxium day of product return"
                fieldSize="w-100 h-md"
                disabled
              />
            </Col>
            <Col md={6}>
              <FormLabel>Hide</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
              <Box className="basicInfo-checkBoxes">
                <Form.Check type="checkbox" label="Ignor Stock" />
                <Form.Check type="checkbox" label="Gifts" />
                <Form.Check type="checkbox" label="Portion" />
                <Form.Check type="checkbox" label="Can't be Discounted" />
                <Form.Check type="checkbox" label="Sold by Weight" disabled />
              </Box>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Product image</Form.Label>
                      <Box className="pl-img">
                        <img src="/images/product/fish.jpg" alt="image" />
                      </Box>
                      {/* <input type="file" onChange={handleImageChange} />
                      <button onClick={handleImageUpload}>Upload</button>
                      {selectedImage && (
                        <div
                          style={{
                            maxWidth: "300px",
                            maxHeight: "300px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      )} */}
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <ColorDivs />
                </Col>
                <Col md={12}>
                  <FormLabel>According to Venue</FormLabel>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onClick={showDetails}
                  />
                </Col>
                {show ? (
                  <div>
                    <Col md={12}>
                      <Table>
                        <thead className="thead-recipe">
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="">Inactive</th>
                            <th className=""> Hide on e-menu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Main</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>B2</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>Bakery</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </div>
                ) : (
                  ""
                )}

                <Col md={12}>
                  <Row>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Cost Price"
                        fieldSize="w-100 h-md"
                        disabled
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Extra Cost Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Sale Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
