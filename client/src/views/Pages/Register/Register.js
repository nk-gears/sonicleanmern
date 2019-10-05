import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from 'reactstrap';

import './Register.scss'
import logo from './images/logo.png'
import RegisterSubmitModal from './RegisterSubmitModal'
import { fetchRegister } from "modules/auth";
import RegisterForm from './RegisterForm'
import { REQUEST_STATUS } from '_config/constants';

const Register = ({register, state}) => {

  const [modal, setModal] = useState(false)

  useEffect(()=> {
    if(state===REQUEST_STATUS.SUCCESS || state===REQUEST_STATUS.FAIL) {
      setModal(true)
    }
  }, [state])

  const onSubmit = (values) => {
    register(values)
  }

  const toggleModal = (val) => {
    setModal(val)
  }

    return (
      <div className="app Register">
        <RegisterSubmitModal modal={modal} state={state} toggleModal={toggleModal} />
        <Container>
          <Row>
            <Col md="12" lg="7" xl="12">
              <Card className="mt-5 mb-5">
                <CardBody className="p-4">
                  <div className="text-center"><img src={logo} alt="logo" /></div>
                  <h6 className="mt-3 text-center text-muted font-weight-normal">
                    To become a Soniclean dealer, you will need to register your company first using the form below. Please note that this program is only available for authorized Mohawk retailers. Once you've submitted this registration form, please allow up to 24 to 48 hours for your account to be approved. When your account is approved and activated, you will receive a welcome email with your Soniclean account login instructions.
                  </h6>                 
                  <RegisterForm submit={onSubmit} stat={state} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

//export default Register;
const mapStateToProps = ({ auth }) => {
  const { state } = auth;
  return { state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (values) => {
      dispatch(fetchRegister(values));
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(Register));