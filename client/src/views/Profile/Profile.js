import React from 'react'

import {Row, Col, Container} from 'reactstrap'
import UserCard from './components/UserCard'
import TabContainer from './components/TabContainer'

import './Profile.scss'

const Profile = () => {
    return (
        <Container fluid className="animated fadeIn">
            <Row>
                <Col lg={4}>
                    <UserCard />
                </Col>
                <Col lg={8}>
                    <TabContainer />
                </Col>
            </Row>
        </Container>
    )
}

export default Profile
