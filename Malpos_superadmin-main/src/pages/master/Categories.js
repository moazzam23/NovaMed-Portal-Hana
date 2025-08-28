import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import AccountsCatTab from "../../components/Tabs/AccountsCatTab";
import IngredientscatTab from "../../components/Tabs/IngredientscatTab";
import MenuCateTab from "../../components/Tabs/MenuCateTab";
import PageLayout from "../../layouts/PageLayout";

export default function Categories() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <Row>
              <CardLayout>
                <h3>Categories</h3>
              </CardLayout>
            </Row>
          </Col>

          <Col md={12}>
            <Row>
              <CardLayout>
                <Col md={12}>
                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={activeTab === 0 ? "active " : ""}
                    >
                      Menu categories
                    </button>
                    <button
                      onClick={() => handleTabClick(1)}
                      className={activeTab === 1 ? "active" : ""}
                    >
                      Ingredients categories
                    </button>
                    <button
                      onClick={() => handleTabClick(2)}
                      className={activeTab === 2 ? "active" : ""}
                    >
                      Accounting categories
                    </button>
                  </Box>
                  <Row>
                    <Col md={12}>
                      <div>
                        {activeTab === 0 && (
                          <Box className="cate-Tabs-main">
                            <MenuCateTab />
                          </Box>
                        )}
                        {activeTab === 1 && (
                          <Box className="cate-Tabs-main">
                            <IngredientscatTab />
                          </Box>
                        )}
                        {activeTab === 2 && (
                          <Box className="cate-Tabs-main">
                            <AccountsCatTab />
                          </Box>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </CardLayout>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
