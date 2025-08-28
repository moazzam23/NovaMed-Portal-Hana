import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../cards";
import { Box } from "../elements";
import { LabelField } from "../fields";
import data from "../../data/master/categoriesList.json";
import { ProductsTable } from "../tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "../tables/CategoryTable";
export default function MenuCateTab() {
  return (
    <div>
      <Box className="category-menuTab">
        <Box className="category-menuTab-left">
          <Col md={12}>
            <Row>
              <Col md={4}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="search-pl"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Box>
        <Box className="category-menuTab-right">
          <Col md={8} lg={12}>
            <Row className="cat-btn">
              {data?.menuCategory.filter.map((item, index) => (
                <Col xs={12} sm={12} md={5} lg={5} key={index} className="">
                  <LabelField
                    type={item.type}
                    // label={item.label}
                    option={item.option}
                    placeholder={item.placeholder}
                    labelDir="label-col"
                    fieldSize="field-select w-100 h-md cate-select "
                  />
                </Col>
              ))}

              <Col md={4} lg={4}>
                <button className="cateMenu-btn">+ Create</button>
              </Col>
            </Row>
          </Col>
        </Box>
      </Box>
      <Box className="table-menuCat">
        <Col md={12}>
          <CategoryTable
            thead={data?.menuCategory.thead}
            tbody={data?.menuCategory.tbody}
          />
        </Col>
      </Box>
    </div>
  );
}
