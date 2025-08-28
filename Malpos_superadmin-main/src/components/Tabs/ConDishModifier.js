import React, { useState } from 'react'
import { Container, Form, Row, Col, Button, FormLabel } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
import { Box } from '../elements';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Table } from "react-bootstrap";
export default function ConDishModifier() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <Row>
                <Col md={8}>
                    <Col md={12}>
                        <button className="modifier-set-btn" onClick={handleShowModal}><FontAwesomeIcon icon={faPlus} /> Add Modifier Set </button>
                        <Modal show={showModal} onHide={handleCloseModal} top>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ fontSize: "13px" }}>Create new set</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Box className="modifier-main-popup">
                                    <LabelField
                                        option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                                        fieldSize="w-100 h-md modifier-textf-mb"
                                    />
                                    <LabelField
                                        type="text"
                                        placeholder="name"
                                        fieldSize="w-100 h-md f-cus-13"
                                    />
                                    <p>How many modifiers can be chosen at the same time:</p>
                                    <br />
                                    <Form.Check label='One' type='radio' name='group1' id='option1' />

                                    <span className='modifier-textf-p'>Choose one option from several. For example, pizza diameter.</span>

                                    <Form.Check label='Several' type='radio' name='group1' id='option1' />

                                    <span className='modifier-textf-p'>Any number in a given range. For example, additives to pizza.</span>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <FormLabel className='f-cus-11'>Set minimum</FormLabel>

                                                <LabelField
                                                    type="number"
                                                    placeholder="0"
                                                    fieldSize="w-100 h-md f-cus-13"
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <FormLabel className='f-cus-11'>Set maximum</FormLabel>
                                                <LabelField
                                                    placeholder="0"

                                                    type="number"
                                                    fieldSize="w-100 h-md f-cus-13"
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Box>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleCloseModal}>Add</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <LabelField
                                    type="number"
                                    placeholder="0"
                                    label="Cost Price"
                                    fieldSize="w-100 h-md"

                                />
                            </Col>
                            <Col md={4}>
                                <LabelField
                                    type="number"
                                    placeholder="0"
                                    label="Price"
                                    fieldSize="w-100 h-md"

                                />
                            </Col>
                            <Col md={4}>
                                <LabelField
                                    type="number"
                                    placeholder="0"
                                    label="Sale Price"
                                    fieldSize="w-100 h-md"

                                />
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}
