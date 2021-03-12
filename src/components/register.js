import React from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

export class Register extends React.Component {

    render() {
        return (
            <Form className="register-form" >
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
                        <Input type="text" placeholder="First Name">
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className="sname" >Last Name</Label>
                        <Input type="text" placeholder="Last Name"></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className="email">Email</Label>
                        <Input type="email" placeholder="Email"></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className="password">Password</Label>
                        <Input type="password" placeholder="password"></Input>
                    </FormGroup>

                    {/* <Nav.Link as={Link} to="/login" className="btn-lg btn-dark btn-block" onClick={this.onSubmit}>Register</Nav.Link> */}


                    {/* add in if on  */}
                    <Button className="btn-lg btn-dark btn-block" > Register</Button>
                    <div className="text-center">
                        <p> Already have an account?<a href="/forgot-password">Log in</a></p>
                        
                    </div>

                </div>
            </Form>
        );
    }
}