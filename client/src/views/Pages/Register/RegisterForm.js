import React from 'react'
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  Label,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup'

import FormInput from 'components/common/FormInput'
import FormPhoneInput from 'components/common/FormPhoneInput'
import FormSelect from 'components/common/FormSelect'
import {mohawkBrands} from '_config/constants'
import states from '_config/states';

import './Register.scss'
import { REQUEST_STATUS } from '_config/constants';

const us_state = states.US;

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, `First name has to be at least 2 characters`)
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, `Last name has to be at least 1 character`)
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    phoneNumber: Yup.string()
        .required('Phone number is required'),
    companyName: Yup.string()
        .required('Company name is required'),
    websiteURL: Yup.string()
        .min(2, `Website URL has to be at least 2 characters`)
        .required('Website URL is required'),
    mohawkAccount: Yup.string()
        .min(6, "Must be exactly 6 characters")
        .max(6, "Must be exactly 6 characters")
        .required('Mohawk Account is required'),
    address1: Yup.string()
        .min(5, `Address has to be at least 5 characters`)
        .required('Address is required'),
    city: Yup.string()
        .min(5, `City has to be at least 5 characters`)
        .required('City is required'),
    zipcode: Yup.string()
        .length(5, `Zip Code has to be at 5 characters`)
        .required('Zip Code is required'),
  });
  

const RegisterForm = ({submit, state}) => {

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        submit(values)
    }

    return (
            <Formik
                initialValues={{
                    firstName: '',
                    mohawkBrand: 'Mohawk',
                    us_state: 'AL'
                }}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
                render={
                    ({
                        handleSubmit,
                        isValid
                    }) => (
                        <Form onSubmit={handleSubmit} noValidate name='referralForm'>
                        <Row>
                            <Col>
                            <Row className="mt-3">
                                <Col md={6}>
                                    <Label for="firstName" className="text-muted">First Name</Label>
                                    <Field name="firstName" type={'text'} component={FormInput}/>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName" className="text-muted">Last Name</Label>
                                    <Field name="lastName" type={'text'} component={FormInput}/>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} >
                                <FormGroup>
                                    <Label for="email" className="text-muted">Email Address</Label>
                                    <Field name="email" type={'email'} component={FormInput} />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="phoneNumber" className="text-muted">Phone Number</Label>
                                    <Field name="phoneNumber" type={'text'} component={FormPhoneInput} />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="companyName" className="text-muted">Company Name</Label>
                                    <Field name="companyName" type={'text'} component={FormInput} />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="websiteURL" className="text-muted">Website URL</Label>
                                    <Field name="websiteURL" type={'text'} component={FormInput} />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="mohawkAccount" className="text-muted">Mohawk Account #</Label>
                                    <Field name="mohawkAccount" type={'number'} component={FormInput} />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="mohawkBrand">Which products Mohawk brands do you sell?</Label>
                                    <Field name="mohawkBrand" component={FormSelect} options={mohawkBrands} />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={12}>
                                <h4 className="text-center">Shipping Address (Main Store Location)</h4>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col md={12}>
                                <h6 className="text-center text-muted font-weight-normal">You can add additional store locations once your account has been activated</h6>
                                </Col>
                            </Row>

                            <FormGroup>

                                <Label for="Address1">Address 1</Label>
                                <Field name="address1" type={'text'} component={FormInput} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="Address">Address 2</Label>
                                <Field name="address2" type={'text'} component={FormInput} />
                            </FormGroup>

                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <Field name="city" type={'text'} component={FormInput} />
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="confirmPassword">State</Label>
                                    <Field name="us_state" component={FormSelect} options={us_state} />
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="zipcode">Zip Code</Label>
                                    <Field name="zipcode" type={'text'} component={FormInput} />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="mt-3">
                                    <Button type="submit" color="success" className="mr-1 btn-block" disabled={!isValid || state===REQUEST_STATUS.PENDING} >Submit</Button>
                                </Col>
                            </Row>
                            </Col>
                        </Row>

                        </Form>
                    )} />
    )
}

export default RegisterForm
