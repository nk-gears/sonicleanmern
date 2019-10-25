import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import Stats from '../Stats'
import PaymentMethod from '../PaymentMethod'
import PaymentShipping from '../PaymentShipping';
import EmailNotification from '../EmailNotification'
import ProductBox from '../ProductBox'
import ProductInfo from '../ProductInfo'
import PromoCode from '../PromoCode'
import ScrollTop from '../ScrollTop'
import * as Contants from '_config/constants'

import { fetchCards } from "modules/Cards";
import { onSelectCard, onSubmitOrder, submitOrderReset } from 'modules/salesForm'

import './Payment.scss'
import { REQUEST_STATUS } from '_config/constants';

const Payment = ({
    orderType,
    fetchCards,
    cardsData,
    selectCard,
    selectedCard,
    ship,
    employeeName,
    selectedUsers,
    selectedStore,
    storesData,
    submitOrder,
    state,
    shippinginfor,
    customerInformation,
    resetOrder,
    ...props
}) => {

    useEffect(()=> {
        fetchCards()
        if(state===REQUEST_STATUS.SUCCESS) {
            toast.success("Your Order was Successfully Processe.", {position: 'bottom-right'});
            setTimeout(()=> {
                resetOrder()
                props.firstStep()
            }, 2500)
        } else if(state===REQUEST_STATUS.FAIL){
            toast.success("Sorry, we ran into an issue processing your payment", {position: 'bottom-right'});
        }
    }, [state])

    const onSelectCard= (id) => {
        selectCard(id)
    }

//////final Submit Order/////////
    const onSubmitOrder = async () => {
        if(selectedCard.length===0) {
            toast.error("Please select a card.", {position: 'bottom-right'});
            return;
        } else if (shippinginfor===1 && employeeName==='') {
            toast.error("Please input the employee name", {position: 'bottom-right'});
            return;
        } else if (selectedUsers.length===0) {
            toast.error("Please select one more Employee", {position: 'bottom-right'});
            return;
        } else if( orderType===1 && ship.length===0) {
            toast.error("Please select one more product", {position: 'bottom-right'});
            return;
        }
        
        let data = {}

        data.card = selectedCard

        if(orderType===1) {
            let total = 0;
            for (const p  of ship) {
                let result = Contants.DirectShipProducts.filter(product=> product._id===p)
                total +=parseFloat(result[0].price)
            }
            data.amount = total
            data.shipping = {}
            data.shipping.cust_ref = Math.random().toString(36).substring(7)+".DS"
            if(shippinginfor===0) {
                data.shipping.ship_first_name = customerInformation.firstName
                data.shipping.ship_last_name = customerInformation.lastName
                data.shipping.ship_company = customerInformation.email
                data.shipping.ship_address_1 = customerInformation.address1
                data.shipping.ship_address_2 = customerInformation.address2
                data.shipping.ship_city = customerInformation.city
                data.shipping.ship_state = customerInformation.us_state
                data.shipping.ship_zip = customerInformation.zipcode
            } else {
                let store = storesData.filter(item=> item._id=== selectedStore )
                data.shipping.ship_first_name = employeeName.split(' ')[0]
                data.shipping.ship_last_name = employeeName.split(' ')[1]
                data.shipping.ship_company = store[0].name
                data.shipping.ship_address_1 = store[0].address1
                data.shipping.ship_address_2 = store[0].address2
                data.shipping.ship_city = store[0].city
                data.shipping.ship_state = store[0].us_state
                data.shipping.ship_zip = store[0].zipcode
            }
            data.shipping.ship_country = 'USA'
                data.shipping.ship_is_billing = true
                data.shipping.items = ship.map(item=> {
                    let p = {}
                    p.item=item
                    p.quantity = 1
                    let result = Contants.DirectShipProducts.filter(product=> product._id===item)
                    p.price=parseFloat(result[0].price / 100)
                    p.discount=0
                    return p
                })
        }
        
        submitOrder(data)
    }

    return (
        <div className="text-center mx-auto Payment">
            <ScrollTop />
            <ToastContainer />  
            <Row className="justify-content-center mt-2">
                <Col md="12" lg="10">
                    <Row>
                        <Col xs="12" md="7" className="text-left">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="font-weight-normal text-black"> Payment Method </h3>
                            </div>
                            {
                                cardsData.map((item, index) => {
                                    return <PaymentMethod 
                                                data={item} 
                                                key={index} 
                                                selectPayment={onSelectCard} 
                                                selectedIndex={selectedCard}
                                            />
                                })
                            }
                            <hr />
                            <PaymentShipping SW={props.previousStep} />
                            <hr />
                            <EmailNotification />
                        </Col>
                        <Col xs="12" md="5">
                            <Card className="card-accent-primary mt-mobile-5 ">
                                <CardHeader><h4 className="font-weight-normal text-black">Order Summary</h4></CardHeader>
                            <CardBody>
                                {
                                    ship && ship.map((item, index) => {
                                        return <ProductBox item={item} key={index} orderType={orderType} />
                                    })
                                }
                                <PromoCode />
                                <hr />
                                <ProductInfo onSubmitOrder={onSubmitOrder} products={ship} state={state} />
                            </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Stats step={4} {...props} />
        </div>
    )
}

const mapStateToProps = ({ salesform, card, stores }) => {
    const { 
        orderType, 
        selectedCard, 
        ship, 
        employeeName, 
        selectedUsers,
        selectedStore,
        state,
        shippinginfor,
        customerInformation,
    } = salesform;
    const { cardsData } = card
    const { storesData } = stores
    return { 
        orderType, 
        selectedCard, 
        cardsData, 
        ship, 
        employeeName, 
        selectedUsers, 
        selectedStore, 
        storesData, 
        state, 
        shippinginfor,
        customerInformation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: () => {
            dispatch(fetchCards());
        },
        selectCard: (card) => {
            dispatch(onSelectCard(card))
        },
        submitOrder: (data) => {
            dispatch(onSubmitOrder(data))
        },
        resetOrder: () => {
            dispatch(submitOrderReset())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment);