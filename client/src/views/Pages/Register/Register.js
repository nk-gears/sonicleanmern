import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import './Register.scss';
import logo from './images/logo.png';
import RegisterSubmitModal from './RegisterSubmitModal';
import { fetchRegister, registerResetState } from 'modules/auth';
import RegisterForm from './RegisterForm';
import { REQUEST_STATUS } from '_config/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ register, registerState, resetState, error }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (registerState === REQUEST_STATUS.SUCCESS) {
      toggleModal(true);
    }
    if (registerState === REQUEST_STATUS.FAIL) {
      toggleModal(true);
    }
  }, [registerState]);

  const onSubmit = values => {
    register(values);
  };

  const toggleModal = val => {
    setModal(val);
    if (!val) {
      resetState();
    }
  };

  return (
    <div className="app Register">
      <ToastContainer />
      <RegisterSubmitModal
        modal={modal}
        state={registerState}
        toggleModal={toggleModal}
      />
      <Container>
        <Row>
          <Col md="12" lg="7" xl="12">
            <Card className="mt-5 mb-5">
              <CardBody className="p-4">
                <div className="text-center">
                  <img src={logo} alt="logo" />
                </div>
                <h6 className="mt-3 text-center text-muted font-weight-normal">
                  To become a Soniclean dealer, you will need to register your
                  company first using the form below. Please note that this
                  program is only available for authorized Mohawk retailers.
                  Once you've submitted this registration form, please allow up
                  to 24 to 48 hours for your account to be approved. When your
                  account is approved and activated, you will receive a welcome
                  email with your Soniclean account login instructions.
                </h6>
                <RegisterForm submit={onSubmit} state={registerState} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

//export default Register;
const mapStateToProps = ({ auth }) => {
  const { registerState, error } = auth;
  return { registerState, error };
};

const mapDispatchToProps = dispatch => {
  return {
    register: values => {
      dispatch(fetchRegister(values));
    },
    resetState: () => {
      dispatch(registerResetState());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null)(Register)
);
