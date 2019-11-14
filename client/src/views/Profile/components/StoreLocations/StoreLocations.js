import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap'
import ConfirmModal from 'components/ConfirmModal/ConfirmModal'
import AddStoreModal from 'components/AddStoreModal/AddStoreModal'
import { fetchStores } from "modules/Stores";
import LoadingIndicator from 'components/common/LoadingIndicator'

import './StoreLocations.scss'
import { REQUEST_STATUS } from '_config/constants';

const StoreLocations = ({ isSubmitSuccess, fetchStores, storesData, state, accountData }) => {

    useEffect(() => {
        fetchStores(accountData._id)
    }, [])

        return (
            <div className="StoreLocations mt-5 mb-5" >
                <Row>
                    <Col xs="12" >
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-normal">Store Locations</h5>
                                <AddStoreModal id={accountData._id} />
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
                                                                    <AddStoreModal type="EDIT" initialData = {item} id={accountData._id} />
                                                                    <ConfirmModal type={"storeDelete"} id={item._id} dealer={accountData._id} />
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

const mapStateToProps = ({ stores, account }) => {
    const {accountData} = account
    const { storesData, state, isSubmitSuccess } = stores;
    return { storesData, state, isSubmitSuccess, accountData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: (id) => {
            dispatch(fetchStores(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreLocations);
