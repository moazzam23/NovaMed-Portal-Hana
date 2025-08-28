import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Box } from '../elements'
import InputDomain from '../fields/InputDomain'
import { LabelField } from '../fields'
import MultiSelectField from '../fields/MultiSelectField'

export default function CreateBrandSubTab() {
    return (
        <div>
            <Row>
                <Box className={'p-20'}>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <MultiSelectField/>
                            </Col>
                            <Col md={6}>
                                <MultiSelectField/>
                            </Col>
                        <Col md={12}>
                                <Box className={'input-domain-wrapper'}>
                                <InputDomain/>
                                </Box>
                            </Col>
                            <Col md={12}>
                                <Box className={'input-domain-wrapper'}>
                                <InputDomain/>
                                </Box>
                            </Col>
                            <Col md={8}>
                                <LabelField type={'date'} placeholder={'Expiration'} label={"Expiration"}/>
                            </Col>
                            <Col md={6}>
                                <button className='cus-btn'> Save</button>
                                <button className='cus-btn-bor'>  Create</button>

                            </Col>
                        </Row>
                    </Col>
                </Box>
            </Row>
        </div>
    )
}
