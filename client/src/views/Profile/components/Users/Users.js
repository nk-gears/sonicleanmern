import React, {useState, useEffect} from 'react'
import { Row, Col, Card, CardHeader, CardBody, Table, Button } from 'reactstrap'
import {connect} from 'react-redux'
import AddNewUser from './AddNewUser'
import ConfirmModal from 'common/ConfirmModal'
import './Users.scss'
import { fetchUsers } from "modules/Users";
import { REQUEST_STATUS } from '_config/constants'
import LoadingIndicator from 'common/LoadingIndicator'
const Users = ({ fetchUsers, usersData, state}) => {

    const [modal, openModal] = useState(false)

    const toggleModal = () => {
        openModal(!modal)
    }

    useEffect(()=> {
        fetchUsers()
    }, [])

    console.log(usersData)

    return (
        <div className="Users mt-5 mb-5">
            <AddNewUser toggleModal={toggleModal} toogle={modal} />
            <Row>
                <Col xs="12" >
                    <Card>
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <h5 className="font-weight-normal">User Management</h5>
                            <Button size="md" className="btn-success btn-brand mr-1 mb-1 float-right" onClick={toggleModal}><i className="fa fa-plus"></i><span>Add New User</span></Button>
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
                                                <th>Permission Level</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usersData.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>User</td>
                                                            <td>
                                                                <ConfirmModal type={"userDelete"} index={item.id} />
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
    const { usersData, isSubmitSuccess, state } = users;
    return { usersData, isSubmitSuccess, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (data) => {
            dispatch(fetchUsers(data));
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(Users);