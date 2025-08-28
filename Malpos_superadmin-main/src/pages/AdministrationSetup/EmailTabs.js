import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmailSenderList from "./EmailSender";
import EmailConfiguration from "./EmailReceipientConfiguration";

export default function EmailTabs() {
  const [key, setKey] = useState("tab1");

  return (
    <div>
      <PageLayout>
            <CardLayout>
        <Row>
          <Col md={12}>
              <Row>
                <Col md={12}>
                  {/* <Box className="construction-edit"> */}
                    <Box className="construction-edit-h5">
                      <h5 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>{`Email Configuration`}</h5>
                    </Box>
                    {/* <Box className="construction-edit-icons">
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
                    </Box> */}
                  {/* </Box>  */}
                 </Col>
              </Row>
            {/* </CardLayout> */}
          </Col>
          <Col md={12}>
            {/* <CardLayout> */}
              <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="tab1" title="Sender Email Setup">
                  <div className="tabContent additiona-infoTab">
                    <EmailSenderList />
                  
                  </div>
                </Tab>

                <Tab eventKey="tab4" title="Recipient Emails Setup">
                  <div className="tabContent additiona-infoTab">
                     <EmailConfiguration />
                  </div>
                </Tab>
               
              </Tabs>
          </Col>
        </Row>
            </CardLayout>
      </PageLayout>
    </div>
  );
}