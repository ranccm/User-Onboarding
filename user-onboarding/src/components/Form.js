import React from 'react';

function Form(props) {
    const { values, onInputChange, onCheckboxChange, onSubmit, disabled, errors } = props

    return (
        <form className='user-container'>   

        {/* STEP 10: RENDER THE ERRORS */}
            <div className='errors'>
                {errors.name}
                {errors.password}
                {errors.term}

        
            </div>

            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                name="name"
                onChange={onInputChange}
                value={values.name}
                required
            />

            <label htmlFor="email">email</label>
            <input
                id="email"
                type="text"
                name="email"
                onChange={onInputChange}
                value={values.email}
            />

            <label htmlFor="password">password</label>
            <input
                id="password"
                type="text"
                name="password"
                onChange={onInputChange}
                value={values.password}
            />

            <label htmlFor="terms">Do you agree to the terms and services?</label>
            <input
                type="checkbox"
                checked={values.term}
                onChange={onCheckboxChange}
                name="terms"
            />

            <button onClick={onSubmit} disabled={disabled}>submit</button>
        </form>

    )
}

export default Form