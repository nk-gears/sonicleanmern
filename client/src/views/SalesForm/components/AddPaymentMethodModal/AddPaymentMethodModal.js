import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import {
    Button, Card, CardBody, Col, Form, FormFeedback, FormGroup, Label, Input, Row, ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap';
import { Formik, Field } from 'formik';
import MaskedInput from "react-text-mask";
import 'react-select/dist/react-select.min.css';
import * as Yup from 'yup'
import { saveCard,  } from "../../../../modules/Cards";
import './AddPaymentMethodModal.scss'
import { REQUEST_STATUS } from '_config/constants';

const cardnumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const expiredateMask = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

const validationSchema = function (values) {
    return Yup.object().shape({
        cardnumber: Yup.string()
            .required('Card Number is required'),
        expiredate: Yup.string()
            .required('Expire Date is required'),
        cvvcode: Yup.string()
            .required('CVV/CVC Code is required'),
        holdername: Yup.string()
            .min(2, `Holder name has to be at least 2 characters`)
            .required('Holder name is required'),
        zipCode: Yup.string()
            .length(5, `Zip Code has to be at 5 characters`)
            .required('Zip Code is required')
    })
}

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

const initialValues = {
    cardnumber: "",
    expiredate: "",
    cvvcode: "",
    holdername: "",
    zipCode: ""
}

class AddPaymentMethodModal extends Component {
    constructor(props) {
        super(props)
        this.touchAll = this.touchAll.bind(this)
        this.state = {
            cardnumber: "",
            expiredate: "",
            cvvcode: "",
            holdername: "",
            zipCode: "",
            cardtype: "",
            validatCvvnumber: ""
        }
    }

    findFirstError(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    validateForm(errors) {
        this.findFirstError('addPayment', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }

    onSubmit = async (values, { setSubmitting, setErrors }) => {
        const validatecvv = this.validateCvvnumber(values.cvvcode)
        if (validatecvv) {
            const data = {
                cardnumber: values.cardnumber,
                cvv: values.cvvcode,
                holdername: values.holdername,
                zipcode: values.zipCode,
                expiredatemonth: values.expiredate.substr(0, 2),
                expiredateyear: values.expiredate.substr(3, 6),
                cardtype: this.state.cardtype,
                customer_id: this.props.customerId,
            }
            console.log(data)
           await this.props.saveCard(data);
        }
    }

    _onBlurCardnumber = (e) => {

        const cardtype = this.GetCardType(e.target.value)
        this.setState({
            cardnumber: e.target.value,
            cardtype: cardtype
        })
    }

    GetCardType(number) {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard     
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }

    _onBlurvalidateCVV = (e) => {
        this.validateCvvnumber(e.target.value)
    }

    validateCvvnumber(cvvNumber) {
        let cardNumber = this.state.cardnumber;
        var firstnumber = Number(cardNumber.substr(0, 1));
        if (firstnumber === 3) {
            if (!cvvNumber.match(/^\d{4}$/)) {
                // The credit card is an American Express card but does not have a four digit CVV code
                this.setState({ validatCvvnumber: `CVV/CVC code has to be 4 characters` });
                return false;
            }
        }
        else if (!cvvNumber.match(/^\d{3}$/)) {
            // The credit card is a Visa, MasterCard, or Discover Card card but does not have a three digit CVV code
            this.setState({ validatCvvnumber: `CVV/CVC code has to be 3 characters` });
            return false;
        }
        this.setState({ validatCvvnumber: `` });
        return true;
    }

    touchAll(setTouched, errors) {
        setTouched({
            cardnumber: true,
            expiredate: true,
            cvvcode: true,
            holdername: true
        })
        this.validateForm(errors)
    }

    render() {
        const { toggleModal, isSubmitSuccess, response, customerId } = this.props;
        return (
            <div className="animated fadeIn mt-3 AddLocationModal">
                <Card>
                    <CardBody className="text-left">
                        <Formik
                            initialValues={initialValues}
                            validate={validate(validationSchema)}
                            onSubmit={this.onSubmit}
                            render={
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isValid
                                }) => (
                                        <Row>
                                            <Col>
                                                <Form onSubmit={handleSubmit} noValidate name='addPayment'>
                                                    <ModalHeader toggle={toggleModal}>Add Payment Method</ModalHeader>
                                                    <ModalBody>
                                                        <Row>
                                                            <Col md={12}>
                                                                <FormGroup>
                                                                    <Label>Card Number</Label>
                                                                    <Field
                                                                        name="cardnumber"
                                                                        render={({ field }) => (
                                                                            <MaskedInput
                                                                                {...field}
                                                                                mask={cardnumberMask}
                                                                                id="cardnumber"
                                                                                type="text"
                                                                                onChange={handleChange}
                                                                                onBlur={this._onBlurCardnumber}
                                                                                required
                                                                                className={
                                                                                    errors.cardnumber && touched.cardnumber
                                                                                        ? "is-invalid form-control"
                                                                                        : "form-control"
                                                                                }
                                                                            />
                                                                        )}
                                                                    />
                                                                    <FormFeedback>{errors.cardnumber}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <FormGroup>
                                                                    <Label>Expire Date</Label>
                                                                    <Field
                                                                        name="expiredate"
                                                                        render={({ field }) => (
                                                                            <MaskedInput
                                                                                {...field}
                                                                                mask={expiredateMask}
                                                                                id="expiredate"
                                                                                type="text"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                required
                                                                                className={
                                                                                    errors.expiredate && touched.expiredate
                                                                                        ? "is-invalid form-control"
                                                                                        : "form-control"
                                                                                }
                                                                            />
                                                                        )}
                                                                    />
                                                                    <FormFeedback>{errors.expiredate}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md={12}>
                                                                <FormGroup>
                                                                    <Label for="cvvcode">CVV/CVC</Label>
                                                                    <Input type="cvvcode"
                                                                        name="cvvcode"
                                                                        id="cvvcode"
                                                                        autoComplete="cvvcode"
                                                                        valid={!errors.cvvcode}
                                                                        invalid={touched.cvvcode && !!errors.cvvcode}
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={this._onBlurvalidateCVV}
                                                                        value={values.cvvcode} />
                                                                    {/* <h5 style={{ textAlign: "center", color: "red" }}></h5> */}
                                                                    <div style={{ color: "red" }}>{this.state.validatCvvnumber}</div>
                                                                    <FormFeedback>{errors.cvvcode}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <FormGroup>
                                                                    <Label for="cardtype">Card Type</Label>
                                                                    <Input
                                                                        readOnly
                                                                        type="cardtype"
                                                                        name="cardtype"
                                                                        id="cardtype"
                                                                        autoComplete="cardtype"
                                                                        valid={!errors.cardtype}
                                                                        invalid={touched.cardtype && !!errors.cardtype}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={this.state.cardtype} />
                                                                    <FormFeedback>{errors.cardtype}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="holdername">Holder Name</Label>
                                                                    <Input type="holdername"
                                                                        name="holdername"
                                                                        id="holdername"
                                                                        autoComplete="holdername"
                                                                        valid={!errors.holdername}
                                                                        invalid={touched.holdername && !!errors.holdername}
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.holdername} />
                                                                    <FormFeedback>{errors.holdername}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="email">Zip Code</Label>
                                                                    <Input type="zipCode"
                                                                        name="zipCode"
                                                                        id="zipCode"
                                                                        autoComplete="zipCode"
                                                                        valid={!errors.zipCode}
                                                                        invalid={touched.zipCode && !!errors.zipCode}
                                                                        required
                                                                        maxLength={5}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.zipCode} />
                                                                    <FormFeedback>{errors.zipCode}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                            {
                                                                this.props.state === REQUEST_STATUS.FAIL ? <h6 className="text-danger">Failed: Duplicated card number</h6> : null
                                                            }
                                                        </Row>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" type="submit" disabled={!isValid}>Submit</Button>
                                                        <Button color="danger" onClick={toggleModal}>Cancel</Button>
                                                    </ModalFooter>
                                                </Form>

                                            </Col>
                                        </Row>
                                    )} />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = ({ card }) => {
    const { response, isSubmitSuccess, state } = card;
    return { response, isSubmitSuccess, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCard: (data) => {
            dispatch(saveCard(data));
        },
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(AddPaymentMethodModal));