import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Box } from '../elements';

const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: Handle file upload
    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <Box className="fileUpload-pv">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" />
                            </Form.Group>

                        </Form>
                    </Box>
                </Col>
            </Row>
        </>
    );
};

export default ImageUpload;
