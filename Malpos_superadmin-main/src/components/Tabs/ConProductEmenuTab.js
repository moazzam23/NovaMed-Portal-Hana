import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";

import { FormLabel } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ConProductEmenuTab() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [showAbility, setShowAbility] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);

  const handleStartTimeChange = (value) => {
    setStartTime(value && value.format("HH:mm"));
  };
  const abilityDetails = () => {
    setShowAbility(true);
  };
  const abilityDetailsHide = () => {
    setShowAbility(false);
  };

  const visibilityDetails = () => {
    setShowVisibility(true);
  };
  const visibilityDetailsHide = () => {
    setShowVisibility(false);
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <FormLabel>According to Venue</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
            </Col>

            <Col md={6}>
              <LabelField
                label="Category"
                option={[
                  "Select Category",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="عربي"
                type="text"
                placeholder="Name"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Description"
                type="text"
                placeholder="Description"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="English"
                type="text"
                placeholder="English"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Description"
                type="text"
                placeholder="Description"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={12}>
              <hr />
            </Col>
            <Col md={6}>
              <LabelField
                label="عربي"
                type="text"
                placeholder="Name"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Description"
                type="text"
                placeholder="Description"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="English"
                type="text"
                placeholder="English"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Description"
                type="text"
                placeholder="Description"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6} className="emenu-tab-product-f-radio">
              <FormLabel>Item ability</FormLabel>

              <Form.Check
                type="radio"
                name="group2"
                id="option1"
                defaultChecked
                onClick={abilityDetailsHide}
                label="Always available within opening hours"
              />
              <Form.Check
                type="radio"
                name="group2"
                id="option2"
                onClick={abilityDetails}
                label="Available only during selected hours
            "
              />
            </Col>
            {showAbility ? (
              <div>
                <Col md={6}>
                  <LabelField
                    label="Week"
                    option={["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"]}
                    fieldSize="w-100 h-md"
                  />
                  <div
                    key="inline-radio"
                    className="mb-3 mt-3 emenu-tab-product-f-radio"
                  >
                    <Form.Check
                      inline
                      label="By time"
                      type="radio"
                      name="group1"
                      id="option3"
                    />
                    <Form.Check
                      inline
                      label="Select 24 hours"
                      type="radio"
                      defaultChecked
                      name="group1"
                      id="option4"
                    />
                  </div>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <TimePicker
                      value={moment(startTime, "HH:mm")}
                      onChange={handleStartTimeChange}
                      showSecond={false}
                    />
                  </Col>
                  <button className="emenu-tab-addTime-btn">
                    <FontAwesomeIcon icon={faPlus} /> Add{" "}
                  </button>
                </Col>
              </div>
            ) : (
              ""
            )}
            <Col md={6} className="emenu-tab-product-f-radio">
              <FormLabel>Item Visilbility</FormLabel>

              <Form.Check
                type="radio"
                name="group3"
                id="option5"
                defaultChecked
                onClick={visibilityDetailsHide}
                label="Always visible within opening hours"
              />
              <Form.Check
                type="radio"
                name="group3"
                id="option6"
                onClick={visibilityDetails}
                label="Visible only during selected hours
"
              />
            </Col>
            {showVisibility ? (
              <div>
                <Col md={6}>
                  <LabelField
                    label="Week"
                    option={["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"]}
                    fieldSize="w-100 h-md"
                  />
                  <div
                    key="inline-radio"
                    className="mb-3 mt-3 emenu-tab-product-f-radio"
                  >
                    <Form.Check
                      inline
                      label="By time"
                      type="radio"
                      name="group4"
                      id="option7"
                    />
                    <Form.Check
                      inline
                      label="Select 24 hours"
                      type="radio"
                      defaultChecked
                      name="group4"
                      id="option8"
                    />
                  </div>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <TimePicker
                      value={moment(startTime, "HH:mm")}
                      onChange={handleStartTimeChange}
                      showSecond={false}
                    />
                  </Col>
                  <button className="emenu-tab-addTime-btn">
                    <FontAwesomeIcon icon={faPlus} /> Add{" "}
                  </button>
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
                    placeholder="Orginal Price"
                    label="Orginal Price"
                    fieldSize="w-100 h-md"
                  />
                </Col>
              </Row>
            </Col>

            <Col md={12}>
              <Row>
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
