import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Tabs, Tab } from "react-bootstrap";
import ConProductGeneralTab from "../../components/Tabs/ConProductGeneralTab";
import ConProductVarientTab from "../../components/Tabs/ConProductVarientTab";
import ConProductEmenuTab from "../../components/Tabs/ConProductEmenuTab";
import { Link } from "react-router-dom";

export default function ConstructureProduct() {
  const [key, setKey] = useState("tab1");

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
                      <h5>{`Create (Good Spicy Cofee)`}</h5>
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
              <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="tab1" title="General">
                  <div className="tabContent additiona-infoTab">
                    <ConProductGeneralTab />
                  </div>
                </Tab>

                <Tab eventKey="tab4" title="Variant">
                  <div className="tabContent additiona-infoTab">
                    <ConProductVarientTab />
                  </div>
                </Tab>
                <Tab eventKey="tab5" title="eMenu">
                  <div className="tabContent additiona-infoTab">
                    <ConProductEmenuTab />
                  </div>
                </Tab>
              </Tabs>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
