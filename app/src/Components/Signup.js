import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import signUpSchema from "../Validation/SignupSchema";
import * as yup from "yup";

import { connect } from 'react-redux';
import { setUsers, setFormValues, setFormErrors, setDisabled } from '../actions/formActions';

import {
    Container,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Label,
    Input,
    Col,
    Button,
    Card,
    CardHeader,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn, faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons'



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

    const onInputChange = event => {
        const { name, value } = event.target

        yup.reach(signUpSchema, name)
            .validate(value)
            .then(() => {
                props.setFormErrors({ ...props.formErrors, [name]: '' })
            })

            .catch(error => {
                props.setFormErrors({ ...props.formErrors, [name]: error.errors[0] })
            })

        props.setFormValues({ ...props.formValues, [name]: value })
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

    return (
        <Container className="themed-container" fluid={true}>
            <Card body className="text-center">
                <CardBody>
                    <CardHeader>
                        <CardImg top width="80%" src="https://images.unsplash.com/photo-1592296429945-93008c7e5a59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80" alt="Card image cap" />
                        <CardTitle tag="h1">Water My Plants</CardTitle>
                    </CardHeader>
                    <CardTitle tag="h3">Sign Up for an Account</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">Already have an account?
                        <Link to={`/signin`}>
                            <span> Sign in here!</span>
                        </Link>
                    </CardSubtitle>
                    <Form onSubmit={onSubmit}>
                        <Col>
                            <FormGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">
                                        <Label>Username
                                        <Input
                                                type='text'
                                                value={props.formValues.username}
                                                name='username'
                                                onChange={onInputChange}
                                            />
                                        </Label>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">
                                        <Label>Email
                                        <Input
                                                type='email'
                                                value={props.formValues.email}
                                                name='email'
                                                onChange={onInputChange}
                                            />
                                        </Label>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">
                                        <Label>Password
                                        <Input
                                                type='password'
                                                value={props.formValues.password}
                                                name='password'
                                                onChange={onInputChange}
                                            />
                                        </Label>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Button disabled={props.disabled}>Sign Up</Button>
                        <div className='errors'>
                            <div>{props.formErrors.username}</div>
                            <div>{props.formErrors.email}</div>
                            <div>{props.formErrors.password}</div>
                        </div>
                    </Form>
                    <CardFooter>
                        <CardTitle tag="h4">Contact Us</CardTitle>

                        <h3>Email</h3>
                        <a href="https://">information@untitled.ext</a>

                        <h3>Phone</h3>
                        <a href="https://">(000) 000-0000</a>

                        <h3>Address</h3>
                        <span>1234 Somewhere Road, Nashville, TN 00000</span>

                        <h3>Elsewhere</h3>

                        <FontAwesomeIcon icon={faTwitter} />
                        <a href='https://'> Twitter </a>

                        <FontAwesomeIcon icon={faFacebookF} />
                        <a href="https://"> Facebook </a>

                        <FontAwesomeIcon icon={faInstagram} />
                        <a href="https://"> Instagram </a>

                        <FontAwesomeIcon icon={faLinkedinIn} />
                        <a href="https://"> LinkedIn </a>

                        <FontAwesomeIcon icon={faGithub} />
                        <a href="https://github.com/ptct-water-my-plants"> GitHub </a>

                        <FontAwesomeIcon icon={faCodepen} />
                        <a href="https://"> Codepen </a>


                    </CardFooter>
                </CardBody>
            </Card>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    users: state.users,
    formValues: state.formValues,
    formErrors: state.formErrors,
    disabled: state.disabled
});

export default connect(mapStateToProps, { setUsers, setFormValues, setFormErrors, setDisabled })(Signup);