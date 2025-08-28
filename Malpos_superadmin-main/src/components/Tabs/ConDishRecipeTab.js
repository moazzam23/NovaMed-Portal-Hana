import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
import { Input } from "../elements";
import { Image } from "../elements";
import { Box } from "../elements";
import ColorDivs from "./ColorDivs";
import { FormLabel } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function ConDishRecipeTab() {
    const [multiSelect, setMultiSelect] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleMultiSelectShow = () => {
        setMultiSelect(!multiSelect)
    }
    return (
        <div>
            <Row>
                <Col md={8}>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <Col md={12}>
                                    <Box className="product-varient-tab-main">
                                        <Box className="varient-tab varient-tab-main-name">
                                            <FormLabel>Name</FormLabel>
                                        </Box>
                                        <Box className="varient-tab varient-tab-main-barcode">
                                            <FormLabel>Barcode</FormLabel>
                                        </Box>
                                        <Box className=" varient-tab varient-tab-main-cost">
                                            <FormLabel>Cost</FormLabel>
                                        </Box>

                                        <Box className="varient-tab varient-tab-main-price">
                                            <FormLabel>Price</FormLabel>
                                        </Box>
                                    </Box>
                                </Col>

                                <Box className="product-varient-tab-main-textfield">
                                    <Box className="varient-tab-textfield varient-tab-main-name-textfield">
                                        <input type="text" />
                                    </Box>
                                    <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
                                        <input type="text" />
                                    </Box>
                                    <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
                                        <input type="text" />
                                    </Box>

                                    <Box className="varient-tab-textfield varient-tab-main-price-textfield">
                                        <input type="text" />
                                    </Box>
                                    <Box className="conDishRecipe-xmark">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Box>
                                </Box>
                                <Col md={8}>
                                    <Row>
                                        <Col md={4}>
                                            <p className="con-dish-total-p">Total : </p>
                                        </Col>
                                        <Col md={4}>
                                            <p className="con-dish-total-p">0.0000 Kg : </p>

                                        </Col>
                                    </Row>
                                </Col>
                                <Box className="dish-tab-main-btn">
                                    <button onClick={handleMultiSelectShow} className="dish-tab-main-textfield-btn"><FontAwesomeIcon icon={faBars} /> Multi Select</button>
                                    <button className="dish-tab-main-textfield-btn"><FontAwesomeIcon icon={faPlus} /> Add</button>
                                    {
                                        multiSelect ?
                                            <Col md={12} className="multi-select-box-col">
                                                <Box className="multi-select-box">
                                                    <Box className="multi-select-box-inner">

                                                        <Row>
                                                            <Col md={12}>
                                                                <LabelField
                                                                    type="search"
                                                                    placeholder="search ..."
                                                                    fieldSize="w-100 h-md f-cus-13"
                                                                />
                                                            </Col>
                                                            <Col md={6} className="p-0">
                                                                <Box className="multi-select-box-left">

                                                                    <p>Ingredients</p>
                                                                    <Box className="multi-select-box-left-items">
                                                                        <span>9OZ - كوب ورقي</span>
                                                                        <span id="multi-select-box-items-span">Pcs</span>
                                                                    </Box>
                                                                    <Box className="multi-select-box-left-items">
                                                                        <span >9OZ - كوب ورقي</span>
                                                                        <span id="multi-select-box-items-span">Pcs</span>
                                                                    </Box>
                                                                </Box>

                                                            </Col>
                                                            <Col md={6} className="p-0">
                                                                <Box className="multi-select-box-right">
                                                                    <p>Ingredients</p>
                                                                    <Box className="multi-select-box-right-items">
                                                                        <span>9OZ - كوب ورقي</span>
                                                                        <span id="multi-select-box-items-span">Pcs</span>
                                                                    </Box>
                                                                </Box>
                                                            </Col>
                                                            <Col md={12}>
                                                                <Box className='multi-select-box-btn'>
                                                                    <Box className="multi-select-box-btn-create-ingre">
                                                                        <button onClick={handleShowModal}>Create Ingredients</button>
                                                                        <Modal show={showModal} onHide={handleCloseModal} top>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title style={{ fontSize: "13px" }}>Create new set</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                <Box className="modifier-main-popup">
                                                                                    <LabelField
                                                                                        option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                                                                                        fieldSize="w-100 h-md modifier-textf-mb"
                                                                                    /> <LabelField
                                                                                        option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                                                                                        fieldSize="w-100 h-md modifier-textf-mb"
                                                                                    />
                                                                                    <LabelField
                                                                                        type="text"
                                                                                        placeholder="name"
                                                                                        fieldSize="w-100 h-md f-cus-13"
                                                                                    />


                                                                                </Box>
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button onClick={handleCloseModal}>Add</Button>
                                                                            </Modal.Footer>
                                                                        </Modal>
                                                                    </Box>
                                                                    <Box className="multi-select-box-btn-save">
                                                                        <button>Select All</button>
                                                                        <button className="multi-select-box-btn-save-save">Save</button>

                                                                    </Box>
                                                                </Box>
                                                            </Col>
                                                        </Row>
                                                    </Box>
                                                </Box>

                                            </Col>
                                            : ""
                                    }

                                </Box>
                                <Col md={4}>
                                    <LabelField
                                        label="Week"
                                        option={["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"]}
                                        fieldSize="w-100 h-md"

                                    />
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
                                                label="Price"
                                                fieldSize="w-100 h-md"

                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
