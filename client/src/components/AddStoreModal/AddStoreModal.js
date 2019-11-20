import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import states from '_config/states';
import FormInput from 'components/common/FormInput';
import FormPhoneInput from 'components/common/FormPhoneInput';
import FormSelect from 'components/common/FormSelect';
import { savestore, putstore } from '../../modules/Stores';
import { REQUEST_STATUS } from '_config/constants';
import './AddStoreModal.scss';

const us_state = states.US;

const storeLocationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, `Store name has to be at least 2 characters`)
    .required('Store name is required'),
  address1: Yup.string().required('Address1 is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.string()
    .length(5, `Zip Code has to be at 5 characters`)
    .required('Zip Code is required'),
});

const AddStoreModal = ({
  savestore,
  state,
  type = 'ADD',
  initialData,
  storesData,
  updatestore,
  error,
  id,
}) => {
  const [modal, setModal] = useState(false);
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    if (state === REQUEST_STATUS.SUCCESS) {
      setModal(false);
    } else if (state === REQUEST_STATUS.FAIL) {
      setError(error);
    }
  }, [state]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (type === 'ADD') {
      await savestore(values, id);
    } else {
      await updatestore(values, initialData._id, id);
    }
  };
  return (
    <>
      {type === 'ADD' ? (
        <Button
          type="button"
          size="md"
          className="btn-success btn-brand mr-1 mb-1 float-right"
          onClick={() => setModal(true)}
        >
          <i className="fa fa-plus"></i>
          <span>Add Store Location</span>
        </Button>
      ) : (
        <Button color="success" className="mr-1" onClick={() => setModal(true)}>
          EDIT
        </Button>
      )}
      <Modal isOpen={modal} className={'modal-primary modal-lg'}>
        <Formik
          initialValues={
            initialData
              ? initialData
              : {
                  name: '',
                  address1: '',
                  address2: '',
                  phoneNumber: '',
                  city: '',
                  us_state: 'AL',
                  zipcode: '',
                }
          }
          validationSchema={storeLocationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          render={({ isSubmitting, handleSubmit, isValid }) => (
            <Form onSubmit={handleSubmit} noValidate name="addLocationForm">
              <ModalHeader>
                {type === 'ADD' ? 'Add Store' : 'Edit Store'}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Store Location Name</Label>
                      <Field name="name" type={'text'} component={FormInput} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phoneNumber">Store Phone Number</Label>
                      <Field
                        name="phoneNumber"
                        type={'text'}
                        component={FormPhoneInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="address1">Address 1</Label>
                  <Field name="address1" type={'text'} component={FormInput} />
                </FormGroup>

                <FormGroup>
                  <Label for="address2">Address 2</Label>
                  <Field name="address2" type={'text'} component={FormInput} />
                </FormGroup>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Field name="city" type={'text'} component={FormInput} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="us_state">State</Label>
                      <Field
                        name="us_state"
                        component={FormSelect}
                        options={us_state}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="zipcode">Zip Code</Label>
                      <Field
                        name="zipcode"
                        type={'text'}
                        component={FormInput}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {state === REQUEST_STATUS.FAIL ? (
                      <h6 className="text-danger">{errorMessage.message}</h6>
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
          )}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = ({ stores }) => {
  const { state, error } = stores;
  return { state, error };
};

const mapDispatchToProps = dispatch => {
  return {
    savestore: (data, id) => {
      dispatch(savestore(data, id));
    },
    updatestore: (data, id, dealer) => {
      dispatch(putstore(data, id, dealer));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddStoreModal)
);
