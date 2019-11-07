import React, { useEffect } from 'react'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Row, 
    Col, 
    Table 
} from 'reactstrap';
import { connect } from "react-redux";
import * as Contants from '_config/constants'
import { fetchOrderByID } from "../../modules/OrderHistory";
import { REQUEST_STATUS } from '_config/constants'
import LoadingIndicator from 'components/common/LoadingIndicator'

import logo from './images/logo.png'    

const OrderDetail = ({
    match,
    getOrderById,
    orderDataById,
    orderStatus,
    state
}) => {

    useEffect(() => {
        getOrderById(match.params.id)

    }, [])

    const getOrderStatus = (status) => {
        if(status==='new' || status==='at_wms') {
            return 'In process'
        } else if(status==='shipped') {
            return 'Shipped'
        }
    }

    const getProductName = (offerCode) => {
        let p_name;
        if(orderDataById.cust_ref.split('.')[1]==='DS') {
            p_name = Contants.DirectShipProducts.filter(item=> {
                return item._id===offerCode
            })
        } else if(orderDataById.cust_ref.split('.')[1]==='INV') {
            p_name = Contants.InventoryProducts.filter(item=> {
                return item._id===offerCode
            })
        }
        return p_name[0].name
    }

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    Invoice <strong>#{state===REQUEST_STATUS.INITIAL || state===REQUEST_STATUS.PENDING ? '': orderDataById.cust_ref}</strong>
                    {/* <Link to="#" className="btn btn-sm btn-secondary mr-1 float-right">
                        <i className="fa fa-print"></i> Print
                    </Link>
                    <Link to="#" className="btn btn-sm btn-info mr-1 float-right">
                        <i className="fa fa-save"></i> Save
                    </Link> */}
                </CardHeader>
                <CardBody>
                    {
                         state===REQUEST_STATUS.INITIAL || state===REQUEST_STATUS.PENDING ? 
                         <LoadingIndicator /> :
                         <>
                    <Row className="mb-4">
                        <Col sm="4" className="text-center">
                            <img src={logo} alt="logo" style={{width: '70%'}} />
                        </Col>
                        <Col sm="4">
                            <h6 className="mb-3">Shipping Information:</h6>
                            <div>{orderDataById.ship_first_name} {orderDataById.ship_last_name}</div>
                            <div>{orderDataById.ship_address_1}</div>
                            <div>{orderDataById.ship_address_2}</div>
                            <div>{orderDataById.ship_city}, {orderDataById.ship_state}, {orderDataById.ship_zip}</div>
                            <div>Email: {orderDataById.ship_e_mail}</div>
                            <div>Phone: {orderDataById.ship_phone}</div>
                        </Col>
                        <Col sm="4">
                            <h6 className="mb-3">Order Details:</h6>
                            <div>Order <strong>#: {orderDataById.cust_ref}</strong></div>
                            <div>Order Type:<strong> {orderDataById.cust_ref && orderDataById.cust_ref.split('.')[1]==='DS' ? 'Direct Ship': 'Inventory'}</strong></div>
                            <div>Payment Method: <strong>Credit/Debit Card</strong></div>
                            <div>Order Status: <strong>{getOrderStatus(orderStatus)}</strong></div>
                            {/* <div>Shipment Carrier: <strong>FEDEX</strong></div> */}
                        </Col>
                    </Row>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th className="center">#</th>
                                <th>Item</th>
                                <th className="center">Quantity</th>
                                <th className="right">Unit Cost</th>
                                <th className="right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDataById.items && orderDataById.items.map((item, index) => {
                                    return <tr key={index}>
                                            <td className="center">{index+1}</td>
                                            <td className="left"><strong>{getProductName(item.item)}</strong></td>
                                            <td className="center">{item.quantity}</td>
                                            <td className="text-left">${parseInt(item.price).toFixed(2)}</td>
                                            <td className="right">${parseInt(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                })
                            }
                            
                        </tbody>
                    </Table>
                    <Row>
                        <Col lg="4" sm="5">
                            {
                                orderStatus==='shipped' && 
                                <>
                                    Tracking Number(s):
                                    <div className="text-primary mt-1">0000823126987363462931231</div>
                                    <div className="text-primary" >0000823126987363462931231</div>
                                    <div className="text-primary" >0000823126987363462931231</div>
                                </>
                            }
                            
                        </Col>
                        <Col lg="4" sm="5" className="ml-auto">
                            <Table className="table-clear">
                                <tbody>
                                    <tr>
                                        <td className="left"><strong>Subtotal</strong></td>
                                        <td className="right">${orderDataById.sub_total}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="left"><strong>Shipping</strong></td>
                                        <td className="right">Free</td>
                                    </tr> */}
                                    <tr>
                                        <td className="left"><strong>Tax</strong></td>
                                        <td className="right">$0</td>
                                    </tr>
                                    <tr>
                                        <td className="left"><strong>Total</strong></td>
                                        <td className="right"><strong>${orderDataById.sub_total}</strong></td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* <Link to="#" className="btn btn-success"><i className="fa fa-usd"></i> Proceed to Payment</Link> */}
                        </Col>
                    </Row>
                         </>
                    }
                    
                </CardBody>
            </Card>
        </div>
    )
}


const mapStateToProps = ({ orderhistory }) => {
    const { orderDataById, orderStatus, state } = orderhistory;
    return { orderDataById, orderStatus, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderById: (id) => {
            dispatch(fetchOrderByID(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetail);
