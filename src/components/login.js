import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../styles/login.css';
import logo from '../images/logo.png';
import axios from 'axios';

// The login class allows user the login by validating the input
// entered and if it matches the database records, the user is logged in
export class Login extends React.Component {

    constructor(props) {
        super(props)
        
        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    // When the form is submitted, make a post request to the server
    // containing the login details the user entered
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/login', newUser)
            .then((res) => {
                if (res.status == 200) { // Logged in successfully
                    const token = res.data.token;
                    const userID = res.data.userID;
                    localStorage.setItem("token", token); // Store a token in localstorage so we know they are logged in
                    localStorage.setItem("userID", userID); // Store the users id in localstorage
                    this.props.history.push('/portfolio')
                }
            })
            .catch((err) => {
                if(err.response.status == 422) { // Unsuccessful login
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'email') // Email was invalid
                        {
                            document.getElementById("email").innerHTML = error.msg;
                        }
                        else if(error.param == 'password') // Password wasn't 5 characters
                        {
                            document.getElementById("password").innerHTML = error.msg;
                        }
                    });
                }
                else if(err.response.status == 401) { // Email matched but password was wrong
                    document.getElementById("password").innerHTML = "Password is incorrect";
                }
                else if(err.response.status == 402) { // Email does not exist in database
                    document.getElementById("email").innerHTML = "User does not exist";
                }
            });
    }

    // When email is changed, set the states email to the new one
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    // When password is changed, set the states password to the new one
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password").innerHTML = "Password";
    }

    // This render() method contains a form with two input boxes for the email and password
    // There are also two links at the bottom where the user can sign up or to reset their
    // password if it is forgotten
    render() {
        return (
            <div className="login">
                <a href="/"><img src={logo} className="logo align-top"/></a>
                <h2>Sign In</h2>
                <Form className="login-form" id="form" onSubmit={this.onSubmit} >
                    <FormGroup>
                        <Label className="email" id="email" >Email</Label>
                        <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="password" id="password">Password</Label>
                        <Input type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}></Input>
                    </FormGroup>
                    <Button className="btn-light btn-block"  onSubmit={this.onSubmit} >Log in</Button>
                    <div className="text-center">
                        <a href="/register" className="link"> Sign up</a>
                        <span className="p-2">|</span>
                        <a href="/forgot-password" className="link">Forgot Password</a>
                    </div>
                </Form>
            </div>
        );
    }
}