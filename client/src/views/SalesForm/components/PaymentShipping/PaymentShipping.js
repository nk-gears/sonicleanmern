import React, { Component } from 'react'
import {
  Button,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ShippingType } from '../../../../_config/constants';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Name'),
});
class PaymentShipping extends Component {

  state = {
    name: ''
  }

  handleBlur = (e) => {    
    this.setState({name: e.target.value})
    this.props.paymentShipping(e.target.value);
  }

  render() {
    const { type ,data} = this.props  
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="font-weight-normal text-black"> 
              {
                type===ShippingType.SHIPTOSTORE ? 'Store Shipping Information' : 'Customer Shipping Information'
              }
          </h3>
        </div>
        {
          type===ShippingType.SHIPTOSTORE  &&
            <div >
              <h6 className="text-black font-weight-normal">Enter name of company owner/employee that this order will be addressed to</h6>
              <Formik
                initialValues={{ name: '' }}
                onSubmit={(values, actions) => {
                  alert(JSON.stringify(values));
                  setTimeout(() => {
                    actions.setSubmitting(false);
                  }, 1000);
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <FormGroup>
                    <Input type="text"
                      name="name"
                      id="name"
                      placeholder="John Doe"
                      className="w-50 mt-2"
                      valid={!formikProps.errors.name}
                      invalid={formikProps.touched.name && !!formikProps.errors.name}
                      autoFocus={true}
                      required
                      onChange={formikProps.handleChange}
                      onBlur={this.handleBlur}
                      value={formikProps.values.name} />
                    <FormFeedback>{formikProps.errors.name}</FormFeedback>
                  </FormGroup>
                )}
              </Formik>
            </div>
        }
        
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <h6 className=".text-muted font-weight-normal pr-5">{data.name }, Inc</h6>
            <h6 className=".text-muted font-weight-normal pr-5">{data.address1 }</h6>
            <h6 className=".text-muted font-weight-normal pr-5">{data.address2 }</h6>
            <h6 className=".text-muted font-weight-normal pr-5">{data.city } ,{ data.state } , {data.zip}</h6>
          </div>
          <Button color="primary" onClick={this.props.SW} > Edit </Button>
        </div>
      </>
    )
  }
}

export default PaymentShipping