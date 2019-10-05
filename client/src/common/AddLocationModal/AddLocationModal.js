import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { 
    Button, 
    Card, 
    CardBody, 
    Col, 
    Form, 
    FormFeedback, 
    FormGroup, 
    Label, 
    Input, 
    Row, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';
import { Formik, Field } from 'formik';
import MaskedInput from "react-text-mask";
import 'react-select/dist/react-select.min.css';
import * as Yup from 'yup'
import states from '_config/states';
import FormDropDown from 'common/FormDropDown';
import { fetchStates } from "../../modules/States";
import { savestore, updatestore } from "../../modules/Stores";
import { REQUEST_STATUS } from '_config/constants'
import './AddLocationModal.scss'


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
        storeName: Yup.string()
            .min(2, `Store location name has to be at least 2 characters`)
            .required('Store location name is required'),
        Address: Yup.string()
            .required('Address is required'),
        city: Yup.string()
            .required('City is required'),
        zipCode: Yup.string()
            .length(5, `Zip Code has to be at 5 characters`)
            .required('Zip Code is required'),
        us_state:Yup.string()
            .required('State is required'),
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

class AddLocationModal extends Component {
    constructor(props) {
        super(props)
        this.props.fetchStateData();
        this.touchAll = this.touchAll.bind(this)

        this.state = {            
            us_state: "",
            us_state_error: false,
            initialValues: {}
        }
    }

    componentDidMount = () => {
        if(this.props.index===-1) {
            this.setState({ initialValues: {} })
        } else {
            let storeLocation = this.props.storesData[this.props.index];
            let data = {
                storeName: storeLocation.name,
                Address: storeLocation.address1,
                Address2: storeLocation.address2,
                city: storeLocation.city,
                zipCode: storeLocation.zip,
                phonenumber: storeLocation.phone,
                us_state: storeLocation.state
            }
            this.setState({ initialValues: data })
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
            shippingstate: values.us_state,
            shippingzip: values.zipCode,
            shippingaddress2: values.Address2 || '',
            id: this.props.index >=0 ? this.props.storesData[this.props.index].id : 0
        }
        if(this.props.index<0) {
            this.props.savestore(data);
            setSubmitting(false)
        } else {
            this.props.updatestore(data, this.props.storesData[this.props.index].id)
        }
        
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

    getDefaultState = (state) => {
        let p = options.find(option => option.value === state)
        return p && p.label
    }

    render() {
        const { toggleModal, isSubmitSuccess, response, index } = this.props;

        return (
            <div className="animated fadeIn mt-3 AddLocationModal">
                <Card>
                    <CardBody className="text-left">
                        <Formik
                            initialValues={this.state.initialValues}
                            validate={validate(validationSchema)}
                            onSubmit={this.onSubmit}
                            enableReinitialize={true}
                            render={
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldTouched,
                                    setFieldValue,
                                    isValid,
                                    isSubmitting
                                }) => (
                                        <Row>
                                            <Col>
                                                <Form onSubmit={handleSubmit} noValidate name='addLocationForm'>
                                                    <ModalHeader toggle={toggleModal}>{index>=0 ? 'Edit Store Location' : 'Add Store Location'}</ModalHeader>
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
                                                                    <FormDropDown
                                                                        value={values.us_state && values.us_state}
                                                                        onChange={setFieldValue}
                                                                        onBlur={setFieldTouched}
                                                                        error={errors.us_state}
                                                                        touched={touched.us_state}
                                                                        valid={!errors.us_state}
                                                                        invalid={touched.us_state && !!errors.us_state}
                                                                        id="us_state"
                                                                    />
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

                                                            {
                                                                this.props.index <0 && this.props.state === REQUEST_STATUS.FAIL ? <h6 className="text-danger">Failed: Duplicated store name</h6>: null
                                                            }

                                                        </Row>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" type="submit" disabled={isSubmitting || !isValid}>Submit</Button>
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
    const { response, isSubmitSuccess, storesData, state } = stores;
    return { stateData, response, isSubmitSuccess, storesData, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStateData: () => {
            dispatch(fetchStates());
        },
        savestore: (data) => {
            dispatch(savestore(data));
        },
        updatestore: (data, id) => {
            dispatch(updatestore(data, id))
        }
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(AddLocationModal));

