import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Table, Modal, Button } from 'reactstrap'
import ConfirmModal from 'components/ConfirmModal/ConfirmModal'
import AddStoreModal from 'components/AddStoreModal/AddStoreModal'
import { fetchStores } from "modules/Stores";
import LoadingIndicator from 'common/LoadingIndicator'

import './StoreLocations.scss'
import { REQUEST_STATUS } from '_config/constants';
let data = {
    storeName: "",
    Address: "",
    Address2: "",
    city: "",
    zipCode: "",
    phonenumber: "",
    us_state: ""
}

const StoreLocations = ({ isSubmitSuccess, fetchStores, storesData, state }) => {

    const [modal, setModal] = useState(false)
    const [modalIndex, setModalIndex] = useState(0)

    useEffect(() => {
        fetchStores()
    }, [])

    const toggleModal = () => {
        setModal(!modal)
    }

    const editLocation = (index) => {
        setModalIndex(index)
        toggleModal()
    }

    const addLocation = () => {
        setModalIndex(-1)
        toggleModal()
    }
        return (
            <div className="StoreLocations mt-5 mb-5" >
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-normal">Store Locations</h5>
                                <AddStoreModal />
                            </CardHeader>
                            <CardBody>
                                {
                                    state === REQUEST_STATUS.PENDING ?
                                        <LoadingIndicator /> :
                                        <Table responsive className="table-hover ">
                                            <thead>
                                                <tr>
                                                    <th>Store Name</th>
                                                    <th className="text-right">Address</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {
                                                    storesData.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-left">{item.name}</td>
                                                                <td className="text-right">{item.address1}</td>
                                                                <td className="text-right">
                                                                    <AddStoreModal type="EDIT" initialData = {item} />
                                                                    <ConfirmModal type={"storeDelete"} id={item._id} />
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

const mapStateToProps = ({ stores }) => {
    const { storesData, state, isSubmitSuccess } = stores;
    return { storesData, state, isSubmitSuccess };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => {
            dispatch(fetchStores());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreLocations);
