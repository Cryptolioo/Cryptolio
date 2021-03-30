import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
<<<<<<< HEAD
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
=======
import logo from '../images/logo.png';
import axios from 'axios';
>>>>>>> login

export class Login extends React.Component {

    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit(e) {
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/login', newUser)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
<<<<<<< HEAD


            <Form className="login-form">

                <h1>
                    <span className="font-weight-bold">Cryptolioo</span>
                </h1>

                <h3>
                    <span className="font-weight-bold">Welcome Back!</span>
                </h3>

                <FormGroup>
                    <Label className="email" >Email</Label>
                    <Input type="email" placeholder="Email" />
=======
            <Form class="form" id="form" onSubmit={this.onSubmit} >
                 <header>
                    <div class="row">
                        <div class="logo-row">
                        
                         <h1 id="brand"><img
                        src={logo}
                        width="50"
                        height="50"
                        className="logo"
                        />Cryptolio</h1>
                        </div>
                    </div>
                </header>

                <div className="container">
                <header className="header">
                            <Label>Sign In</Label>
                </header>
                <FormGroup>
                    <Label className="email" >Email</Label>
                    <Input type="email" placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}></Input>
>>>>>>> login
                </FormGroup>

                <FormGroup>
                    <Label className="password" >Password</Label>
<<<<<<< HEAD
                    <Input type="password" placeholder="Password" />
                </FormGroup>

                <Button className="btn-lg btn-dark btn-block">Log in</Button>

                <div className="text-center">
                    <a href="/sign-up"> Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/forgot-password">Forgot Password</a>
                </div>
            </Form>
=======
                    <Input type="password" placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}></Input>
                </FormGroup>

                <Button className="btn-lg btn-dark btn-block"  onSubmit={this.onSubmit} >Log in</Button>

                <div className="text-center">
                    <a href="/register"> Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/forgotPassword">Forgot Password</a>
                </div>
            </div>
            </Form>


>>>>>>> login
        );
    }
}