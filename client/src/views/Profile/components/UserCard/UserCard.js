import React from 'react'

import {Row, Col, Card, CardBody, ListGroup, ListGroupItem} from 'reactstrap'

import './UserCard.scss'

const UserCard = () => {
    return (
        <div className="UserCard text-center">
            
            <Card>
                <CardBody className="position-relative">
                    <span className="badge p-2 badge-danger position-absolute">Admin</span>
                    <Row>
                        <Col>
                            <img src="assets/img/avatars/8.jpg" className="img-avatar120" alt="user" />
                         </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Nina Mcintire</h2>
                            <h5 className="text-muted font-weight-normal">Brother's Floor Covering</h5>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-3">
                        <Col>
                            <ListGroup>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Account Level:</h5>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Dealer Since</h5>
                                    <h5 className="text-muted font-weight-normal">Feb. 12th, 2018</h5>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Orders Placed</h5>
                                    <h5 className="text-muted font-weight-normal">48</h5>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Store Locations</h5>
                                    <h5 className="text-muted font-weight-normal">1</h5>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserCard
