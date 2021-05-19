import React, { useState } from 'react'

const initialFormValues = {
    username: '',
    email: '',
    password: '',
}

const inistialFormErrors = {
    username: '',
    email: '',
    password: '',
}

const Signup = () => {
    const [users, setUsers] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(inistialFormErrors)
    const [disabled, setDisabled] = useState(true)

    return(
        <div>
            <h3>Sign Up for an Account</h3>
            <p>Already have an account? Sign in here!</p>
            {/* Link to sign in page here  */}
            <form>
                <label>Username 
                    <input
                        type='text'
                        value={formValues.username}
                    />
                </label>
                <label>Email
                    <input
                        type='email'
                        value={formvalues.email}
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        value={formvalues.email}
                    />
                </label>
                <button disabled={disabled}>Sign Up</button>
            </form>
        </div>
    )
}