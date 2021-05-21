import React, { useState, useEffect } from "react";
import signUpSchema from "../Validation/SignupSchema";
import * as yup from "yup";
import { Link } from "react-router-dom";

const initialFormValues = {
    username: "",
    email: "",
    password: "",
};

const initialFormErrors = {
    username: "",
    email: "",
    password: "",
};

const Signup = () => {
    const [users, setUsers] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(true)

    const postUser = newUser => {
        setUsers([...users, newUser])
        console.log('User Signup', users)

        setFormValues(initialFormValues)
    }

    const onInputChange = event =>{
        const { name, value } = event.target

        yup.reach(signUpSchema, name)
        .validate(value)
        .then(() => {
            setFormErrors({...formErrors, [name]: ''})
        })

        .catch(error => {
            setFormErrors({...formErrors, [name]: error.errors[0]})
        })

        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = event => {
        event.preventDefault()

        const newUser = {
            username: formValues.username.trim(),
            email: formValues.email.trim(),
            password: formValues.password.trim(),
        }
        postUser(newUser)
    }

   useEffect(() => {
       signUpSchema.isValid(formValues).then((valid) => {
        setDisabled(!valid)
       })
    }, [formValues])   

    return(
        <div>
            <h3>Sign Up for an Account</h3>
            <p>Already have an account?
                <Link to={`/signin`}>
                    <span>Sign in here!</span>
                </Link>
            </p>
            <form onSubmit={onSubmit}>
            <label>Username 
                    <input
                        type='text'
                        value={formValues.username}
                        name='username'
                        onChange={onInputChange}
                    />
                </label>
                <label>Email
                    <input
                        type='email'
                        value={formValues.email}
                        name='email'
                        onChange={onInputChange}
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        value={formValues.email}
                        name='password'
                        onChange={onInputChange}
                    />
                </label>
                <button disabled={disabled}>Sign Up</button>
                <div className='errors'>
                    <div>{formErrors.username}</div>
                    <div>{formErrors.email}</div>
                    <div>{formErrors.password}</div>
                </div>
            </form>
        </div>
    )
}

export default Signup;