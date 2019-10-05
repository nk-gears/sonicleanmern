import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import {
    Col,
    Form,
    Row,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import classNames from 'classnames'
import { validate } from '_helpers/helper'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { saveUser } from "../../../../../modules/Users";
import { REQUEST_STATUS } from '_config/constants'
import './AddNewUser.scss'

const validationSchema = function (values) {
    return Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        firstName: Yup.string()
            .min(2, `First name has to be at least 2 characters`)
            .required('First name is required'),
        lastName: Yup.string()
            .min(1, `Last name has to be at least 1 character`)
            .required('Last name is required'),

    })
}

const initialValues = {
    email: '',
    firstName: '',
    lastName: ''
}


const AddNewUser = ({ toogle, toggleModal, saveUser, isSubmitSuccess, state }) => {

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        let data = {};
        data.firstname = values.firstName;
        data.lastname = values.lastName;
        data.email = values.email;
        setSubmitting(true)
        saveUser(data)
        setSubmitting(false)
    }

    useEffect(()=>{
        if (state === REQUEST_STATUS.SUCCESS && isSubmitSuccess) {
            toggleModal()
        }
    }, [state, isSubmitSuccess])

    return (
        <div className="animated fadeIn mt-3 ReferralModal">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validate={validate(validationSchema)}
                onSubmit={onSubmit}
                render={
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        handleReset
                    }) => (
                            <Modal isOpen={toogle}
                                className={'modal-primary ReferralModal ' + 'modal-md'}>
                                <Form onSubmit={handleSubmit} noValidate name='referralForm'>
                                    <ModalHeader toggle={toggleModal}>Add New User</ModalHeader>
                                    <ModalBody>
                                        <Row>
                                            <Col>
                                                <Row className="mt-3">
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="firstName">First Name</Label>
                                                            <div>
                                                                <Input type="firstName"
                                                                    name="firstName"
                                                                    id="firstName"
                                                                    autoComplete="firstName"
                                                                    valid={!errors.firstName}
                                                                    invalid={touched.firstName && !!errors.firstName}
                                                                    required
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.firstName} />
                                                                <FormFeedback>{errors.firstName}</FormFeedback>
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="lastName">Last Name</Label>
                                                            <div>
                                                                <Input type="lastName"
                                                                    name="lastName"
                                                                    id="lastName"
                                                                    autoComplete="lastName"
                                                                    valid={!errors.lastName}
                                                                    invalid={touched.lastName && !!errors.lastName}
                                                                    required
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.lastName} />
                                                                <FormFeedback>{errors.lastName}</FormFeedback>
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className="mt-2">
                                                        <FormGroup>
                                                            <Label for="email">Email Address</Label>
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
                                                </Row>
                                            </Col>
                                        </Row> 
                                    </ModalBody>
                                    <ModalFooter>
                                    {
                                        <>
                                            <Button color="primary" type="submit" disabled={!isValid}>Add</Button>
                                            <Button color="danger" onClick={toggleModal}>Cancel</Button>
                                        </> 
                                    }
                                   </ModalFooter>
                                </Form>
                            </Modal>

                        )} />

        </div>
    )
}

const mapStateToProps = ({ users }) => {
    const { isSubmitSuccess, state } = users;
    return { isSubmitSuccess, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (data) => {
            dispatch(saveUser(data));
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(AddNewUser);