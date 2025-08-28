import React from 'react'
import { Col,Row,Table } from 'react-bootstrap';
import { Box,Item,List,Text } from '../elements';
export default function ReceiptEditHistoryTab() {
  return (
    <div>
          <Row>
                <Col md={12}>
                    <Box className='receipt-edit-history-table-wrap'>
                        <Table className='receipt-edit-history-table' >
                            <thead className="thead-modifier">
                                <tr>
                                    <th className='table-history-th-w150' >Created at</th>
                                    <th className='table-history-th-w150'>Terminal</th>
                                    <th className='table-history-th-w500'>Receipt operations</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  className='table-history-td-w150'>March 22.03,2023</td>
                                    <td  className='table-history-td-w150'>1</td>
                                    <td  className='table-history-td-w500'>Create (Goods --- Espresso اسبريسو) Create (Goods --- Espresso اسبريسو)</td>
                                   

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
                               </List>
                            </Box>
                        </Col>
                        <Col md={6}>
                        <Box classsName='items-cal-des'>
                                <List className="items-cal-des">
                                <Item ><Text  as="span"  className="item"> 65.00 SAR</Text></Item>
                                <Item ><Text  as="span"  className="item"> 00.00 SAR</Text></Item>
                                 </List>
                            </Box>
                        </Col>
                    </Row>
                </Col>
            </Row>
    </div>
  )
}
