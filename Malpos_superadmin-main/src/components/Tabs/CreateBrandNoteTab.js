import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Box } from '../elements'
import { LabelTextarea } from '../fields'

export default function CreateBrandNoteTab() {
  return (
    <div>
        <Row>
            <Box className={'p-20'}>
                <Col md={8}>
                    <Row>
                        <Col md={12}>
                            <LabelTextarea label={'Note'}/>
                        </Col>
                    </Row>
                </Col>
            </Box>
        </Row>
    </div>
  )
}
