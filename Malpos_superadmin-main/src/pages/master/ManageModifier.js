import React from 'react'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { Col,Row } from 'react-bootstrap'
import { Box } from '../../components/elements'
import { LabelField } from '../../components/fields'
import data from "../../data/master/categoriesList.json";
import CategoryTable from '../../components/tables/CategoryTable'
export default function ManageModifier() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        <Row>
                            <Col md={12}>
                                <h3>Manage modifier</h3>
                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                    <Row>
                                <Col md={10}>
                                    <Row>
                                        <Col md={3}>
                                            <LabelField

                                                type="search"
                                                // label={item.label}
                                                placeholder="Search"
                                                labelDir="label-col"
                                                fieldSize="field-select w-100 h-md cate-select "
                                            />                                    </Col>
                                    </Row>
                                </Col>
                                <Col md={2}>
                                    <Row>
                                        <Col md={12}>
                                            <Box className='station-right-btn'>
                                                <button>Create</button>
                                            </Box>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Col md={12}>
                                <Row>
                                    <Col md={12}>
                                    <Box className="table-menuCat">
        <Col md={12}>
          <CategoryTable
            thead={data?.menuCategory.thead}
            tbody={data?.menuCategory.tbody}
          />
        </Col>
      </Box>
                                    </Col>
                                </Row>
                    
                </Col>
                    </CardLayout>
                </Col>
                
            </Row>
        </PageLayout>
    </div>
  )
}
