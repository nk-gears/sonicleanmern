import React, {useState, useEffect} from 'react'
import { Row, Col, Card, CardHeader, CardBody, Table, Button } from 'reactstrap'
import {connect} from 'react-redux'
import ConfirmModal from 'components/ConfirmModal/ConfirmModal'
import AddNewUserModal from 'components/AddNewUserModal/AddNewUserModal'
import './Users.scss'
import { fetchUsers } from "modules/Users";
import {showNotification, removeNotification} from 'modules/Notification'
import { REQUEST_STATUS } from '_config/constants'
import LoadingIndicator from 'common/LoadingIndicator'
const Users = ({ 
    fetchUsers, 
    usersData, 
    state, 
    addUserState,
    showNotification
}) => {

    useEffect(()=> {
        fetchUsers()
        // if(addUserState===REQUEST_STATUS.SUCCESS) {
        //     showNotification({
        //         message: 'Success Add New User',
        //         notificationState: addUserState
        //     })
        // }
    }, [])


    return (
        <div className="Users mt-5 mb-5">
            <Row>
                <Col xs="12" >
                    <Card>
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <h5 className="font-weight-normal">User Management</h5>
                            <AddNewUserModal state={state} />
                        </CardHeader>
                        <CardBody>
                            {
                                state === REQUEST_STATUS.PENDING ?
                                    <LoadingIndicator /> :
                                    <Table responsive className="table-hover ">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th className="text-right">Permission Level</th>
                                                <th className="text-right">Verification</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usersData.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.firstName} {item.lastName}</td>
                                                            <td>{item.email}</td>
                                                            <td className="text-right" >{item.roles}</td>
                                                            <td className="text-right" >{item.isVerified ? 'true': 'false'}</td>
                                                            <td className="text-right">
                                                                <ConfirmModal type={"userDelete"} id={item._id} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                 </tbody>
                                </Table>
                            }
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    const { usersData, isSubmitSuccess, addUserState, state } = users;
    return { usersData, isSubmitSuccess, addUserState, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => {
            dispatch(fetchUsers());
        },
        showNotification: () => {
            dispatch(showNotification())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(Users);