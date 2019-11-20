import React, { Component } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import classNames from 'classnames';
import { Formik, Field } from 'formik';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import * as Yup from 'yup';
import states from '../../../../_config/states';

import './AddPaymentMethodModal.scss';

const options = states.US;
const cardnumberMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const expiredateMask = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const validationSchema = function(values) {
  return Yup.object().shape({
    cardnumber: Yup.string().required('Card Number is required'),
    expiredate: Yup.string().required('Expire Date is required'),
    cvvcode: Yup.string()
      .min(3, `CVV/CVC code has to be at least 3 characters`)
      .required('CVV/CVC Code is required'),
    holdername: Yup.string()
      .min(2, `Holder name has to be at least 2 characters`)
      .required('Holder name is required'),
    Address: Yup.string()
      .min(5, `Address has to be at least 5 characters`)
      .required('Address is required'),
    Address2: Yup.string()
      .min(5, `Address2 has to be at least 5 characters`)
      .required('Address2 is required'),
    city: Yup.string()
      .length(5, `City has to be at 5 characters`)
      .required('City is required'),
    zipCode: Yup.string()
      .length(5, `Zip Code has to be at 5 characters`)
      .required('Zip Code is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        'Password must contain: numbers, uppercase and lowercase letters\n'
      )
      .required('Password is required'),
    phonenumber: Yup.string().required('Phone Number is required'),
    us_state: Yup.string().required('state is required'),
    accept: Yup.bool()
      .required('* required')
      .test(
        'accept',
        'You have to accept our Terms and Conditions!',
        value => value === true
      ),
  });
};

const validate = getValidationSchema => {
  return values => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const getErrorsFromValidationError = validationError => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

const initialValues = {
  cardnumber: '',
  expiredate: '',
  cvvcode: '',
  holdername: '',
};

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    // console.log('User has been successfully saved!', values)
    setSubmitting(false);
  }, 2000);
};

class AddPaymentMethodModal extends Component {
  constructor(props) {
    super(props);
    this.touchAll = this.touchAll.bind(this);

    this.state = {
      us_state: [],
      us_state_error: false,
    };
  }

  findFirstError(formName, hasError) {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus();
        break;
      }
    }
  }

  validateForm(errors) {
    this.findFirstError('simpleForm', fieldName => {
      return Boolean(errors[fieldName]);
    });
  }

  touchAll(setTouched, errors) {
    setTouched({
      cardnumber: true,
      expiredate: true,
      cvvcode: true,
      holdername: true,
    });
    this.validateForm(errors);
  }

  saveChanges = value => {
    this.setState({ us_state: value, us_state_error: false });
  };

  handleBlur = () => {
    if (this.state.us_state === null) {
      this.setState({ us_state_error: true });
    } else {
      if (
        this.state.us_state.length > 0 ||
        this.state.us_state.length === undefined
      ) {
        this.setState({ us_state_error: false });
      } else {
        this.setState({ us_state_error: true });
      }
    }
  };

  render() {
    return (
      <div className="animated fadeIn mt-3 AddLocationModal">
        <Card>
          <CardBody className="text-left">
            <Formik
              initialValues={initialValues}
              validate={validate(validationSchema)}
              onSubmit={onSubmit}
              render={({
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
                setTouched,
              }) => (
                <Row>
                  <Col>
                    <Form
                      onSubmit={handleSubmit}
                      noValidate
                      name="addLocationForm"
                    >
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
                                  onBlur={handleBlur}
                                  required
                                  className={
                                    errors.cardnumber && touched.cardnumber
                                      ? 'is-invalid form-control'
                                      : 'form-control'
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
                                      ? 'is-invalid form-control'
                                      : 'form-control'
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
                            <Input
                              type="cvvcode"
                              name="cvvcode"
                              id="cvvcode"
                              autoComplete="cvvcode"
                              valid={!errors.cvvcode}
                              invalid={touched.cvvcode && !!errors.cvvcode}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.cvvcode}
                            />
                            <FormFeedback>{errors.cvvcode}</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="holdername">Holder Name</Label>
                            <Input
                              type="holdername"
                              name="holdername"
                              id="holdername"
                              autoComplete="holdername"
                              valid={!errors.holdername}
                              invalid={
                                touched.holdername && !!errors.holdername
                              }
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.holdername}
                            />
                            <FormFeedback>{errors.holdername}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="email">Zip Code</Label>
                            <Input
                              type="zipCode"
                              name="zipCode"
                              id="zipCode"
                              autoComplete="zipCode"
                              valid={!errors.zipCode}
                              invalid={touched.zipCode && !!errors.zipCode}
                              required
                              maxLength={5}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.zipCode}
                            />
                            <FormFeedback>{errors.zipCode}</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              )}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddPaymentMethodModal;
