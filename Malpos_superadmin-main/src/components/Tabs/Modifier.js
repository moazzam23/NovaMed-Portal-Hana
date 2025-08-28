import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductsTable } from "../tables";
import data from "../../data/master/ecommerce.json";
import { ProductsCard } from "../cards";
import ProductCardRecipe from "../cards/ProductCardRecipe";
import { Table } from "react-bootstrap";

export default function Modifier() {
  return (
    <div>
      <Col md={8}>
        <Row>
          <Col md={9}>
            <Table>
              <thead className="thead-modifier">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>60</td>
                  <td>Dessert</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
