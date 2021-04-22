import React from 'react';
import logo from '../images/logo.png';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

// The change password class allows the user to change their password. It is accessed
// from the profile component
export class ChangePassword extends React.Component {

    constructor() {
        super();

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.onChangePswd1 = this.onChangePswd1.bind(this);
        this.onChangePswd2 = this.onChangePswd2.bind(this);

        this.state = {
            id: '',
            password: '', // Current Password
            pswd1: '', // New Password 1
            pswd2: '', // New Password 2
            disabled: false,
            hidden: true
        }
    }

    // Gets the users id from local storage which is used
    // to set the state of id
    componentDidMount() {
        const userID = localStorage.getItem("userID");
        this.setState({
            id: userID
        })
    }

    // Submit the form and try to change the users password
    onSubmit(e) {
        e.preventDefault()

        // If passwords match then allow the user to change password
        if(this.state.pswd1 == this.state.pswd2)
        {
            const user = {
                id: this.state.id,
                newPassword: this.state.pswd1
            }
    
            // Make post request to server and pass the users id and the new password as an object
            axios.post('http://localhost:4000/api/change-password', user)
                .then((res) => {
                    if (res.status == 200) {
                        this.props.history.push('/profile') // Redirect back to the profile component
                    }
                })
                .catch((err) => {
                    if(err.response.status = "422") // Password does not meet the requirements
                    {
                        document.getElementById("pswd1").innerHTML = err.response.data.errors[0].msg;
                        document.getElementById("pswd2").innerHTML = err.response.data.errors[0].msg;
                    }
                });
        }
        else { // Passwords entered do not match
            document.getElementById("pswd1").innerHTML = "Passwords don't match!";
            document.getElementById("pswd2").innerHTML = "Passwords don't match!";
        }
    }

    // When current password is changed, set the states password to the new one
    onChangePswd(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password-text").innerHTML = "Please enter your current password";
    }

    // When new password 2 is changed, set the states pswd1 to the new one
    onChangePswd1(e) {
        this.setState({
            pswd1: e.target.value
        })
        document.getElementById("pswd1").innerHTML = "Please enter your new password";
     }

    // When new password 2 password is changed, set the states pswd2 to the new one
    onChangePswd2(e) {
        this.setState({
            pswd2: e.target.value
        })
        document.getElementById("pswd2").innerHTML = "Confirm your new password";
    }

    // This function verifies the password the user enters as their current password
    // is their actual password by checking the database using a post request
    verifyPassword() {
        const user = {
            id: this.state.id,
            password: this.state.password
        }

        // Make post request to server to check if the password matches
        axios.post('http://localhost:4000/api/check-password', user)
        .then((res) => {
            if(res.status == 200) { // Password matched
                this.setState({
                    disabled: true, // Disable current password input box
                    hidden: false // Enable the second form that user can enter new password in
                })
            }
        })
        .catch((err) => {
            if(err.response.status == 401) { // Password did not match users password
                document.getElementById("password-text").innerHTML = "Invalid password entered. Please try again";
            }
        });
    }

    // This render() function contains an input group and a form. The form is hidden by default.
    // When a valid password is entered in the input group the visibility of the form will be enabled
    // and the input group will be disabled
    render() {
        return (
            <Container className="container">
                <Helmet>
                    <title>Change Password</title>
                    <meta name="password" content="Change Password" />
                </Helmet>  
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <a href="/profile"><img src={logo} className="logo align-top"/></a>
                        <h2>Change Password</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <label htmlFor="basic-url" id="password-text">Please enter your current password</label>
                        <InputGroup className="mb-3">
                            <FormControl type="password" onChange={this.onChangePswd}
                                placeholder="Current password"
                                aria-label="Current password"
                                aria-describedby="basic-addon2"
                                disabled={this.state.disabled}
                            />
                            <InputGroup.Append>
                                <Button variant="light" onClick={this.verifyPassword.bind(this)} disabled={this.state.disabled}>Verify</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <br></br>
                        <Form className="change-password-form" hidden={this.state.hidden}>
                            <Form.Group controlId="formPswd1">
                                <Form.Label id="pswd1">Please enter your new password</Form.Label>
                                <Form.Control type="password" id="pswd" onChange={this.onChangePswd1}/>
                            </Form.Group>
                            <Form.Group controlId="formPswd2">
                                <Form.Label id="pswd2">Confirm your new password</Form.Label>
                                <Form.Control type="password" onChange={this.onChangePswd2}/>
                            </Form.Group>
                            <Button variant="light" type="submit" onClick={this.onSubmit}>Change Password</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}