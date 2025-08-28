import React from 'react'
import { Col, Row, Table ,ListGroup,} from 'react-bootstrap'
import {List,Item,Text} from '../elements'
import { Box } from '../elements'
export default function ReceiptTabRE() {
    return (
        <div>
            <Row>
                <Col md={12}>
                    <Box className='receipt-edit-table-wrap'>
                        <Table className='receipt-edit-table' >
                            <thead className="thead-modifier">
                                <tr>
                                    <th className='th-productname-receipt'>Product</th>
                                    <th className='th-receipt-end'>Station</th>
                                    <th className='th-receipt-end'>Quantity</th>
                                    <th className='th-receipt-end'>Cost</th>
                                    <th className='th-receipt-end'>Price</th>
                                    <th className='th-receipt-end'>Tax ce</th>
                                    <th className='th-receipt-end'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='td-productname-receipt'>Create (Goods --- Espresso اسبريسو) Create (Goods --- Espresso اسبريسو)</td>
                                    <td className='td-receipt-end'>Hot Bar</td>
                                    <td className='td-receipt-end'>1</td>
                                    <td className='td-receipt-end'>-</td>
                                    <td className='td-receipt-end'>65.22 SAR</td>
                                    <td className='td-receipt-end'>9.78 SAR</td>
                                    <td className='td-receipt-end'>75.00 SAR</td>

                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                </Col>
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <Box classsName='items-cal-nam'>
                                <List className="items-cal">
                                <Item ><Text  as="span"  className="item"> Sub Total</Text></Item>
                                <Item ><Text  as="span"  className="item"> Service Charge</Text></Item>
                                <Item ><Text  as="span"  className="item"> Discount </Text></Item>
                                <Item ><Text  as="span"  className="item"> Tax amount </Text></Item>
                                <Item ><Text  as="span"  className="item"> Payments methods </Text></Item>
                                <Item ><Text  as="span"  className="item"> Additional information</Text></Item>       
                                </List>
                            </Box>
                        </Col>
                        <Col md={6}>
                        <Box classsName='items-cal-des'>
                                <List className="items-cal-des">
                                <Item ><Text  as="span"  className="item"> 65.00 SAR</Text></Item>
                                <Item ><Text  as="span"  className="item"> 00.00 SAR</Text></Item>
                                <Item ><Text  as="span"  className="item"> 00.00 SAR</Text></Item>
                                <Item ><Text  as="span"  className="item"> 9.00 SAR</Text></Item>
                                <Item ><Text  as="span"  className="item"> Cash 75.0000 SAR </Text></Item>
                                <Item ><Text  as="span"  className="item"> Receipt was open at :Takeaway</Text></Item>       
                                </List>
                            </Box>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
