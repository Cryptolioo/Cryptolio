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

               
              </Form>
        );
    }
}