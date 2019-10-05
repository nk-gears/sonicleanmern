import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Modal
} from 'reactstrap';

import Stats from '../Stats'
import AddPaymentMethodModal from '../AddPaymentMethodModal'
import PaymentMethod from '../PaymentMethod'

import PaymentShipping from '../PaymentShipping';
import EmailNotification from '../EmailNotification'
import ProductBox from '../ProductBox'
import ProductInfo from '../ProductInfo'
import PromoCode from '../PromoCode'
import ScrollTop from '../ScrollTop'
import { fetchCards } from "../../../../modules/Cards";
import './Payment.scss'
import { PriceType } from '../../../../_config/constants';
import { selectedPayment } from "../../../../modules/salesForm";
import { order } from "../../../../modules/Order";
import { getDealerId, getUserId } from '_helpers/token-helpers'



class Payment extends Component {
    constructor(props) {
        super(props)
        this.props.fetchCards(this.props.customerinfo.customerid);
        this.state = {
            modal: false,
            selectedPayment: null,
            selectedemailNotification: [],
            paymentShippingAddress: ''
        }
    }

    toggleModal = (isSubmitSuccess) => {
        this.setState({ modal: !this.state.modal })
        if (isSubmitSuccess == true) {
            this.props.fetchCards(this.props.customerinfo.customerid);
        }
    }

    onSelectPayment = (index, id) => {
        this.props.selectedPayment(id)
        this.setState({ selectedPayment: id })
    }
    emailNotification = (vaule) => {
        let result = vaule.map(a => a.value);
        this.setState({ selectedemailNotification: result })
    }

    prevStep = () => {
        this.props.previousStep()
    }

    paymentShipping = (value) => {
        this.setState({ paymentShippingAddress: value })
    }

    submitOrder = (totalAmount, promoCode, subtotal, tax, amount) => {
        const { orderType, customerinfo, paymentId, ship, inventoryData } = this.props;
        let selectedProducts = orderType == PriceType.DIRECTSHIP ? ship : inventoryData;
        let products = [];
        for (var i = 0; i < selectedProducts.length; i++) {
            let product = {};
            product.itemid = selectedProducts[i].item_id;
            product.sku = selectedProducts[i].sku;
            product.qty = selectedProducts[i].quantity;
            product.price = selectedProducts[i].price;
            products.push(product);
        }

        const data = {
            pricelist: `${orderType}`,
            customerid: `${customerinfo.customerid}`,
            storeid: customerinfo.id != undefined ? `${customerinfo.id}` : '',
            paymentid: `${paymentId}`,
            promocode: `${promoCode}`,
            subtotal: `${subtotal}`,
            promoamount: `${amount}`,
            shipping: "0.0",
            tax: `${tax}`,
            total: `${totalAmount}`,
            employeeaddresed: this.state.paymentShippingAddress,
            emailnotification: this.state.selectedemailNotification.join(),
            userid: getUserId(),
            dealerid: getDealerId(),
            namecompany: customerinfo.name,
            address1: customerinfo.address1,
            address2: customerinfo.address2,
            state: customerinfo.state,
            city: customerinfo.city,
            zip: customerinfo.zip,
            items: products,
            firstName:customerinfo.firstName,
            lastName:customerinfo.lastName,
            PhoneNumber:customerinfo.phone
        }
        this.props.order(data);
    }

    render() {
        const { modal} = this.state
        const { orderType, cardsData, customerinfo, ship, inventoryData, paymentId } = this.props;
        return (
            <div className="text-center mx-auto Payment">
                <ScrollTop />
                <Modal isOpen={modal} toggle={this.toggleModal}
                    className={'modal-primary ' + 'modal-md'}>
                    <AddPaymentMethodModal toggleModal={this.toggleModal} customerId={customerinfo.customerid} />
                </Modal>
                <Row className="justify-content-center mt-2">
                    <Col md="12" lg="10">
                        <Row>
                            <Col xs="12" md="7" className="text-left">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h3 className="font-weight-normal text-black"> Payment Method </h3>
                                    <Button color="primary" onClick={this.toggleModal}><i className="fa fa-plus-circle fa-md mr-3"></i>Add Payment</Button>
                                </div>
                                {
                                    cardsData.map((item, index) => {
                                        return <PaymentMethod
                                            data={item}
                                            key={index}
                                            index={index}
                                            selectPayment={this.onSelectPayment}
                                            selectedIndex={paymentId}
                                        />
                                    })
                                }
                                <hr />
                                <PaymentShipping type={this.props.shippinginfor} SW={this.prevStep} data={customerinfo} paymentShipping={this.paymentShipping} />
                                <hr />
                                <EmailNotification emailNotification={this.emailNotification} />
                            </Col>
                            <Col xs="12" md="5">
                                <Card className="card-accent-primary mt-mobile-5 ">
                                    <CardHeader><h4 className="font-weight-normal text-black">Order Summary</h4></CardHeader>
                                    <CardBody>
                                        {
                                            orderType == PriceType.DIRECTSHIP ?
                                                ship.map((item, index) => {
                                                    return <ProductBox
                                                        data={item}
                                                        index={index}
                                                    />
                                                }) : inventoryData.map((item, index) => {
                                                    return <ProductBox
                                                        data={item}
                                                        index={index}
                                                    />
                                                })
                                        }
                                        <hr />
                                        <PromoCode customerId={customerinfo.customerid} />
                                        <hr />
                                        <ProductInfo submitOrder={this.submitOrder} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Stats step={4} {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = ({ salesform, card }) => {
    const { orderType, shippinginfor, customerinfo, ship, inventoryData, paymentId } = salesform;
    const { cardsData } = card;
    return { orderType, shippinginfor, cardsData, customerinfo, ship, inventoryData, paymentId };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: (customerid) => {
            dispatch(fetchCards(customerid));
        },
        selectedPayment: (paymentId) => {
            dispatch(selectedPayment(paymentId));
        },
        order: (data) => {
            dispatch(order(data));
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment);