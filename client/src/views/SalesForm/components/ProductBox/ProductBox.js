import React, { Component } from 'react'
import { Col, Row } from 'reactstrap';
import './ProductBox.scss'

class ProductBox extends Component {
  render() {
    const { data ,index} = this.props;    
    return (
      <Row className="ProductBox align-items-center" key={index}>
        <Col md="4">
          <img style={{ height: 60 }} src={data.baseurl + data.img} alt="p1" className="img-fluid" />
        </Col>
        <Col className="text-black text-right" md="8">
          <h6 className="font-weight-normal">{data.name}</h6>
          <h6 className="mt-1"> ${data.price}/{data.measure}</h6>
          <h6 className="mt-1">QTY: {data.quantity}</h6>
          <hr />
        </Col>
      </Row>
    )
  }
}

export default ProductBox