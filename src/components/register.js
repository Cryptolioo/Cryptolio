import React from 'react';
import {Button, Form , FormGroup, Input , Label } from "reactstrap";
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

export class Register extends React.Component {
    render() {
        return(
              <Form  className="register-form">
                   <Navbar id="loginNavbar" width="100%">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <h1 id="brand">Cryptolio</h1>
                </Navbar>

                 <FormGroup>
                    <Label className="fname" >First Name</Label>
                    <Input type="fname" placeholder="First Name"/>
                </FormGroup>

                <FormGroup>
                    <Label className ="sname" >Last Name</Label>
                    <Input type="sname" placeholder="Last Name"/>
                </FormGroup>

                <FormGroup>
                    <Label className ="email">Email</Label>
                    <Input type = "email" placeholder = "Email"/>
                </FormGroup>

                <FormGroup>
                    <Label className="password">Password</Label>
                    <Input type="password" placeholder = "password"/>
                </FormGroup>

                <Button className = "btn-lg btn-dark btn-block">Register</Button>
                <div className = "text-center">
                <a href = "/sign-up"> Log in</a>
                </div>

               
              </Form>
        );
    }
}