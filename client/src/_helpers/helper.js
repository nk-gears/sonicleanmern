
export const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}


export const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

export const getUploadedImage = (name) => {
    if (process.env.NODE_ENV === 'production') {
        return `${process.env.REACT_APP_PRODUCTION_URL}/uploads/${name}`
    } else {
        return `${process.env.REACT_APP_URL}/uploads/${name}`
    }
}