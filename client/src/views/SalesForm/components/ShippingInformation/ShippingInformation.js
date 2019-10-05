import React, { Component } from 'react'
import { connect } from "react-redux";

import { Col, Row,} from 'reactstrap';
import OrderTypeItem from '../OrderTypeItem'
import InformationForm from '../InformationForm'
import LocationForm from '../LocationForm'
import Stats from '../Stats'

import { selectShippingInfor } from "../../../../modules/salesForm";
import { shippinginforType, ShippingType } from '_config/constants'
import { PriceType } from '../../../../_config/constants'

import './ShippingInformation.scss'


class ShippingInformation extends Component {

    state = {
        selectedIndex: null
    }

    onSelected = (index) => {
        this.setState({ selectedIndex: index })
        this.props.onSelectShippingInfor(index)
    }

    render() {
        const { selectedIndex } = this.state
        const { orderType,shippinginfor,customerinfo } = this.props       
        return (
            <div className="text-center ShippingInformation mx-auto">
                <Row className="align-items-center mt-4">
                    <Col>
                        <h2 className="font-weight-bold text-black"> SHIPPING INFORMATION </h2>
                    </Col>
                </Row>
                {
                    orderType === PriceType.DIRECTSHIP ?
                        <>
                            <Row className="justify-content-center mt-2">
                                <Col lg="8" sm="12">
                                    <Row className="justify-content-around">
                                        {
                                            shippinginforType.map((item, index) => {
                                                return (
                                                    <Col xs="12" sm="4" md="5" className="mt-3" key={index}>
                                                        <OrderTypeItem info={item} type={item.id} selectedIndex={shippinginfor} onSelected={this.onSelected} />
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
                                            {selectedIndex === ShippingType.SHIPTOCUSTOMER ? <InformationForm /> : selectedIndex === ShippingType.SHIPTOSTORE ? <LocationForm /> : ''}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </> :
                        <Row className="justify-content-center mt-2">
                            <Col lg="8" sm="12">
                                <Row>
                                    <Col xs="12">
                                        <LocationForm />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                }
                <Stats step={3} {...this.props} activeNextStep={customerinfo.customerid == undefined ? true  : false} />
            </div>
        )
    }
}

const mapStateToProps = ({ salesform }) => {
    const { orderType,shippinginfor,customerinfo } = salesform;
    return { orderType,shippinginfor,customerinfo };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectShippingInfor: (shippingType) => {
            dispatch(selectShippingInfor(shippingType));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingInformation);

