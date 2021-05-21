import React, { useState, useEffect } from "react";
import signInSchema from "../Validation/SigninSchema";
import * as yup from "yup";
import { Link } from "react-router-dom";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const Signin = () => {
    // const [users, setUsers] = useState([]);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

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

    useEffect(() => {
        signInSchema.isValid(formValues).then((valid) => {
         setDisabled(!valid)
        })
     }, [formValues])  

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
            <button disabled={disabled}>Sign In</button>
            <div className='errors'>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
            </div>
      </form>
    </div>
  );
};

export default Signin;
