import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Box } from '../elements'

export default function ReceiptEditReturnTab() {
  return (
    <div>
        <Row>
            <Col md={12}>
                <Box className='product-return-table-wrap'>
                    <Table>
                        <thead className="thead-modifier">
                            <tr>
                            <th>Id</th>
                            <th>Waiter</th>
                            <th>Amount</th>
                            <th>Operated at</th>
                            </tr>
                        </thead>
                        {/* table body remaning */}
                    </Table>
                </Box>
            </Col>
        </Row>
    </div>
  )
}
