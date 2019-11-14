import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {Row, Col, Container} from 'reactstrap'
import UserCard from './components/UserCard'
import TabContainer from './components/TabContainer'
import { fetchAccountData } from "modules/account";

import './Profile.scss'

const Profile = ({
    match,
    fetchAccount,
    accountData
}) => {

    useEffect(()=> {
        fetchAccount(match.params.id);
    }, [])

    return (
        <Container fluid className="animated fadeIn">
            <Row>
                <Col lg={4}>
                    <UserCard accountData = {accountData} />
                </Col>
                <Col lg={8}>
                    <TabContainer />
                </Col>
            </Row>
        </Container>
    )
}


const mapStateToProps = ({ account }) => {
    const {accountData} = account
    return { accountData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccount: (id) => {
            dispatch(fetchAccountData(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
