import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductsTable } from "../tables";
import data from "../../data/master/ecommerce.json";
import { ProductsCard } from "../cards";
import ProductCardRecipe from "../cards/ProductCardRecipe";
import { Table } from "react-bootstrap";

export default function ReciepePreparationTab({ data }) {
  return (
    <div>
      <Col md={8}>
        <Row>
          <Col md={9}>
            <Table>
              <thead className="thead-modifier">
                <tr>
                  <th>Name</th>
                  <th className="recipePre-tab">Gross</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.heading}</td>
                  <td className="recipePre-tab">{data.weight}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td className="recipePre-tab">Dessert</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td className="recipePre-tab">Dessert</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td className="recipePre-tab">Dessert</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
