import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import signInSchema from "../Validation/SigninSchema";
import * as yup from "yup";

import { connect } from 'react-redux';
import { setFormValues, setFormErrors, setDisabled } from '../actions/formActions';

const Signin = (props) => {
    const onInputChange =  event => {
        const { name, value } = event.target

        yup.reach(signInSchema, name)
        .validate(value)
        .then(() => {
            props.setFormErrors({...props.formErrors, [name]: ''})
        })
        .catch(error => {
            props.setFormErrors({...props.formErrors, [name]: error.errors[0]})
        })

        props.setFormValues({...props.formValues, [name]: value})
    }

    const onSubmit = event =>{
        event.preventDefault()

        const existingUser = {
            username: props.formValues.username.trim(),
            password: props.formValues.password.trim(),
        }
        console.log('Existing user sign in', existingUser)
    }

    useEffect(() => {
        signInSchema.isValid(props.formValues).then((valid) => {
            props.setDisabled(!valid)
        });
     }, [props.formValues])

    return (
        <div>
            <h3>Sign In</h3>
            <p>New to Water My Plants? 
                <Link to={`/`}>
                    <span>Sign up to get started here!</span>
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
                <label>Password
                    <input
                        type='password'
                        value={props.formValues.password}
                        name='password'
                        onChange={onInputChange}
                    />
                </label>
            <button disabled={props.disabled}>Sign In</button>
            <div className='errors'>
                <div>{props.formErrors.username}</div>
                <div>{props.formErrors.password}</div>
            </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formValues: state.formValues,
  formErrors: state.formErrors,
  disabled: state.disabled
});

export default connect(mapStateToProps, { setFormValues, setFormErrors, setDisabled })(Signin);