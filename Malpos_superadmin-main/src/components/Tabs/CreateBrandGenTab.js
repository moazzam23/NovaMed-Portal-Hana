import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Box } from '../elements'
import { LabelField } from '../fields'
import InputDomain from '../fields/InputDomain'
import MultiSelectField from '../fields/MultiSelectField'

export default function CreateBrandGenTab() {
    return (
        <div>
            <Row>
                <Box className={'p-20'}>

                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <Box className={'input-domain-wrapper'}>
                                <InputDomain/>
                                </Box>
                            </Col>
                            <Col md={6}>
                                <LabelField type={'text'} placeholder="Title" label={'Title'} />
                            </Col>
                            <Col md={6}>
                                <LabelField type={'password'} placeholder="Password" label={'Password'} />
                            </Col>
                            <Col md={6}>
                                <MultiSelectField />
                            </Col>
                            <Col md={6}>
                                <MultiSelectField />
                            </Col>
                            <Col md={6}>
                                <MultiSelectField />
                            </Col>
                            <Col md={6}>
                                <MultiSelectField />
                            </Col>
                            <Col md={8}>
                                <MultiSelectField />
                            </Col>
                            <Col md={8}>
                                <MultiSelectField />
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
