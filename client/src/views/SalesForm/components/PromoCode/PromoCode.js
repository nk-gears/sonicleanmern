import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    Button,
    FormGroup,
    Input,
    FormFeedback,
    Col,
    FromGroup,
    InputGroup,
    InputGroupAddon,
    Row
} from 'reactstrap';
import './PromoCode.scss'
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { promocode } from "../.././../../modules/PromoCode";
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
                <h5 className="font-weight-bold">Promo Code: </h5>
                <h6>Promo code has been applied to your card</h6>
            </Col>
        </Row>
    </div>
)

class PromoCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitSuccess: false,
            promocodeValue: ""
        }
    }

    onSubmit = (values, { setSubmitting, setErrors }) => {
        this.setState({
            promocodeValue: values.promo
        })
        this.props.OnClickpromocode(values.promo, this.props.customerId)     
    }

    render() {
        const containerStyle = {
            zIndex: 1999
        };
        const { response } = this.props;
        return (
            <div className="PromoCode">
                <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                <Formik
                    initialValues={{ promo: '' }}
                    onSubmit={this.onSubmit}
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
                                        invalid={formikProps.touched.promo && !!formikProps.errors.promo}
                                        autoFocus={true}
                                        required
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.promo}
                                    />
                                    <FormFeedback>{formikProps.errors.promo}</FormFeedback>
                                </InputGroup>
                                <h5 style={{ textAlign: "center", color: "red" }}> {response == null ? "" : response.error == undefined ? response.errors : response.error}  </h5>
                            </Col>
                        </FormGroup>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = ({ promoCode }) => {
    const { response, isSubmitSuccess } = promoCode;
    return { isSubmitSuccess, response };
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnClickpromocode: (promocodeValue, customerid) => {
            dispatch(promocode(promocodeValue, customerid));
        }
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(PromoCode));
