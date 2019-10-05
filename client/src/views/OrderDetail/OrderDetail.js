import React from 'react'
import { Card, CardHeader, CardBody, Row, Col, Table } from 'reactstrap';

import logo from './images/logo.png'

const OrderDetail = () => {
    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    Invoice <strong>#90-98792</strong>
                    <a href="#" className="btn btn-sm btn-secondary mr-1 float-right"><i className="fa fa-print"></i> Print</a>
                    <a href="#" className="btn btn-sm btn-info mr-1 float-right"><i className="fa fa-save"></i> Save</a>
                </CardHeader>
                <CardBody>
                    <Row className="mb-4">
                        <Col sm="4" className="text-center">
                            <img src={logo} alt="logo" style={{width: '70%'}} />
                        </Col>
                        <Col sm="4">
                            <h6 className="mb-3">Shipping Information:</h6>
                            <div>Jhone Doe</div>
                            <div>Address Line 1</div>
                            <div>Address Line 2</div>
                            <div>City, State, Zip Code</div>
                            <div>Email: developer@developer.com</div>
                            <div>Phone: (456)456-1234</div>
                        </Col>
                        <Col sm="4">
                            <h6 className="mb-3">Order Details:</h6>
                            <div>Order <strong>#: 1234567.INV</strong></div>
                            <div>Order Type: <strong>Inventory</strong></div>
                            <div>Payment Method: <strong>Invoiced through Mohawk</strong></div>
                            <div>Order Status: <strong>Shipped</strong></div>
                            <div>Shipment Carrier: <strong>FEDEX</strong></div>
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
                            <tr>
                                <td className="center">1</td>
                                <td className="left">Soft Carpet Upright Vacuum Cleaner</td>
                                <td className="center">1</td>
                                <td className="right">$999,00</td>
                                <td className="right">$999,00</td>
                            </tr>
                            <tr>
                                <td className="center">2</td>
                                <td className="left">Upright HEPA Filter Bags</td>
                                <td className="center">20</td>
                                <td className="right">$150,00</td>
                                <td className="right">$3.000,00</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Col lg="4" sm="5">
                            Tracking Number(s):
                            <div className="text-primary mt-1">0000823126987363462931231</div>
                            <div className="text-primary" >0000823126987363462931231</div>
                            <div className="text-primary" >0000823126987363462931231</div>
                        </Col>
                        <Col lg="4" sm="5" className="ml-auto">
                            <Table className="table-clear">
                                <tbody>
                                    <tr>
                                        <td className="left"><strong>Subtotal</strong></td>
                                        <td className="right">$660.00</td>
                                    </tr>
                                    <tr>
                                        <td className="left"><strong>Shipping</strong></td>
                                        <td className="right">Free</td>
                                    </tr>
                                    <tr>
                                        <td className="left"><strong>Tax</strong></td>
                                        <td className="right">$0</td>
                                    </tr>
                                    <tr>
                                        <td className="left"><strong>Total</strong></td>
                                        <td className="right"><strong>$660.00</strong></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <a href="#" className="btn btn-success"><i className="fa fa-usd"></i> Proceed to Payment</a>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default OrderDetail
