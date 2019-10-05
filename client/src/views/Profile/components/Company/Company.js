import React from 'react'
import { Row, Col, Form, FormGroup, Input, Label, FormFeedback, Button } from 'reactstrap'
import { Formik, Field } from 'formik';
import * as Yup from 'yup'

import MaskedInput from "react-text-mask";
import { validate } from '../../../../_helpers/helper.js'

import './Company.scss'

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
        companyName: Yup.string()
            .min(2, `First name has to be at least 2 characters`)
            .required('First name is required'),
        mobilephone: Yup.string()
            .min(8, `Phone number has to be at least 6 character`)
            .required('Phone number is required!'),
        bio: Yup.string()
            .max(250, `Bio has be max 25 characeters`),
    })
}

const initialValues = {
    companyName: '',
    lastName: '',
    email: '',
    mobilephone: '',
    bio: ''
}

const Company = () => {

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="Company mt-5">
            <Row>
                <Col>
                    <Formik
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
                                handleReset,
                            }) => (
                                    <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >Company Name*</Label>
                                                    <Input type="text"
                                                        name="companyName"
                                                        id="companyName"
                                                        autoComplete="given-name"
                                                        valid={!errors.companyName}
                                                        invalid={touched.companyName && !!errors.companyName}
                                                        autoFocus={true}
                                                        required
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyName} />
                                                    <FormFeedback>{errors.companyName}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Phone Number</Label>
                                                    <Field
                                                        name="mobilephone"
                                                        render={({ field }) => (
                                                            <MaskedInput
                                                                {...field}
                                                                mask={phoneNumberMask}
                                                                id="mobilephone"
                                                                type="text"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                                className={
                                                                    errors.mobilephone && touched.mobilephone
                                                                        ? "is-invalid form-control"
                                                                        : "form-control"
                                                                }
                                                            />
                                                        )}
                                                    />
                                                    <FormFeedback>{errors.mobilephone}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label >Company Bio (optional)</Label>
                                                    <Input type="text"
                                                        name="bio"
                                                        className="position-relative"
                                                        type="textarea"
                                                        id="bio"
                                                        autoComplete="given-name"
                                                        valid={!errors.bio}
                                                        invalid={touched.bio && !!errors.bio}
                                                        autoFocus={true}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder = "This information will be displayed on your company's dealer locator listining on www.sonicleanusa.com.(e.g. family owned business since 1975...)"
                                                        value={values.bio} />
                                                        <h6 className="text-muted position-absolute font-weight-normal maxlength">max 250 characters</h6>
                                                    <FormFeedback className="position-absolute bio-error">{errors.bio}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Label >Upload company logo (50px by 50px)</Label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" name="profilepicture" id="profilepicture" />
                                                    <label className="custom-file-label" >Choose file</label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className="float-right">
                                            <Col>
                                                <FormGroup>
                                                    <Button type="submit" color="success" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Submit'}</Button>
                                                    <Button type="reset" color="danger" className="mr-1" onClick={handleReset}>Reset</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Company
