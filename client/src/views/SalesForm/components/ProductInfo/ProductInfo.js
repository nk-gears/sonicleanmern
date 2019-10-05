import React, { Component } from 'react'
import { connect } from 'react-redux'
import { discount } from "../../../../modules/salesForm";
import { Button } from 'reactstrap'
import { fetchTaxes } from "../../../../modules/Taxes";
import { PriceType } from '../../../../_config/constants'

class ProductInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtotal: 0,
      activeOrderButton: true
    }
  }

  componentWillUnmount() {
    this.setState({
      subtotal: 0,
      activeOrderButton: true
    })
  }


  componentDidMount = () => {
    this.fetchSubTotal();
  }

  fetchTaxesValue() {  
    const discount = this.props.discontValue != undefined  ?  this.props.discontValue.discount  : 0;
    let amount = this.state.subtotal-discount;
    const request = { amount: amount, shiptostate: this.props.customerinfo.state, shiptozip: this.props.customerinfo.zip }
    this.props.fetchTaxes(request);
  }

  submit = (totalAmount) => {
    const { discontValue, response, } = this.props;
    const promoCode = this.props.discontValue != undefined? discontValue.promocode:0;
    const subtotal = this.state.subtotal;
    const tax = response.tax;
    const discount = this.props.discontValue != undefined  ?  discontValue.discount  : 0;
    const amount = discount;
    this.props.submitOrder(totalAmount, promoCode, subtotal, tax, amount);
  }

  fetchSubTotal() {
    let subtotalValue = 0;
    if (this.props.orderType == PriceType.DIRECTSHIP) {
      const shipInfo = this.props.ship;
      for (var i = 0; i < shipInfo.length; i++) {
        let price = shipInfo[i].price * shipInfo[i].quantity;
        subtotalValue += price
      }
    }
    else
      if (this.props.orderType == PriceType.BUYINVENTORY) {
        const inventoryData = this.props.inventoryData;
        for (var i = 0; i < inventoryData.length; i++) {
          let price = inventoryData[i].price * inventoryData[i].quantity;
          subtotalValue += price
        }
      }
    this.setState({
      subtotal: subtotalValue
    })
    this.fetchTaxesValue();
  }
  render() {
    const { discontValue, response, isSubmitSuccess, orderType, ship, inventoryData, paymentId, orderResponse, isOrder } = this.props;
    let isActiveOrder = this.state.activeOrderButton;
    let totalAmount = 0;
    if (discontValue != undefined && discontValue.discount != undefined && !isSubmitSuccess) {
      this.fetchTaxesValue();
    }
    totalAmount = this.state.subtotal - (discontValue != undefined ? discontValue.discount :0);  
      if (paymentId && orderType != -1 && (ship.length > 0 || inventoryData.length > 0)) {
          isActiveOrder = false;
      }    
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center ">
          <h6 className="font-weight-bold text-muted">Subtotal</h6>
          <h6 className="text-primary">${this.state.subtotal}.00</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="font-weight-bold text-muted">Discount</h6>
          <h6 className="text-primary">${discontValue ? discontValue.discount : '0'}.00 </h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="font-weight-bold text-muted">Shipping</h6>
          <h6 className="text-primary">$0.00</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="font-weight-bold text-muted">Tax</h6>
          <h6 className="text-primary">${isSubmitSuccess == true ? response.tax : '0'}.00</h6>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="font-weight-bold text-muted">Total</h6>
          <h6 className="text-primary">${totalAmount}.00</h6>
        </div>
        <Button className="mt-4 font-weight-bold" color="danger" onClick={() => { this.submit(totalAmount) }} disabled={isActiveOrder} size="lg">Submit Order</Button>
        <div>
          <h5 style={{ textAlign: "center", color: "red" }}> {orderResponse == null ? "" : orderResponse.error}  </h5>
          <h5 style={{ textAlign: "center", color: "red" }}> {orderResponse == null ? "" : orderResponse.errors}  </h5>
        </div>
        <div>
          <h6 className="text-muted mt-4">By submitting this order, you agree to the <a href="#">terms & conditions</a> of Soniclean’s MAP policy.</h6>
        </div>
      </div>
    )
  }
}

// export default ProductInfo

const mapStateToProps = ({ salesform, taxes, order }) => {
  const { orderType, ship, inventoryData, discontValue, customerinfo, paymentId } = salesform;
  const { response, isSubmitSuccess } = taxes;
  const { orderResponse, isOrder } = order;
  return { orderType, ship, inventoryData, discontValue, response, isSubmitSuccess, customerinfo, paymentId, orderResponse, isOrder };
}

const mapDispatchToProps = (dispatch) => {
  return {
    discount: () => {
      dispatch(discount());
    },
    fetchTaxes: (request) => {
      dispatch(fetchTaxes(request));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);