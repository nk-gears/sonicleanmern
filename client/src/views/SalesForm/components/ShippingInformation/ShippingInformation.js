import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import {
    Col,
    Row,
} from 'reactstrap';
import OrderTypeItem from '../OrderTypeItem'
import InformationForm from '../InformationForm'
import LocationForm from '../LocationForm'
import Stats from '../Stats'

import { selectShippingInfor, onSelectStoreLocation } from 'modules/salesForm'
import {fetchStores} from 'modules/Stores'
import * as Constants from '_config/constants'

import './ShippingInformation.scss'

const ShippingInformation = ({ 
    orderType, 
    onSelectShippingInfor,
    fetchStores,
    storesData,
    onSelectStore,
    selectedStore,
    ...props 
}) => {

    const [selectedIndex, setSelectedIndex] = useState(null)

    const onSelected = (index) => {
        setSelectedIndex(index)
        onSelectShippingInfor(index)
    }

    useEffect(()=> {
        fetchStores()
    }, [])

    return (
        <div className="text-center ShippingInformation mx-auto">
            <Row className="align-items-center mt-4">
                <Col>
                    <h2 className="font-weight-bold text-black"> SHIPPING INFORMATION </h2>
                </Col>
            </Row>
            {
                orderType===1 ?
                <>
                    <Row className="justify-content-center mt-2">
                            <Col lg="8" sm="12">
                                <Row className="justify-content-around">
                                {
                                        Constants.shippinginforType.map((item, index) => {
                                        return (
                                            <Col xs="12" sm="4" md="5" className="mt-3" key={index}>
                                                <OrderTypeItem info={item} type={index} selectedIndex={selectedIndex} onSelected={onSelected} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-2">
                        <Col lg="8" sm="12">
                            <Row>
                                <Col xs="12">
                                    { 
                                        selectedIndex === 0 ? 
                                            <InformationForm /> : 
                                        selectedIndex === 1 ? 
                                            <LocationForm 
                                                data={storesData} 
                                                onSelectStore={onSelectStore} 
                                                selectedStore={selectedStore} /> : null
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </> : 
                    <Row className="justify-content-center mt-2">
                        <Col lg="8" sm="12">
                            <Row>
                                <Col xs="12">
                                    <LocationForm 
                                        data={storesData} 
                                        onSelectStore={onSelectStore} 
                                        selectedStore={selectedStore} 
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            }
            <Stats step={3} {...props} activeNextStep={!selectedStore} />
        </div>
    )
}

const mapStateToProps = ({ salesform, stores }) => {
    const { orderType, selectedStore } = salesform;
    const {storesData} = stores
    return { orderType, storesData, selectedStore };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectShippingInfor: (orderType) => {
            dispatch(selectShippingInfor(orderType));
        },
        onSelectStore: (store) => {
            dispatch(onSelectStoreLocation(store))
        },
        fetchStores: () => {
            dispatch(fetchStores());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingInformation);

