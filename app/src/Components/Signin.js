import React, { useState, useEffect } from 'react'
import signInSchema from '../Validation/SignInSchema' 
import * as yup from 'yup'

const initialFormValues = {
    username: '',
    password: '',
}

const initialFormErrors = {
    username: '',
    password: '',
}

const Signin = () => {
    const [users, setUsers] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(inistialFormErrors)
    const [disabled, setDisabled] = useState(true)

    const onInputChange =  event => {
        const { name, value } = event.target

        yup.reach(signInSchema, name)
        .validate(value)
        .then(() => {
            setFormErrors({...formErrors, [name]: ''})
        })
        .catch(error => {
            setFormErrors({...formErrors, [name]: error.errors[0]})
        })

        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = event =>{
        event.preventDefault()

        const existingUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
        }
        console.log('Existing user sign in', existingUser)
    }

    useEffect(() =>{
        signInSchema.isValid(formValues).then(valid => {
            setDisabled(!valid)
        })
    }, [formValues])

    return(
        <div>
            <h3>Sign In</h3>
            <p>New to Water My Plants? Sign up to get started here!</p>
            {/* Link to sign up page here */}
            <form>
                <label>Username
                    <input
                        type='text'
                        value={formValues.username}
                        name='username'
                        onChange={onInputChange}
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        value={formValues.password}
                        name='password'
                        onChange={onInputChange}
                    />
                </label>
                <div className='errors'>
                    <div>{formErrors.username}</div>
                    <div>{formErrors.password}</div>
                </div>
                <button disabled={disabled}>Sign In</button>
            </form>
        </div>
    )
}