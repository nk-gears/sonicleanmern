import React from 'react'
import { Input, FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'

function FormSelect({
    field,
    form: { errors },
    input, meta,
    data, keyField, valueField, useDefaultOption, defaultOptionValue, defaultOptionText,
    hideValidationErrorText, className,
    ...props
}) {
    const _keyField = keyField || 'key'
    const _valueField = valueField || 'value'
    return <span className="d-block">
        <Input
            type="select"
            {...field} 
            {...props}
        >
            {
                (
                    useDefaultOption ||
                    typeof useDefaultOption === 'undefined'
                ) && <option value={defaultOptionValue || ''}>
                    {defaultOptionText || '-- Select --'}
                </option>
            }
            {
                data.map(record => (
                    <option
                        key={record[_keyField]}
                        value={record[_keyField]}
                    >
                        {record[_valueField]}
                    </option>
                ))
            }
        </Input>
        <FormFeedback>{errors[field.name]}</FormFeedback>
    </span>
}

FormSelect.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    hideValidationErrorText: PropTypes.bool,
    className: PropTypes.string,
}

export default FormSelect
