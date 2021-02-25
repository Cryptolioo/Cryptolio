import React from 'react';
import {Button, Form , FormGroup, Input , Label } from "reactstrap";

export class Login extends React.Component {
    render() {
        return(
            <Form className="login-form">
                <h1>
                    <span className = "font-weight-bold">Cryptolioo</span>
                </h1>
                <FormGroup>
                    <Label className="email" >Email</Label>
                    <Input type="email" placeholder="Email"/>
                </FormGroup>

                <FormGroup>
                    <Label className ="password" >Password</Label>
                    <Input type="password" placeholder="Password"/>
                </FormGroup>

            </Form>
    
         
        );
    }
}