import React, { useEffect, useState } from 'react'
import {
  Col,
  Row,
} from 'reactstrap';
import * as Contants from '_config/constants'
import './ProductBox.scss'

const ProductBox = ({
  item,
  orderType
}) => {

  const [ product, setProduct ] = useState()

  useEffect(() => {
    let result
    if(orderType===1) {
      result = Contants.DirectShipProducts.filter(product=> product._id===item)
    }
    setProduct(result[0])
  }, [item])

    return (
      <>
        <Row className="ProductBox align-items-center mt-5">
          <Col md="4">
              <img src={product && product.image} alt="p1" className="img-fluid" />
          </Col>
          <Col className="text-black text-right" md="8">
                  <h6 className="font-weight-normal">{product && product.name}</h6>
                  <h6 className="mt-1">${product && product.price}/unit</h6>
                  <h6 className="mt-1">QTY: {orderType===1 ? '1': 'some'}</h6>
          </Col>
        </Row>
        <hr />
      </>
    )
}

export default ProductBox