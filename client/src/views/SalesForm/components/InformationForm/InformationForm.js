import React, { Component } from 'react'
import { Button, Card, CardHeader, CardBody, Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, Row } from 'reactstrap';
import { Formik, Field } from 'formik';
import classNames from 'classnames'
import * as Yup from 'yup'

import MaskedInput from "react-text-mask";
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import states from '../../../../_config/states';

import './InformationForm.scss'

const options = states.US;
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
        Address2: Yup.string()
            .min(5, `Address2 has to be at least 5 characters`)
            .required('Address2 is required'),
        city: Yup.string()
            .min(5, `City has to be at least 5 characters`)
            .required('City is required'),
        zipCode: Yup.string()
            .length(5, `Zip Code has to be at 5 characters`)
            .required('Zip Code is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        password: Yup.string()
            .min(6, `Password has to be at least ${6} characters!`)
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
            .required('Password is required'),
        phonenumber: Yup.string()
            .required('Phone Number is required'),
        accept: Yup.bool()
            .required('* required')
            .test('accept', 'You have to accept our Terms and Conditions!', value => value === true),
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
    password: "",
    city: "",
    zipCode: "",
    us_state: "",
    phonenumber: "",
    accept: true
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        // console.log('User has been successfully saved!', values)
        setSubmitting(false)
    }, 2000)
}

class InformationForm extends Component {

    constructor(props) {
        super(props)
        this.touchAll = this.touchAll.bind(this)
        this.state = {
            us_state: [],
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
            Address2: true,
            email: true,
            password: true,
            city: true,
            phonenumber: true,
            zipCode: true,
            us_state: true,
            accept: true
        }
        )
        this.validateForm(errors)
    }

    saveChanges = (value) => {
        this.setState({ us_state: value, us_state_error: false });
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
                            onSubmit={onSubmit}
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
                                                                            options={options}
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

export default InformationForm