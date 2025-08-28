import React, { useState } from "react";
import { Box, Text, Icon, Heading } from "../elements";
import data from "../../data/master/productList.json";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FloatCard({ variant, digit, title, icon, index }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleBoxClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      {data?.float.map((item, index) => (
        <Col key={index} sm={6} lg={4}>
          {" "}
          <a
            className={`mc-float-card ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleBoxClick(index)}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            {" "}
            <Box
              className={`mc-float-card ${item.variant}`}
              style={{ width: "100%", height: "100%" }}
            >
              <Heading>{item.title}</Heading>
              <Text>{item.digit}</Text>
              {activeIndex === index && <Icon>{item.icon}</Icon>}
            </Box>
          </a>
        </Col>
      ))}
    </>
  );
}
