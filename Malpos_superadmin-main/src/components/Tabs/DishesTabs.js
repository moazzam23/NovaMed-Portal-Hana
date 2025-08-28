import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductsTable } from "../tables";
import data from "../../data/master/ecommerce.json";
import { ProductsCard } from "../cards";
import ProductCardRecipe from "../cards/ProductCardRecipe";
import { Table } from "react-bootstrap";

export default function DishesTabs({ data }) {
  return (
    <div>
      <Col md={8}>
        <Row>
          <Col md={12}>
            <Table>
              <thead className="thead-modifier">
                <tr>
                  <th>Name</th>
                  <th className="recipePre-tab">Use Volume</th>
                  <th className="recipePre-tab">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.heading}</td>
                  <td className="recipePre-tab">{data.volume}</td>
                  <td className="recipePre-tab">--</td>
                </tr>
                <tr>
                  <td>Gold Dust Expresso</td>
                  <td className="recipePre-tab">1,000 pcs</td>
                  <td className="recipePre-tab">--</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
