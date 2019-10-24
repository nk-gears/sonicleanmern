import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {isPending} from 'utils/state'
import * as Contants from '_config/constants'

import LaddaButton, {
  EXPAND_RIGHT,
  XL
} from 'react-ladda';

const ProductInfo = ({
  onSubmitOrder,
  state,
  products
}) => {

 const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    
    if(products && products.length>0) {
      let total = 0;
      for (const p  of products) {
        let result = Contants.DirectShipProducts.filter(product=> product._id===p)
        if(result.length>0) {
          total +=parseFloat((result[0].price/100))
        }
    }

    setSubTotal(total)
    }
  }, [])

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold text-muted">Subtotal</h6>
            <h6 className="text-primary">${subTotal.toFixed(2)}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="font-weight-bold text-muted">Shipping</h6>
            <h6 className="text-primary">$00.00</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="font-weight-bold text-muted">Tax</h6>
            <h6 className="text-primary">$00.00</h6>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mt-3">
            <h6 className="font-weight-bold text-muted">Total</h6>
            <h6 className="text-primary">${subTotal.toFixed(2)}</h6>
        </div>
        <LaddaButton
          onClick={onSubmitOrder}
            className="btn btn-success btn-ladda"
            loading={isPending(state)}
            data-color="success"
            data-size={XL}
            data-style={EXPAND_RIGHT}
          >
            Submit Order
        </LaddaButton>
        {/* <Button className="mt-4 font-weight-bold" color="success" size="lg" onClick={onSubmitOrder}>Submit Order</Button> */}
        <div>
            <h6 className="text-muted mt-4">By submitting this order, you agree to the <Link to="#">terms & conditions</Link> of Soniclean’s MAP policy.</h6>
        </div>
      </div>
    )
}

export default ProductInfo
