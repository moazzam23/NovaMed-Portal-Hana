import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ProductsTable } from '../tables';
import data from "../../data/master/ecommerce.json";
import { ProductsCard } from '../cards';
import ProductCardRecipe from '../cards/ProductCardRecipe';
import { Table } from 'react-bootstrap';
export default function UsedModifier() {
  return (
    <div>
<div>
      <Col md={8}>
        <Row>
        <Col md={12}>
        <Table>
          
      <thead className='thead-modifier'>
        <tr>
          <th>#Group </th>
          <th>Group Name </th>
      
        </tr>
      </thead>
     
    </Table>
    </Col>
        </Row>
      </Col>
    </div>
    </div>
  )
}
