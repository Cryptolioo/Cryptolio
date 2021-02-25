import React from 'react';
import {Button, Form , FormGroup, Input , Label } from "reactstrap";
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
    render() {
        return(

            <Form className="login-form">
                 <Navbar id="loginNavbar" width="100%">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <h1 id="brand">Cryptolio</h1>
                </Navbar>
                <h3>
                    <span className = "font-weight-bold">Welcome Back!</span>
                </h3>
                <FormGroup>
                    <Label className="email" >Email</Label>
                    <Input type="email" placeholder="Email"/>
                </FormGroup>

                <FormGroup>
                    <Label className ="password" >Password</Label>
                    <Input type="password" placeholder="Password"/>
                </FormGroup>

                <Button className = "btn-lg btn-dark btn-block">Log in</Button>
 
             {/* allow link to bring back to register page or forgot password */}
              <div className = "text-center">
              <a href = "/sign-up"> Sign up</a>
              <span className = "p-2">|</span>
              <a href = "/forgot-password">Forgot Password</a>
              </div>

            </Form>
    
         
        );
    }
}