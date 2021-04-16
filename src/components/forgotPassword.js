import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';

// The forgot password class allows the user to enter their email address
// and if it exists an email is sent to the user containing a link they
// can click which allows them to reset their password
export class ForgotPassword extends Component{

    constructor() {
        super()

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: '',
        }
    }

    // When the form is submitted, a post request is made to the server
    // containing the email input by the user
    onSubmit(e) {
        e.preventDefault();

        const newEmail = {
            email: this.state.email
        }

        axios.post('http://localhost:4000/api/forgot-password', newEmail)
            .then((res) => {
                if(res.status == 200)
                {
                    // Alert the user that they have received an email
                    document.getElementById("header-txt").innerHTML = "Check your email!";
                }
            })
            .catch((err) => {
                if(err.response.status == 422) { // Invalid email entered
                    document.getElementById("email").innerHTML = err.response.data.error;
                }
            });
    }

    // When email is changed, set the states email to the new one
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    // Inside this render() method the user can enter their email address
    render() {
        return (
            <Container className="login">
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <a href="/"><img src={logo} className="logo align-top"/></a>
                        <h2 id="header-txt">Forgot Password</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form id="form" onSubmit={this.onSubmit} >
                            <FormGroup>
                                <Label className="email" id="email">Email</Label>
                                <Input type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} required></Input>
                            </FormGroup>
                            <Button className="btn-light btn-block" onSubmit={this.onSubmit}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}