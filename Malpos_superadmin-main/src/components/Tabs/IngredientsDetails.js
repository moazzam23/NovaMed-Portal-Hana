import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import data from "../../data/master/ingredients.json";
import PageLayout from "../../layouts/PageLayout";
import { Button, Box } from "../../components/elements";
import IngredientsTabs from "./IngredientsTabs";
import { Link, useLocation, useParams } from "react-router-dom";
export default function IngredientsDetails() {
  // const handleClose = () => {
  //   window.location.href = "/ingredient";
  // };
  const location = useLocation();
  const id = location.state.id;
  return (
    <>
      <PageLayout>
        {data.ingredients.tbody
          .filter((item) => {
            return item.id == id;
          })
          .map((item, i) => (
            <CardLayout className="mb-4" key={i}>
              <Box className="productedit-edit">
                <h3>
                  {data.pageTitle} #{item.item}: {item.heading}
                </h3>
                <Box className="addproduct-new">
                  <Link to="/ingredient" className="addproduct-btn ">
                    <img
                      className="fas fa-user"
                      src="/images/icons/close1.png"
                      alt="Close"
                    />
                  </Link>
                  {/* <Button onClick={handleClose} className="addproduct-btn ">
                    <img
                      className="fas fa-user"
                      src="/images/icons/close1.png"
                      alt="Close"
                    />
                  </Button> */}
                </Box>
              </Box>
            </CardLayout>
          ))}

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col md={12}>
                <IngredientsTabs />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </PageLayout>
    </>
  );
}
