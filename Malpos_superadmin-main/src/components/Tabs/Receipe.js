import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductsTable } from "../tables";
import data from "../../data/master/ecommerce.json";
import { ProductsCard } from "../cards";
import ProductCardRecipe from "../cards/ProductCardRecipe";
import { Table } from "react-bootstrap";

export default function Receipe() {
  return (
    <div>
      <Col md={8}>
        <Row>
          <Col md={12}>
            <Table>
              <thead className="thead-recipe">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th className="text-end-td">Unit</th>
                  <th className="text-end-td">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fish</td>
                  <td>Ingredients</td>
                  <td className="text-end-td">1 pcs</td>
                  <td className="text-end-td">0</td>
                </tr>
                <tr>
                  <td>Blue Juice</td>
                  <td>Ingredients</td>
                  <td className="text-end-td">1 unit</td>
                  <td className="text-end-td">0</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
