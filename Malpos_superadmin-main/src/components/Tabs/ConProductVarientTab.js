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
export default function ConProductVarientTab() {
  const [show, setShow] = useState(false);
  const [numBoxes, setNumBoxes] = useState(1);

  const showDetails = () => {
    setShow(!show);
  };
  const [boxes, setBoxes] = useState([
    <Box key={0} className="product-varient-tab-main-textfield">
      <Box className="varient-tab-textfield varient-tab-main-name-textfield">
        <input type="text" />
      </Box>
      <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
        <input type="text" />
      </Box>
      <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
        <input type="text" />
      </Box>
      <Box className="varient-tab-textfield varient-tab-main-price-textfield">
        <input type="text" />
      </Box>
      <button onClick={() => handleRemoveBox(0)}>Close</button>
    </Box>,
  ]);
  // const [numBoxes, setNumBoxes] = useState(1);

  const handleAddBox = () => {
    const nextIndex = numBoxes;
    const newBox = (
      <Box key={nextIndex} className="product-varient-tab-main-textfield">
        <Box className="varient-tab-textfield varient-tab-main-name-textfield">
          <input type="text" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
          <input type="text" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
          <input type="number" placeholder="0" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-price-textfield">
          <input type="number" placeholder="0" />
        </Box>
        {/* <button onClick={() => handleRemoveBox(0)}>Close</button> */}
      </Box>
    );
    setBoxes([...boxes, newBox]);
    setNumBoxes(numBoxes + 1);
  };

  const handleRemoveBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
    setNumBoxes(numBoxes - 1);
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <FormLabel>Has Variants</FormLabel>
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
                      <Box className="product-varient-tab-main">
                        <Box className="varient-tab varient-tab-main-name">
                          <FormLabel>Name</FormLabel>
                        </Box>
                        <Box className="varient-tab varient-tab-main-barcode">
                          <FormLabel>Barcode</FormLabel>
                        </Box>
                        <Box className=" varient-tab varient-tab-main-cost">
                          <FormLabel>Cost</FormLabel>
                        </Box>

                        <Box className="varient-tab varient-tab-main-price">
                          <FormLabel>Price</FormLabel>
                        </Box>
                      </Box>

                      <Box className="product-varient-tab-main-textfield">
                        <Box className="varient-tab-textfield varient-tab-main-name-textfield">
                          <input type="text" />
                        </Box>
                        <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
                          <input type="text" />
                        </Box>
                        <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
                          <input type="number" placeholder="0" />
                        </Box>

                        <Box className="varient-tab-textfield varient-tab-main-price-textfield">
                          <input type="number" placeholder="0" />
                        </Box>
                      </Box>
                      {boxes.map((box, index) => {
                        return (
                          <div key={index}>
                            {box}
                            <button onClick={() => handleRemoveBox(index)}>
                              <img
                                style={{ height: "35px" }}
                                className="fas fa-user"
                                src="/images/icons/close1.png"
                                alt="Close"
                              />
                            </button>
                          </div>
                        );
                      })}
                      <Box>
                        <button
                          className="varient-tab-main-textfield-btn"
                          onClick={handleAddBox}
                        >
                          + Add
                        </button>
                      </Box>
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
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Price"
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
