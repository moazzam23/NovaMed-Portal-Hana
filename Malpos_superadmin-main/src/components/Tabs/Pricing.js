import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { LabelField,LabelTextarea } from '../fields'
export default function Pricing() {
  return (
    <div>
            <Row>
                <Col md={8}>
                <LabelField type="number" placeholder="0" label="Tax Excluded Price" fieldSize="w-100 h-md" />
                <LabelField type="number" placeholder="0"  label="Tax Included Price" fieldSize="w-100 h-md" />
                <LabelField type="number" placeholder="0"  label="Tax Pay" fieldSize="w-100 h-md" />
                <LabelField type="number"  placeholder="0" label="Compare Tax" fieldSize="w-100 h-md" />
   
                  </Col>
            </Row>
    </div>
  )
}
