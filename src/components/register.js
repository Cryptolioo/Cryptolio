import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../styles/register.css';
import logo from '../images/logo.png';
import axios from 'axios';

// The register class allows the user to sign up to our platform
export class Register extends React.Component {

    constructor() {
        super();

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeSname = this.onChangeSname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            fname: '',
            sname: '',
            email: '',
            password: ''
        }
    }

    // When the form is submitted, a post request is made to the server
    // containing the details input by the user
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            fname: this.state.fname,
            sname: this.state.sname,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/register', newUser)
            .then((res) => {
                if (res.status == 200) { // Registered successfully
                    this.props.history.push('/login'); // Redirect to the login page
                }
            })
            .catch((err) => { // Could not register
                if(err.response.status == 422) {
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'fname') // Invalid first name
                        {
                            document.getElementById("fname").innerHTML = error.msg;
                        }
                        else if(error.param == 'sname') // Invalid last name
                        {
                            document.getElementById("sname").innerHTML = error.msg;
                        }
                        else if(error.param == 'email') // Invalid email
                        {
                            document.getElementById("email").innerHTML = error.msg;
                        }
                        else if(error.param == 'password') // Invalid email
                        {
                            document.getElementById("password").innerHTML = error.msg;
                        }
                    });
                }
            });
    }

    // When first name is changed, set the states fname to the new one
    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        })
        document.getElementById("fname").innerHTML = "First Name";
    }

    // When last name is changed, set the states sname to the new one
    onChangeSname(e) {
        this.setState({
            sname: e.target.value
        })
        document.getElementById("sname").innerHTML = "Last Name";
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

    // This render() method contains a form with 4 input boxes where the user can
    // enter in their details to create an account. There is also a link at the bottom
    // to login if you already have an account
    render() {
        return (
            <div className="register">
                <a href="/"><img src={logo} className="logo align-top"/></a>
                <h2>Create Account</h2>
                <Form className="register-form" id="form" onSubmit={this.onSubmit}>
                    <FormGroup class = "form-control" >
                        <Label className="fname" id="fname">First Name</Label>
                        <Input type="text" placeholder="First Name" value={this.state.fname} onChange={this.onChangeFname}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="sname" id="sname">Last Name</Label>
                        <Input type="text" placeholder="Last Name" value={this.state.sname} onChange={this.onChangeSname}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="email" id = "email">Email</Label>
                        <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="password" id = "password">Password</Label>
                        <Input type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}></Input>
                    </FormGroup>
                    <Button className="btn-light btn-block" onClick={this.onSubmit}>Register</Button>
                    <div className="text-center">
                        <p>Already have an account?<a href="/login" className="link"> Log in</a></p>
                    </div>
                </Form>
            </div>
        );
    }
}

