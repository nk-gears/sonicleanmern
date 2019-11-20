import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row,
} from 'reactstrap';

import { fetchLogin } from 'modules/auth';

import LoginForm from './LoginForm';

import 'ladda/dist/ladda-themeless.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { REQUEST_STATUS } from '_config/constants';

const Login = ({ userLogin, loginState, error }) => {
  useEffect(() => {
    if (loginState === REQUEST_STATUS.FAIL) {
      toast.error(error.message);
    }
  }, [loginState]);

  const onSubmit = values => {
    userLogin(values);
  };

  return (
    <div className="app flex-row align-items-center">
      <ToastContainer />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <LoginForm submit={onSubmit} state={loginState} />
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: '44%' }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { isLoggedIn, user, loginState, error } = auth;
  return { isLoggedIn, user, loginState, error };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: data => {
      dispatch(fetchLogin(data));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null)(Login)
);
