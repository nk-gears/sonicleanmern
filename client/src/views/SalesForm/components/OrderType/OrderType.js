import React, { Component } from 'react'
import { connect } from "react-redux";
import Stats from '../Stats'
import OrderTypeItem from '../OrderTypeItem'
import ReferralModal from '../ReferralModal'
import { selectOrderType, selectShippingInfor,selectInventory,selectShip,selectedInventoryData,discount,selectedShippingInfor } from "../../../../modules/salesForm";
import { fetchPricelist } from "../../../../modules/PriceList";
import { PriceType, orderTypeList } from '../../../../_config/constants'


import './OrderType.scss'

import {
    Button,
    Col,
    Row,
} from 'reactstrap';

class OrderType extends Component {

    constructor(props) {
        super(props)
        this.props.fetchPricelist();
        this.state = {
            selectedOrderType: null,
            modal: false
        }
    }

    componentDidMount = () => {
        this.setState({ selectedOrderType: this.props.orderType })
    }

    onSelected = (type) => {
        this.setState({ selectedOrderType: type })
        this.props.onSelectOrderType(type)
        this.props.onSelectShippingInfor(-1)       
        this.props.selectShip([]);
        this.props.selectInventory([]);
        this.props.selectedInventoryData([]);
        this.props.selectedShippingInfor({});
        this.props.discount({});
    }

    toggleModal = () => {
        if (this.state.modal) {
            this.setState({ selectedOrderType: -1 })
            this.props.onSelectOrderType(-1)
        }
        this.setState({ modal: !this.state.modal })
    }

    render() {
        const { modal } = this.state
        const { orderType, selectedIndex, priceListItem } = this.props
        return (
            <div className="text-center OrderType" >
                <ReferralModal toogle={modal} closeModal={this.toggleModal} />
                <Row className="mt-4">
                    <Col>
                        <h2 className="font-weight-bold text-black">PLEASE SELECT THE TYPE OF ORDER</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    {
                        priceListItem.map((item, index) => {
                            return (
                                <Col md="4" lg="3" className="mt-3" key={index}>
                                    <OrderTypeItem info={item} selectedIndex={orderType} type={item.id} onSelected={this.onSelected} />
                                </Col>
                            )
                        })
                    }
                    <Col md="4" lg="3" className="mt-3" key={priceListItem.length}>
                        <OrderTypeItem info={orderTypeList[0]} selectedIndex={orderType} type={orderTypeList[0].id} onSelected={this.onSelected} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            orderType === PriceType.REFERRALSALE ?
                                <Button color="primary mt-5" onClick={this.toggleModal} >Continue</Button> :
                                <Stats step={1} {...this.props} activeNextStep={selectedIndex === null || selectedIndex === '' || orderType === -1} />
                        }
                    </Col>
                </Row>

            </div>
        )
    }
}
OrderType.propTypes = {
}
const mapStateToProps = ({ salesform, priceList }) => {
    const { orderType } = salesform;
    const { priceListItem } = priceList;
    return { orderType, priceListItem };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectOrderType: (orderType) => {
            dispatch(selectOrderType(orderType));
        },
        onSelectShippingInfor: (type) => {
            dispatch(selectShippingInfor(type))
        },
        fetchPricelist: () => {
            dispatch(fetchPricelist());
        },
        selectShip: (data) => {
            dispatch(selectShip(data));
        },
        selectInventory: (data) => {
            dispatch(selectInventory(data));
        },
        selectedInventoryData: (data) => {
            dispatch(selectedInventoryData(data));
        },
        discount: () => {
            dispatch(discount());
        },
        selectedShippingInfor: (data) => {
            dispatch(selectedShippingInfor(data))
        }        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderType);

