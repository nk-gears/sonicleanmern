import React, { useEffect, useState } from 'react'
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
// import ScrollTop from '../ScrollTop'
import AddPaymentMethodModal from 'components/AddPaymentMethodModal/AddPaymentMethodModal'
import * as Contants from '_config/constants'

import { fetchCards } from "modules/Cards";
import { onSelectCard, onSubmitOrder, submitOrderReset } from 'modules/salesForm'
import LoadingIndicator from 'components/common/LoadingIndicator'

import { REQUEST_STATUS } from '_config/constants';
import './Payment.scss'

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
    inventory,
    customerInformation,
    resetOrder,
    accountData,
    cardLoadingState,
    ...props
}) => {

    const [modal, setModal] = useState(false)

    const [totalPrice, setTotalPrice] = useState(0)

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(()=> {
        fetchCards(accountData._id)
        // if(state===REQUEST_STATUS.SUCCESS) {
        //     toast.success("Your Order was Successfully Processe.", {position: 'bottom-right'});
        //     // setTimeout(()=> {
        //     //     resetOrder()
        //     //     // props.firstStep()
        //     // }, 2500)
        // } else if(state===REQUEST_STATUS.FAIL){
        //     toast.success("Sorry, we ran into an issue processing your payment", {position: 'bottom-right'});
        // }
    }, [])

    const onSelectCard= (id) => {
        selectCard(id)
    }

    let total=0
    const getTotalPrice = (price) => {
         total += price
        setTotalPrice(total)
    }

    const onResetOrder = () => {
        resetOrder()
        props.firstStep()
    }

    const getInventoryProducts = (inventory) => {

        var map = inventory.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
          }, {});


        const items = []

        for (const key of Object.keys(map)) {
            items.push( <ProductBox item={key} key={key} orderType={orderType} quantity={map[key]} setPrice={getTotalPrice} />)
        }
        return items
    }

    const getDirectProducts = (ship) => {
       let p = ship.map((item, index) => {
            return <ProductBox item={item} key={index} orderType={orderType} setPrice={getTotalPrice} />
        })
        return p
    }

    /******* final Submit Order ******/
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
        } else if( orderType===0 && inventory.length===0) {
            toast.error("Please select one more product", {position: 'bottom-right'});
            return;
        }
        
        let data = {}

        data.card = selectedCard
        data.order = {}
        data.amount = totalPrice
        data.order.cust_company = accountData.mainstore.name
        data.order.cust_first_name = accountData.firstName
        data.order.cust_last_name = accountData.lastName
        data.order.cust_address_1 = accountData.mainstore.address1
        data.order.cust_address_2 = accountData.mainstore.address2
        data.order.cust_city = accountData.mainstore.city
        data.order.cust_state = accountData.mainstore.us_state
        data.order.cust_zip = accountData.mainstore.zipcode
        data.order.cust_phone = accountData.mainstore.phoneNumber
        data.order.cust_e_mail = accountData.email
        data.order.credit_card_no = selectedCard.cardnumber

        data.order.ship_country = 'USA'
        data.order.cust_country = 'USA'
        data.order.ship_is_billing = false

        if(orderType===1) {
            data.order.cust_ref = Math.random().toString(36).substring(7)+".DS"
            if(shippinginfor===0) {
                data.order.ship_first_name = customerInformation.firstName
                data.order.ship_last_name = customerInformation.lastName
                // data.order.ship_company = customerInformation.email
                data.order.ship_address_1 = customerInformation.address1
                data.order.ship_address_2 = customerInformation.address2
                data.order.ship_phone = customerInformation.phoneNumber
                data.order.ship_city = customerInformation.city
                data.order.ship_state = customerInformation.us_state
                data.order.ship_zip = customerInformation.zipcode
                data.order.ship_e_mail = customerInformation.email
            } else {
                let store = storesData.filter(item=> item._id=== selectedStore )
                data.order.ship_first_name = employeeName.split(' ')[0]
                data.order.ship_last_name = employeeName.split(' ')[1]
                data.order.ship_company = store[0].name
                data.order.ship_phone = store[0].phoneNumber
                data.order.ship_address_1 = store[0].address1
                data.order.ship_address_2 = store[0].address2
                data.order.ship_city = store[0].city
                data.order.ship_state = store[0].us_state
                data.order.ship_zip = store[0].zipcode
                data.order.ship_e_mail = accountData.email
            }
            data.order.items = ship.map(item=> {
                let p = {}
                p.item=item
                p.quantity = 1
                let result = Contants.DirectShipProducts.filter(product=> product._id===item)
                p.price=parseFloat(result[0].price / 100)
                p.discount=0
                return p
            })
        } else if( orderType===0 ) {
            data.order.cust_ref = Math.random().toString(36).substring(7)+".INV"

            let store = storesData.filter(item=> item._id=== selectedStore )
            
            data.order.ship_first_name = employeeName.split(' ')[0]
            data.order.ship_last_name = employeeName.split(' ')[1]
            data.order.ship_company = store[0].name
            data.order.ship_phone = store[0].phoneNumber
            data.order.ship_address_1 = store[0].address1
            data.order.ship_address_2 = store[0].address2
            data.order.ship_city = store[0].city
            data.order.ship_state = store[0].us_state
            data.order.ship_zip = store[0].zipcode
            data.order.ship_e_mail = accountData.email
            
            
            var map = inventory.reduce(function(prev, cur) {
                prev[cur] = (prev[cur] || 0) + 1;
                return prev;
              }, {});
    
            data.order.items = []
    
            for (const key of Object.keys(map)) {

                let p = {}
                p.item = key;
                let result = Contants.InventoryProducts.filter(product=> product._id===key)
                p.quantity = map[key] * result[0].multiples
                if (p.quantity >= 10) {
                    p.price=parseFloat(result[0].discount / 100)
                } else {
                    p.price=parseFloat(result[0].price / 100)
                }
                
                p.discount=0
                data.order.items.push(p)
            }
        }

        submitOrder(data, accountData._id)
    }

    return (
        <div className="text-center mx-auto Payment">
            <ToastContainer />
            <Row className="justify-content-center mt-2">
                <Col md="12" lg="10">
                    <Row>
                        <Col xs="12" md="7" className="text-left">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="font-weight-normal text-black"> Payment Method </h3>
                                <AddPaymentMethodModal toggleModal={toggleModal} customerId={'1'} />
                            </div>
                            {
                                cardLoadingState === REQUEST_STATUS.PENDING ?
                                <LoadingIndicator /> :
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
                                    orderType===0 ? 
                                        inventory && getInventoryProducts(inventory) : 
                                    orderType===1 ?
                                        ship && getDirectProducts(ship) : null
                                }
                                <PromoCode />
                                <hr />
                                <ProductInfo 
                                    onSubmitOrder={onSubmitOrder} 
                                    products={orderType===0 ? inventory : ship} 
                                    state={state} 
                                    onResetOrder={onResetOrder}
                                    totalPrice={totalPrice}
                                />
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

const mapStateToProps = ({ salesform, card, stores, account }) => {
    const { 
        orderType, 
        selectedCard, 
        ship, 
        employeeName, 
        selectedUsers,
        selectedStore,
        state,
        shippinginfor,
        inventory,
        customerInformation,
    } = salesform;
    const cardLoadingState = card['state']
    const { cardsData } = card
    const { storesData } = stores
    const { accountData } = account;
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
        inventory,
        customerInformation,
        accountData,
        cardLoadingState
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: (id) => {
            dispatch(fetchCards(id));
        },
        selectCard: (card) => {
            dispatch(onSelectCard(card))
        },
        submitOrder: (data, id) => {
            dispatch(onSubmitOrder(data, id))
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