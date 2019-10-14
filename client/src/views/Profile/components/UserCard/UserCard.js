import React, { useEffect } from 'react'
import {
    Row, 
    Col, 
    Card, 
    CardBody, 
    ListGroup, 
    ListGroupItem
} from 'reactstrap'
import { connect } from "react-redux";
import {fetchAccountData} from 'modules/account'
import AvatarModal from 'components/AvatarModal/AvatarModal'

import './UserCard.scss'

const UserCard = ({
    fetchAccount,
    accountData,
    state
}) => {

    useEffect(()=> {
        fetchAccount()
    }, [])

    return (
        <div className="UserCard text-center">
            
            <Card>
                <CardBody className="position-relative">
                    <span className="badge p-2 badge-danger position-absolute text-capitalize" >
                        {accountData.roles}
                    </span>
                    <Row>
                        <Col>
                            <AvatarModal />
                         </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>{accountData.firstName} {accountData.lastName}</h2>
                            {/* <h5 className="text-muted font-weight-normal">Brother's Floor Covering</h5> */}
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
                                    <h5 className="text-muted font-weight-normal">Oct. 5th, 2019</h5>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Orders Placed</h5>
                                    <h5 className="text-muted font-weight-normal">48</h5>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between">
                                    <h5>Store Locations</h5>
                                    <h5 className="text-muted font-weight-normal">{accountData.storesCount}</h5>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ account }) => {
    const { accountData, state } = account;
    return { accountData, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccount: () => {
            dispatch(fetchAccountData());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCard);

