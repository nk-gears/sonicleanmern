import React from 'react'
import { FormFeedback, Input } from 'reactstrap'
import PropTypes from 'prop-types'

const FormInput = ({
    field, 
    form: { errors },
    hideValidationErrorText,
    ...props
}) => (
        <div>
            <Input type="text" {...field} {...props} />
            <FormFeedback>{errors[field.name]}</FormFeedback>
        </div>
    );

FormInput.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    type: PropTypes.string,
    hideValidationErrorText: PropTypes.bool,
    className: PropTypes.string,
}

export default FormInput
