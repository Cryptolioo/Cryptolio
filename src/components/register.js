import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../styles/register.css';
import logo from '../images/logo.png';
import axios from 'axios';

export class Register extends React.Component {

    constructor() {
        super();

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
                if (res.status == 200) {
                    this.props.history.push('/login');
                }
            })
            .catch((err) => {
                if(err.response.status == 422) {
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'fname')
                        {
                            document.getElementById("fname").innerHTML = error.msg;
                        }
                        else if(error.param == 'sname')
                        {
                            document.getElementById("sname").innerHTML = error.msg;
                        }
                        else if(error.param == 'email')
                        {
                            document.getElementById("email").innerHTML = error.msg;
                        }
                        else if(error.param == 'password')
                        {
                            document.getElementById("password").innerHTML = error.msg;
                        }
                    });
                }
            });
    }

    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        })
        document.getElementById("fname").innerHTML = "First Name";
    }

    onChangeSname(e) {
        this.setState({
            sname: e.target.value
        })
        document.getElementById("sname").innerHTML = "Last Name";
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password").innerHTML = "Password";
    }

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

