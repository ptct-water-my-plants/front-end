import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import signUpSchema from "../Validation/SignupSchema";
import * as yup from "yup";

import { connect } from 'react-redux';
import { setUsers, setFormValues, setFormErrors, setDisabled } from '../actions/formActions';

const initialFormValues = {
    username: "",
    email: "",
    password: "",
};

// const initialFormErrors = {
//     username: "",
//     email: "",
//     password: "",
// };

const Signup = (props) => {
    const postUser = newUser => {
        setUsers([...props.users, newUser])
        console.log('User Signup', props.users)

        props.setFormValues(initialFormValues)
    }

    const onInputChange = event =>{
        const { name, value } = event.target

        yup.reach(signUpSchema, name)
        .validate(value)
        .then(() => {
            props.setFormErrors({...props.formErrors, [name]: ''})
        })

        .catch(error => {
            props.setFormErrors({...props.formErrors, [name]: error.errors[0]})
        })

        props.setFormValues({...props.formValues, [name]: value})
    }

    const onSubmit = event => {
        event.preventDefault()

        const newUser = {
            username: props.formValues.username.trim(),
            email: props.formValues.email.trim(),
            password: props.formValues.password.trim(),
        }
        postUser(newUser)
    }

   useEffect(() => {
       signUpSchema.isValid(props.formValues).then((valid) => {
         setDisabled(!valid)
       })
    }, [props.formValues])

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
                        value={props.formValues.username}
                        name='username'
                        onChange={onInputChange}
                    />
                </label>
                <label>Email
                    <input
                        type='email'
                        value={props.formValues.email}
                        name='email'
                        onChange={onInputChange}
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        value={props.formValues.password}
                        name='password'
                        onChange={onInputChange}
                    />
                </label>
                <button disabled={props.disabled}>Sign Up</button>
                <div className='errors'>
                    <div>{props.formErrors.username}</div>
                    <div>{props.formErrors.email}</div>
                    <div>{props.formErrors.password}</div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users,
    formValues: state.formValues,
    formErrors: state.formErrors,
    disabled: state.disabled
  });
  
  export default connect(mapStateToProps, { setUsers, setFormValues, setFormErrors, setDisabled })(Signup);