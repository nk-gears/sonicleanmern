import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, Row, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classNames from 'classnames'
import { Formik, Field } from 'formik';
import MaskedInput from "react-text-mask"
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import * as Yup from 'yup';
import { fetchStates } from "../../../../modules/States";
import { savestore } from "../../../../modules/Stores";
import './AddLocationModal.scss'

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
        storeName: Yup.string()
            .min(2, `Store location name has to be at least 2 characters`)
            .required('Store location name is required'),
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
        phonenumber: Yup.string()
            .required('Store phone number is required')
    })
}

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error);
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
    storeName: "",
    Address: "",
    Address2: "",
    city: "",
    zipCode: "",
    phonenumber: "",
    us_state: "",
}


class AddLocationModal extends Component {
    constructor(props) {
        super(props)
        this.props.fetchStateData();
        this.touchAll = this.touchAll.bind(this)
        this.state = {
            storeName: "",
            Address: "",
            Address2: "",
            city: "",
            zipCode: "",
            phonenumber: "",
            us_state: "",
            us_state_error: false,
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
    onSubmit = (values, { setSubmitting, setErrors }) => {
        const data = {
            name: values.storeName,
            storephone: values.phonenumber,
            shippingaddress1: values.Address,
            shippingcity: values.city,
            shippingstate: this.state.us_state.value,
            shippingzip: values.zipCode,
            shippingaddress2: values.Address2,
        }
        this.props.savestore(data);
    }

    validateForm(errors) {
        this.findFirstError('addLocationForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }

    touchAll(setTouched, errors) {
        setTouched({
            Address: true
        })
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
        const { stateData, toggleModal, isSubmitSuccess, response } = this.props;
        if (isSubmitSuccess == true) {
            toggleModal(isSubmitSuccess);
        }
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
                                                <Form onSubmit={handleSubmit} noValidate name='addLocationForm'>
                                                    <ModalHeader toggle={toggleModal}>Add Store Location</ModalHeader>
                                                    <ModalBody>
                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="storeName">Store Location Name</Label>
                                                                    <Input type="text"
                                                                        name="storeName"
                                                                        id="storeName"
                                                                        valid={!errors.storeName}
                                                                        invalid={touched.storeName && !!errors.storeName}
                                                                        autoFocus={true}
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.storeName} />
                                                                    <FormFeedback>{errors.storeName}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label>Store Phone Number</Label>
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
                                                                autoComplete="address2"
                                                                placeholder="e.g. Unit, Ste, Apt...."
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
                                                                                className={classNames(this.state.us_state_error ? 'error-select' : '')}
                                                                            />)}
                                                                    />
                                                                    {this.state.us_state_error ? <div className="error">State is required</div> : ''}
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                    <Label for="email">Zip Code</Label>
                                                                    <Input type="number"
                                                                        name="zipCode"
                                                                        id="zipCode"
                                                                        autoComplete="zipCode"
                                                                        valid={!errors.zipCode}
                                                                        invalid={touched.zipCode && !!errors.zipCode}
                                                                        required
                                                                        maxLength="200"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.zipCode} />
                                                                    <FormFeedback>{errors.zipCode}</FormFeedback>
                                                                </FormGroup>
                                                            </Col>

                                                            <h5 style={{ textAlign: "center", color: "red" }}> {response == null ? "" : response.error}  </h5>
                                                            <h5 style={{ textAlign: "center", color: "red" }}> {response == null ? "" : response.errors}  </h5>

                                                        </Row>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" type="submit">Submit</Button>
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


const mapStateToProps = ({ states, stores }) => {
    const { stateData } = states;
    const { response, isSubmitSuccess } = stores;
    return { stateData, response, isSubmitSuccess };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStateData: () => {
            dispatch(fetchStates());
        },
        savestore: (data) => {
            dispatch(savestore(data));
        }
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(AddLocationModal));