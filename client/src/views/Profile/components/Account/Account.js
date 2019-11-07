import React, {useEffect} from 'react'
import { 
    Row, 
    Col, 
    Form, 
    FormGroup, 
    Label, 
    Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik';
import FormInput from 'components/common/FormInput'
import FormPhoneInput from 'components/common/FormPhoneInput'
import LoadingIndicator from 'components/common/LoadingIndicator'
import * as Yup from 'yup'
import { REQUEST_STATUS } from '_config/constants';

import { 
    fetchAccountData, 
    updateAccountData
} from 'modules/account'

const accountSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, `First name has to be at least 2 characters`)
        .required('First name is required'),
    lastName: Yup.string()
        .min(1, `Last name has to be at least 1 character`)
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    phoneNumber: Yup.string()
        .required('Phone number is required'),
})

const Account = ({
    fetchAccount, 
    accountData,
    updateAccount,
    state
}) => {

    useEffect(() => {
        fetchAccount()
    }, [])

    const onSubmit = (values) => {
        updateAccount(values)
    }

    return (
        <div className="Account mt-5">
            <Row>
                <Col>
                    {
                        state===REQUEST_STATUS.PENDING? <LoadingIndicator /> : 
                        <Formik
                        initialValues={accountData}
                        validationSchema={accountSchema}
                        onSubmit={onSubmit}
                        render={
                            ({
                                handleSubmit,
                                isValid
                            }) => (
                                    <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >First Name*</Label>
                                                    <Field name="firstName" type={'text'} component={FormInput}/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >Last Name*</Label>
                                                    <Field name="lastName" type={'text'} component={FormInput}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >Email Address*</Label>
                                                    <Field name="email" type={'email'} component={FormInput} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Mobile Phone*</Label>
                                                    <Field name="phoneNumber" type={'text'} component={FormPhoneInput} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Work Phone</Label>
                                                    <Field name="workPhoneNumber" type={'text'} component={FormPhoneInput} />
                                                </FormGroup>
                                            </Col>
                                            <Col >
                                                <FormGroup>
                                                    <Label >Extension</Label>
                                                    <Field name="extension" type={'text'} component={FormInput} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className="float-right">
                                            <Col>
                                                <FormGroup>
                                                    <Button type="submit" color="success" className="mr-1" disabled={!isValid}>Submit</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                )} 
                        />
                    }
                    
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = ({ account }) => {
    const { accountData, state } = account;
    return { accountData, state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccount: () => {
            dispatch(fetchAccountData());
        },
        updateAccount: (data) => {
            dispatch(updateAccountData(data));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
