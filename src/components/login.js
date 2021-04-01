import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link, Redirect } from 'react-router-dom';
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
                    this.props.history.push('/portfolio')
                }
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
                </FormGroup>

                <FormGroup>
                    <Label className="password" >Password</Label>
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

        );
    }
}