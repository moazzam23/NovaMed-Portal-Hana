import React from 'react'
import { LabelField } from '../fields'
import { Col, Row, Table, Form } from 'react-bootstrap'
import { Box } from '../elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark ,faPlus} from '@fortawesome/free-solid-svg-icons'
export default function ManageModifierGenTab() {
    return (
        <div>
            <Col md={12}>
                <Row>
                    <Col md={4}>
                        <LabelField
                            label="Name"
                            type="text" fieldSize="w-100 h-md"
                            placeholder="Name"
                        />
                    </Col>
                    <Col md={12}>
                        <Box className="manage-modifier-gen-box">
                            <Box className="manage-modifier-gen-box-inner">
                                <Box className=" modifier-gen-box-items modifier-gen-box-mod">Modifier</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-name">Name</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-img">Img</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-gross">Gross</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-def">Default</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-cp">Cost price</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-price">Price</Box>
                            </Box>
                        </Box>
                        <Box className="manage-modifier-gen-box">
                            <Box className="manage-modifier-gen-box-inner-textfield">
                                <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                                    <LabelField
                                        option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                                        fieldSize="w-100 h-md"
                                    />
                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-name">
                                    <LabelField
                                        type="text" fieldSize="w-100 h-md"
                                        placeholder="Name"
                                    />
                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-img">
                                    <img src='' alt="" />
                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-gross">
                                    <LabelField
                                        type="text" fieldSize="w-100 h-md"
                                        placeholder="0"
                                    />
                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-def">
                                    <Form.Check type="radio" aria-label="radio 1" />

                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-cp">0 SAR</Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-price">
                                    <LabelField
                                        type="text" fieldSize="w-100 h-md"
                                        placeholder="0"
                                    />
                                   

                                </Box>
                                <Box className="modifier-gen-box-items modifier-gen-box-xmart">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Box>
                            </Box>
                            
                        </Box>
                        <button className='mange-mod-tab-add-btn'><FontAwesomeIcon icon={faPlus}/> Add</button>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}
