import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { LabelField,LabelTextarea } from '../fields'
export default function Inventory() {
  return (
    <div>

            <Row>
                <Col md={8}>
                <LabelField type="text"  placeholder="SKU" label="SKU" fieldSize="w-100 h-md" />
                <LabelField type="number" placeholder="0" label="Product Name" fieldSize="w-100 h-md" />
           
   
                  </Col>
            </Row>
    </div>
  )
}
