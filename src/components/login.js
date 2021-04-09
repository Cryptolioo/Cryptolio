import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../styles/login.css';
import logo from '../images/logo.png';
import axios from 'axios';

export class Login extends React.Component {

    constructor(props) {
        super(props)
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: '',
            password: '',
            loginSuccess: false
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/login', newUser)
            .then((res) => {
                if (res.status == 200) {
                    const token = res.data.token;
                    const userID = res.data.userID;
                    localStorage.setItem("token", token);
                    localStorage.setItem("userID", userID);
                    this.props.history.push('/portfolio')
                }
            })
            .catch((err) => {
                if(err.response.status == 422) {
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'email')
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
            <div className="login">
                <a href="/"><img src={logo} className="logo align-top"/></a>
                <Form class="form" id="form" onSubmit={this.onSubmit} >
                    <div className="container">
                        <header className="header">
                            <Label>Sign In</Label>
                        </header>
                        <FormGroup>
                            <Label className="email" id="email" >Email</Label>
                            <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className="password" id="password">Password</Label>
                            <Input type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}></Input>
                        </FormGroup>
                        <Button className="btn-lg btn-dark btn-block"  onSubmit={this.onSubmit} >Log in</Button>
                        <div className="text-center">
                            <a href="/register"> Sign up</a>
                            <span className="p-2">|</span>
                            <a href="/forgot-password">Forgot Password</a>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}