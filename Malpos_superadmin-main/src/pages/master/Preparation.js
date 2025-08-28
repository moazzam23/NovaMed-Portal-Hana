import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/preparationList.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Button, Input, Box, Label } from "../../components/elements";
import PreparationTable from "../../components/tables/PreparationTable";

export default function Preparation() {
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="Preparation"></Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
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
              <Col md={7}>
                <Row className="product-filter-pl">
                  {data?.preparation.filter.map((item, index) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={2}
                      lg={3}
                      key={index}
                      className="col-2-filters"
                    >
                      <LabelField
                        type={item.type}
                        // label={item.label}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        fieldSize="field-select  w-sm h-md "
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col sm={12} md={2} lg={2}>
                <Button className="add-product-btn-pl">+ Create</Button>
              </Col>

              <Col xl={12}>
                <PreparationTable
                  thead={data?.preparation.thead}
                  tbody={data?.preparation.tbody}
                />
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
