import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';

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
            <Form className="login-form"  onSubmit={this.onSubmit}>
                <h1>
                    <span className="font-weight-bold">Cryptolioo</span>
                </h1>
                <h3>
                    <span className="font-weight-bold">Welcome Back!</span>
                </h3>
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
                    <a href="/sign-up"> Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/forgot-password">Forgot Password</a>
                </div>

            </Form>


        );
    }
}