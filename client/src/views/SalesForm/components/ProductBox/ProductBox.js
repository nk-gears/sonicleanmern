import React, { useEffect, useState } from 'react'
import {
  Col,
  Row,
} from 'reactstrap';
import * as Contants from '_config/constants'
import './ProductBox.scss'

const ProductBox = ({
  item,
  orderType,
  quantity,
  setPrice
}) => {

  const [ product, setProduct ] = useState()

  useEffect(() => {
    let result
    if(orderType===1) {
      result = Contants.DirectShipProducts.filter(product=> product._id===item)
    } else if(orderType===0) {
      result = Contants.InventoryProducts.filter(product=> product._id===item)
    }
    setProduct(result[0])
  }, [item])

  const getPrice = (product) => {
    if(orderType===0) {
      if (quantity * product.multiples >= 10) {
        setPrice((product.discount * quantity * product.multiples)/100)
        return (product.discount / 100).toFixed(2)
      } else {
        setPrice((product.price * quantity * product.multiples)/100)
        return (product.price/100).toFixed(2)
      }
    } else if(orderType===1) {
      setPrice((product.price)/100)
      return (product.price/100).toFixed(2)
    }
  }

    return (
      <>
        <Row className="ProductBox align-items-center mt-5">
          <Col md="4">
              <img src={product && product.image} alt="p1" className="img-fluid" />
          </Col>
          <Col className="text-black text-right" md="8">
                  <h6 className="font-weight-normal">{ product && product.name }</h6>
                  <h6 className="mt-1">${ product && getPrice(product) } / { product && product.unit }</h6>
                  <h6 className="mt-1">QTY: { orderType===1 ? '1' : product && quantity * product.multiples }</h6>
          </Col>
        </Row>
        <hr />
      </>
    )
}

export default ProductBox