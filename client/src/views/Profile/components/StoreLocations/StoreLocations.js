import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Table, Modal, Button } from 'reactstrap'
import ConfirmModal from 'common/ConfirmModal'
import AddLocationModal from '../../../../common/AddLocationModal'
import { fetchStores } from "../../../../modules/Stores";
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
        if (isSubmitSuccess) {
            setModal(false)
            fetchStores()
        }
    }, [isSubmitSuccess])

    useEffect(() => {
        setModal(false)
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
                <Modal isOpen={modal} toggle={toggleModal}
                    className={'modal-primary ' + 'modal-lg'}>
                    <AddLocationModal toggleModal={toggleModal} initialValues={data} index={modalIndex} />
                </Modal>
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-normal">Store Locations</h5>
                                <Button type="button" size="md" className="btn-success btn-brand mr-1 mb-1 float-right" onClick={addLocation}><i className="fa fa-plus"></i><span>Add Store Location</span></Button>
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
                                                                <td>{item.name}</td>
                                                                <td className="text-right">{item.address1}</td>
                                                                <td className="text-right">
                                                                    <button type="button" className="btn btn-primary mr-2" onClick={() => { editLocation(index); }} >Edit</button>
                                                                    <ConfirmModal type={"storeDelete"} index={item.id} />
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
