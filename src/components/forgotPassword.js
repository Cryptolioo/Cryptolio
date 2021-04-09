import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import axios from 'axios';
import '../styles/forgot-password.css';

export class ForgotPassword extends Component{

    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: '',
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newEmail = {
            email: this.state.email
        }

        axios.post('http://localhost:4000/api/forgot-password', newEmail)
            .then((res) => {
                if(res.status == 200)
                {
                    document.getElementById("header").innerHTML = "Check your email!";
                }
            })
            .catch((err) => {
                if(err.response.status == 422) {
                    document.getElementById("email").innerHTML = err.response.data.error;
                }
            });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    render() {
        return (
            <div className="forgot-password">
                <a href="/"><img src={logo} className="logo align-top"/></a>
                <Form class="form" id="form" onSubmit={this.onSubmit} >
                    <div className="container">
                        <header className="header">
                            <Label id="header">Forgot password</Label>
                        </header>
                        <FormGroup>
                            <Label className="email" id="email">Email</Label>
                            <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} required></Input>
                        </FormGroup>
                        <Button  className="btn-lg btn-dark btn-block"  onSubmit={this.onSubmit}>Submit</Button>
                        <br></br>
                    </div>
                </Form>
            </div>
        );
    }
}