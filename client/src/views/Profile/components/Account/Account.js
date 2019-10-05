import React from 'react'
import classNames from 'classnames'
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, CustomInput, Button} from 'reactstrap'
import { Formik, Field } from 'formik';
import * as Yup from 'yup'

import MaskedInput from "react-text-mask";
import { validate, getErrorsFromValidationError } from '../../../../_helpers/helper.js'

import './Account.scss'

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
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
    })
}

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobilephone: '',
    workphone: '',
    extension: ''
}

const Account = () => {

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="Account mt-5">
            <Row>
                <Col>
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
                                    <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >First Name*</Label>
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
                                                    <Label >Last Name*</Label>
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
                                                    <Label >Email Address*</Label>
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
                                                    <Label>Mobile Phone</Label>
                                                    <Field
                                                        name="mobilephone"
                                                        render={({ field }) => (
                                                            <MaskedInput
                                                                {...field}
                                                                mask={phoneNumberMask}
                                                                id="phonenumber"
                                                                type="text"
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        )}
                                                    />
                                                    <FormFeedback>{errors.phonenumber}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Work Phone</Label>
                                                    <Field
                                                        name="workphone"
                                                        render={({ field }) => (
                                                            <MaskedInput
                                                                {...field}
                                                                mask={phoneNumberMask}
                                                                id="phonenumber"
                                                                type="text"
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        )}
                                                    />
                                                    <FormFeedback>{errors.phonenumber}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col >
                                                <FormGroup>
                                                    <Label >Extension</Label>
                                                    <Input type="extension"
                                                        name="extension"
                                                        id="extension"
                                                        autoComplete="extension"
                                                        onChange={handleChange}
                                                        value={values.extension} />
                                                    <FormFeedback>{errors.extension}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Label >Upload Profile Picture (50px by 50px)</Label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" name="profilepicture" id="profilepicture" />
                                                    <label className="custom-file-label" >Choose file</label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className="float-right">
                                            <Col>
                                                <FormGroup>
                                                    <Button type="submit" color="success" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Submit'}</Button>
                                                    <Button type="reset" color="danger" className="mr-1" onClick={handleReset}>Reset</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                )} 
                        />
                </Col>
            </Row>
        </div>
    )
}

export default Account
