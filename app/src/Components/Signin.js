import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import signInSchema from "../Validation/SigninSchema";
import * as yup from "yup";

import { connect } from 'react-redux';
import { setFormValues, setFormErrors, setDisabled } from '../actions/formActions';

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

const Signin = ({ formValues, formErrors, disabled, setFormErrors, setFormValues }) => {
    const onInputChange = event => {
        const { name, value } = event.target

        yup.reach(signInSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors({ ...formErrors, [name]: '' })
            })
            .catch(error => {
                setFormErrors({ ...formErrors, [name]: error.errors[0] })
            })

        setFormValues({ ...formValues, [name]: value })
    }

    const onSubmit = event => {
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
        });
    }, [formValues])

    return (
        <Container className="themed-container" fluid={true}>
            <Card body className="text-center">
                <CardBody>
                    <CardHeader>
                        <CardImg top width="80%" src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" alt="Card image cap" />
                        <CardTitle tag="h1">Water My Plants</CardTitle>
                    </CardHeader>
                    <CardTitle tag="h3">Sign In</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">New to Water My Plants?
                <Link to={`/`}>
                            <span> Sign up to get started here!</span>
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
                                                value={formValues.username}
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
                                        <Label>Password
                                            <Input
                                                type='password'
                                                value={formValues.password}
                                                name='password'
                                                onChange={onInputChange}
                                            />
                                        </Label>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Button disabled={disabled}>Sign In</Button>
                        <div className='errors'>
                            <div>{formErrors.username}</div>
                            <div>{formErrors.password}</div>
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
    );
};

const mapStateToProps = (state) => ({
    formValues: state.formValues,
    formErrors: state.formErrors,
    disabled: state.disabled
});

export default connect(mapStateToProps, { setFormValues, setFormErrors, setDisabled })(Signin);