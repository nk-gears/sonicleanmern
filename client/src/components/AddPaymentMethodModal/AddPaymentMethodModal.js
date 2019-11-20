import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import MaskedInput from 'react-text-mask';
import { saveCard, endCards } from 'modules/Cards';
import { REQUEST_STATUS } from '_config/constants';
import { validate, cardnumberMask, expiredateMask } from 'utils/validate';
import * as Yup from 'yup';
import 'react-select/dist/react-select.min.css';

const validationSchema = function(values) {
  return Yup.object().shape({
    cardnumber: Yup.string().required('Card Number is required'),
    expiredate: Yup.string().required('Expire Date is required'),
    cvvcode: Yup.string().required('CVV/CVC Code is required'),
    holdername: Yup.string()
      .min(2, `Holder name has to be at least 2 characters`)
      .required('Holder name is required'),
    zipCode: Yup.string()
      .length(5, `Zip Code has to be at 5 characters`)
      .required('Zip Code is required'),
  });
};

const initialValues = {
  cardnumber: '',
  expiredate: '',
  cvvcode: '',
  holdername: '',
  zipCode: '',
};

const AddPaymentMethodModal = ({
  toggleModal,
  saveCard,
  state,
  endfetchCards,
  error,
  id,
}) => {
  const [cardnumber, setCardnumber] = useState('');
  const [cardtype, setCardtype] = useState('');
  const [validatCvvnumber, setValidateCvvnumber] = useState('');
  const [errorMessage, setErrors] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (state === REQUEST_STATUS.SUCCESS) {
      setModal(false);
    } else if (state === REQUEST_STATUS.FAIL) {
      setErrors(error);
    }
  }, [state]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const validatecvv = validateCvvnumber(values.cvvcode);
    if (validatecvv) {
      const data = {
        cardnumber: values.cardnumber,
        cvvcode: values.cvvcode,
        holdername: values.holdername,
        zipcode: values.zipCode,
        expiredatemonth: values.expiredate.substr(0, 2),
        expiredateyear: values.expiredate.substr(3, 6),
      };
      await saveCard(data, id);
    }
  };

  const _onBlurCardnumber = e => {
    const cardtype = GetCardType(e.target.value);
    setCardnumber(e.target.value);
    setCardtype(cardtype);
  };

  const GetCardType = number => {
    // visa
    var re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      return 'Mastercard';

    // AMEX
    re = new RegExp('^3[47]');
    if (number.match(re) != null) return 'AMEX';

    // Discover
    re = new RegExp(
      '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)'
    );
    if (number.match(re) != null) return 'Discover';

    // Diners
    re = new RegExp('^36');
    if (number.match(re) != null) return 'Diners';

    // Diners - Carte Blanche
    re = new RegExp('^30[0-5]');
    if (number.match(re) != null) return 'Diners - Carte Blanche';

    // JCB
    re = new RegExp('^35(2[89]|[3-8][0-9])');
    if (number.match(re) != null) return 'JCB';

    // Visa Electron
    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) != null) return 'Visa Electron';

    return '';
  };

  const _onBlurvalidateCVV = e => {
    validateCvvnumber(e.target.value);
  };

  const validateCvvnumber = cvvNumber => {
    let cardNumber = cardnumber;
    var firstnumber = Number(cardNumber.substr(0, 1));
    if (firstnumber === 3) {
      if (!cvvNumber.match(/^\d{4}$/)) {
        // The credit card is an American Express card but does not have a four digit CVV code
        setValidateCvvnumber('CVV/CVC code has to be 4 characters');
        return false;
      }
    } else if (!cvvNumber.match(/^\d{3}$/)) {
      // The credit card is a Visa, MasterCard, or Discover Card card but does not have a three digit CVV code
      setValidateCvvnumber('CVV/CVC code has to be 3 characters');
      return false;
    }
    setValidateCvvnumber('');
    return true;
  };

  return (
    <div className="animated fadeIn mt-3 AddLocationModal">
      <Button
        size="md"
        className="btn-success btn-brand mr-1 mb-1 float-right"
        onClick={() => setModal(true)}
      >
        <i className="fa fa-plus"></i>
        <span>Add New Card</span>
      </Button>
      <Modal isOpen={modal} className="modal-primary">
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={onSubmit}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <Row>
              <Col>
                <Form onSubmit={handleSubmit} noValidate name="addPayment">
                  <ModalHeader>Add Payment Method</ModalHeader>
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
                                onBlur={_onBlurCardnumber}
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
                            onBlur={_onBlurvalidateCVV}
                            value={values.cvvcode}
                          />
                          {/* <h5 style={{ textAlign: "center", color: "red" }}></h5> */}
                          <div style={{ color: 'red' }}>{validatCvvnumber}</div>
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
                            value={cardtype}
                          />
                          <FormFeedback>{errors.cardtype}</FormFeedback>
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
                            invalid={touched.holdername && !!errors.holdername}
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
                      <Col>
                        {state === REQUEST_STATUS.FAIL ? (
                          <h6 className="text-danger">
                            {errorMessage.message}
                          </h6>
                        ) : null}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" type="submit" disabled={!isValid}>
                      Submit
                    </Button>
                    <Button color="danger" onClick={() => setModal(false)}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </Col>
            </Row>
          )}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ card }) => {
  const { state, error } = card;
  return { state, error };
};

const mapDispatchToProps = dispatch => {
  return {
    saveCard: (data, id) => {
      dispatch(saveCard(data, id));
    },
    endfetchCards: () => {
      dispatch(endCards());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null)(AddPaymentMethodModal)
);
