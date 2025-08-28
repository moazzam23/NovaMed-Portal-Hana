import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Box,Text } from '../elements'

export default function ReceiptEditStockTab() {
  return (
    <div>
        <Row>
            <Col md={12}>
                <Box className="check-status-stock">
                   <Text as="span">Status</Text>
                   <Box className="processed-check">
                    Processed <Text as="span"><FontAwesomeIcon icon={faCheck}/> </Text>
                   </Box>
                </Box>
            </Col>
            <Col md={12}>
                <Box className='receipt-stock-table-wrap'>
                <Table>
                    <thead className="thead-modifier">
                        <tr>
                        <th className='th-stock-w350'>Product & Ingredients</th>
                        <th className='th-stock-w200'>Storage</th>
                        <th className='th-stock-w200'>Quantity</th>
                        <th className='th-stock-w200'>Total</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                        <td className='td-stock-w350'>(Goods --- Espresso اسبريسو)</td>
                        <td className='td-stock-w200'>-</td>
                        <td className='td-stock-w200'>1</td>
                        <td className='td-stock-w200'>0.334 SAR</td>
                        </tr>
                    </tbody>

                </Table>
                </Box>
            </Col>
        </Row>
    </div>
  )
}
