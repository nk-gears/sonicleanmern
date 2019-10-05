import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, Row } from 'reactstrap';
import { Formik, Field } from 'formik';
import classNames from 'classnames'
import * as Yup from 'yup'

import MaskedInput from "react-text-mask";
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { fetchStates } from "../../../../modules/States";
import { saveCusomter } from "../../../../modules/Customer";
import './InformationForm.scss'


const phoneNumberMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

const validationSchema = function (values) {
    return Yup.object().shape({
        firstName: Yup.string()
            .min(2, `First name has to be at least 2 characters`)
            .required('First name is required'),
        lastName: Yup.string()
            .min(1, `Last name has to be at least 1 character`)
            .required('Last name is required'),
        Address: Yup.string()
            .min(5, `Address has to be at least 5 characters`)
            .required('Address is required'),
        city: Yup.string()
            .min(5, `City has to be at least 5 characters`)
            .required('City is required'),
        zipCode: Yup.string()
            .length(5, `Zip Code has to be at 5 characters`)
            .required('Zip Code is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        phonenumber: Yup.string()
            .required('Phone Number is required')
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
    firstName: "",
    lastName: "",
    Address: "",
    Address2: "",
    email: "",
    city: "",
    zipCode: "",
    us_state: "",
    phonenumber: "",
    accept: true
}


class InformationForm extends Component {

    constructor(props) {
        super(props)
        this.props.fetchStateData();
        this.touchAll = this.touchAll.bind(this)
        this.state = {
            firstName: "",
            lastName: "",
            Address: "",
            Address2: "",
            email: "",
            city: "",
            zipCode: "",
            us_state: "",
            phonenumber: "",
            us_state_error: false,
            accept: true
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
        this.findFirstError('simpleForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }

    touchAll(setTouched, errors) {
        setTouched({
            firstName: false,
            lastName: true,
            Address: true,
            email: true,
            city: true,
            phonenumber: true,
            zipCode: true,
            us_state: true
        }
        )
        this.validateForm(errors)
    }

    saveChanges = (value) => {
        this.setState({ us_state: value, us_state_error: false });
    }


    onSubmit = (values, { setSubmitting, setErrors }) => {
        const data = {
            firstname: values.firstName,
            phone: values.phonenumber,
            address1: values.Address,
            city: values.city,
            state: this.state.us_state.value,
            zip: values.zipCode,
            address2: values.Address2,
            lastname: values.lastName,
            email: values.email,
            sendemailconfirmation: values.accept,
        }
        this.props.saveCusomter(data, this.state.us_state.label);
    }

    handleBlur = () => {
        if (this.state.us_state === null) {
            this.setState({ us_state_error: true })
        } else {
            if (this.state.us_state.length > 0 || this.state.us_state.length === undefined) {
                this.setState({ us_state_error: false })
            } else {
                this.setState({ us_state_error: true })
            }
        }
    }
    render() {
        const { stateData, isSubmitSuccess, response } = this.props;
        return (
            <div className="animated fadeIn mt-3 InformationForm">
                <Card>
                    <CardHeader className="text-left">
                        <i className="icon-note"></i><strong>Customer Shipping Information</strong>
                    </CardHeader>
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
                                    status,
                                    dirty,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    isValid,
                                    handleReset,
                                    setTouched
                                }) => (
                                        <Row>
                                            <Col>
                                                <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="firstName">First Name</Label>
                                                                <Input type="text"
                                                                    name="firstName"
                                                                    id="firstName"
                                                                    autoComplete="given-name"
                                                                    valid={!errors.firstName}
                                                                    invalid={touched.firstName && !!errors.firstName}
                                                                    autoFocus={true}
                                                                    required
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.firstName} />
                                                                <FormFeedback>{errors.firstName}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="lastName">Last Name</Label>
                                                                <Input type="text"
                                                                    name="lastName"
                                                                    id="lastName"
                                                                    autoComplete="family-name"
                                                                    valid={!errors.lastName}
                                                                    invalid={touched.lastName && !!errors.lastName}
                                                                    required
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.lastName} />
                                                                <FormFeedback>{errors.lastName}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="email">Email</Label>
                                                                <div>
                                                                    <Input type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        autoComplete="email"
                                                                        valid={!errors.email}
                                                                        invalid={touched.email && !!errors.email}
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.email} />
                                                                    <FormFeedback>{errors.email}</FormFeedback>
                                                                </div>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label>Phone Number</Label>
                                                                <Field
                                                                    name="phonenumber"
                                                                    render={({ field }) => (
                                                                        <MaskedInput
                                                                            {...field}
                                                                            mask={phoneNumberMask}
                                                                            id="phonenumber"
                                                                            type="text"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            required
                                                                            className={
                                                                                errors.phonenumber && touched.phonenumber
                                                                                    ? "is-invalid form-control"
                                                                                    : "form-control"
                                                                            }
                                                                        />
                                                                    )}
                                                                />
                                                                <FormFeedback>{errors.phonenumber}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <FormGroup>
                                                        <Label for="Address">Address 1</Label>
                                                        <Input type="text"
                                                            name="Address"
                                                            id="Address"
                                                            placeholder="e.g. 123 Main St."
                                                            autoComplete="address"
                                                            valid={!errors.Address}
                                                            invalid={touched.Address && !!errors.Address}
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.Address} />
                                                        <FormFeedback>{errors.Address}</FormFeedback>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label for="Address">Address 2</Label>
                                                        <Input type="text"
                                                            name="Address2"
                                                            id="Address2"
                                                            placeholder="e.g. Unit, Ste, Apt..."
                                                            autoComplete="address2"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.Address2} />
                                                    </FormGroup>

                                                    <Row>
                                                        <Col md={4}>
                                                            <FormGroup>
                                                                <Label for="email">City</Label>
                                                                <Input type="city"
                                                                    name="city"
                                                                    id="city"
                                                                    autoComplete="city"
                                                                    valid={!errors.city}
                                                                    invalid={touched.city && !!errors.city}
                                                                    required
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.city} />
                                                                <FormFeedback>{errors.city}</FormFeedback>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={4}>
                                                            <FormGroup>
                                                                <Label for="confirmPassword">State</Label>
                                                                <Field
                                                                    name="us_state"
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            name="us_state"
                                                                            id="us_state"
                                                                            value={this.state.us_state}
                                                                            options={stateData}
                                                                            valid={!errors.us_state}
                                                                            invalid={touched.us_state && !!errors.us_state}
                                                                            onChange={this.saveChanges}
                                                                            onBlur={() => this.handleBlur()}
                                                                            className={classNames(this.state.us_state_error ? "error-select" : "")}
                                                                        />)}
                                                                />
                                                                {this.state.us_state_error ? <div className="error">State is required</div> : ''}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={4}>
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
                                                    </Row>

                                                    <FormGroup className="text-center mt-3 mb-3">
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="accept"
                                                            name="accept"
                                                            checked={values.accept}
                                                            label="Send email to customer with order confirmation and tracking information"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} >
                                                        </CustomInput>
                                                    </FormGroup>
                                                    <FormGroup className="text-center mt-3 mb-3">
                                                        <Button color="primary" type="submit">Submit</Button>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <h5 style={{ textAlign: "center", color: "green" }}> {isSubmitSuccess ? "Customer  is saved successFully." : ""} </h5>
                                                        <h5 style={{ textAlign: "center", color: "red" }}> {response == null   ? "" : isSubmitSuccess ? "": response.data.error }  </h5>
                                                    </FormGroup>
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

const mapStateToProps = ({ states, customer, salesform }) => {
    const { stateData } = states;
    const { response, isSubmitSuccess, id } = customer;
    const { customerinfo } = salesform;
    return { stateData, response, isSubmitSuccess, id, customerinfo };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStateData: () => {
            dispatch(fetchStates());
        },
        saveCusomter: (data,stateName) => {
            dispatch(saveCusomter(data,stateName));
        }       
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(InformationForm));