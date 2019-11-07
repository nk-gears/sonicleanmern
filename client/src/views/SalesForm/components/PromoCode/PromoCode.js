import React, { Component } from 'react'
import {
    Button,
    FormGroup,
    Input,
    FormFeedback,
    Col,
    InputGroup,
    InputGroupAddon,
    Row
} from 'reactstrap';
import './PromoCode.scss'
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object().shape({
    promo: yup
        .string()
        .min(2, `Promo code has to be at least 2 characters`)
});

const Msg = () => (
    <div className="toastContent">
        <Row>
            <Col md={2}>
                <i className="cui-circle-check icons font-2xl d-block mt-3"></i>
            </Col>
            <Col md={10}>
                <h5 className="font-weight-bold">Promo Code: KAR16</h5>
                <h6>Promo code has been applied to your card</h6>
            </Col>
        </Row>
    </div>
)

class PromoCode extends Component {

    success = () => {
        return toast.success(<Msg />, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    
    render() {
        const containerStyle = {
            zIndex: 1999
        };
        return (
            <div className="PromoCode">
                <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={(values, actions) => {
                        this.success()
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    validationSchema={validationSchema}
                >
                    {formikProps => (
                        <FormGroup row>
                            <Col md="12">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Button type="submit" onClick={formikProps.handleSubmit} color="primary" disabled={!formikProps.isValid} >Apply</Button>
                                    </InputGroupAddon>
                                    <Input type="text" 
                                        name="promo"
                                        id="promo"
                                        placeholder="Promo Code"
                                        valide={!formikProps.errors.promo}
                                        invalid={formikProps.touched.promo && !!formikProps.errors.promo}
                                        autoFocus={true}
                                        required
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.promo}
                                        />
                                        <FormFeedback>{formikProps.errors.promo}</FormFeedback>
                                </InputGroup>
                                
                            </Col>
                        </FormGroup>
                    )}
                </Formik>
            </div>
        )
    }
}

export default PromoCode