import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import states from '_config/states';
const us_state = states.US;
const FormDropDown = ({ onChange, onBlur, value, error, touched, id, options=us_state }) => {

    const handleChange = value => {
        console.log(value.value)
        onChange(id, value.value)
    }

    const handleBlur = () => {
        onBlur(id, true)
    }
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#ffffff' : '#73818f',
            backgroundColor: state.isSelected && '#8f9ba6'
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#515b65',
            borderColor: state.isFocused ? '#ffffff' : '#23282c'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#ffffff'
        }),
        container: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#ffffff' : '#23282c'
        })
    }

    return (
        <div>
            <Select
                id={id}
                options={options}
                multi={false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                styles={customStyles}
            />
            {!!error &&
                touched && (
                    <div style={{ color: '#F86C6B', marginTop: '.2rem', fontSize: '11px' }}>{error}</div>
                )}
        </div>
    )
}

export default FormDropDown
