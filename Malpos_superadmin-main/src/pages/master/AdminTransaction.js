import React from 'react'
import { faArrowRotateLeft, faPlus, faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row, Table } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import MultiSelectField from '../../components/fields/MultiSelectField'
import { Text } from '../../components/elements'
import { LabelField } from '../../components/fields'
import {Box} from '../../components/elements'
export default function AdminTransaction() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                      <h3>Transaction</h3>
                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                <Row>
                       
                        <Col md={12} className={'mt0-col-2'}>
                            <Box className={'users-btn-flex'}>
                            <Box className={'clients-btn-box'}>
                    <Text className="faArrowLeft-client" as="span">
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                  </Text>
                    </Box>
                                {/* <Box className={'w-150'}>
                                <MultiSelectField/>

                                </Box>
                                <Box className={'w-150'}>
                                <MultiSelectField/>

                                </Box>
                                <Box className={'w-300'}>
                                <LabelField type={'search'} placeholder={'Search'}/>

                                </Box> */}

                            </Box>

                        </Col>
                        
                        <Col md={12}>
                            <Box className={'admin-transctions'}>
                            <Table responsive>
                                <thead className='thead custom-table-header'>
                                    <tr className='f-13'>
                                    <th>ID</th>
                                    <th>Client ID</th>
                                    <th>Brand ID</th>
                                    <th>Branch ID</th>
                                    <th>Is Active?</th>
                        
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr className='f-13'>
                                    <td>Brand</td>
                                    <td>Amount</td>
                                    <td>Type</td>
                                    <td>Create at</td>
                                    <td>Note</td>
        
                                    </tr>
                                </tbody>
                            </Table>
                            </Box>
                        </Col>
                       </Row>
                       </CardLayout>

                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
