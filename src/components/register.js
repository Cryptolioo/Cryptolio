import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
 
export class Register extends React.Component {
 
    constructor() {
        super();
 
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeSname = this.onChangeSname.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
 
        this.state = {
            fname: '',
            sname: '',
            email: '',
            password: ''
        }
    }
 
    onSubmit(e) {
        const newUser = {
            fname: this.state.fname,
            sname: this.state.sname,
            email: this.state.email,
            password: this.state.password
        }
 
        axios.post('http://localhost:4000/register', newUser)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
 
    onChangeFname(e){
        this.setState({
            fname: e.target.value
        })
    }
 
    onChangeSname(e){
        this.setState({
            sname: e.target.value
        })
    }
 
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
 
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
 
    render() {
        return (
            <Form className="register-form" onSubmit={this.onSubmit}>
                <Navbar id="loginNavbar" width="100%">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <h1 id="brand">Cryptolio</h1>
                </Navbar>
 
                <div className="paddingBox">
 
                    <FormGroup>
                        <Label className="fname" >First Name</Label>
                        <Input type="text" placeholder="First Name"
                        value = {this.state.fname}
                        onChange = {this.onChangeFname}>
                        </Input>
                    </FormGroup>
 
                    <FormGroup>
                        <Label className="sname" >Last Name</Label>
                        <Input type="text" placeholder="Last Name"
                        value = {this.state.sname}
                        onChange = {this.onChangeSname}></Input>
                    </FormGroup>
 
                    <FormGroup>
                        <Label className="email">Email</Label>
                        <Input type="email" placeholder="Email"
                        value = {this.state.email}
                        onChange = {this.onChangeEmail}></Input>
                    </FormGroup>
 
                    <FormGroup>
                        <Label className="password">Password</Label>
                        <Input type="password" placeholder="password"
                        value = {this.state.password}
                        onChange = {this.onChangePassword}></Input>
                    </FormGroup>
 
                     <Nav.Link as={Link} to="/login" className="btn-lg btn-dark btn-block" onClick={this.onSubmit}>Register</Nav.Link> 
 
                     <div className="text-center">
                        <p> Already have an account?</p>
                        <a href="/forgot-password">Log in</a>
                    </div>
 
                </div>
            </Form>
        );
    }
}

