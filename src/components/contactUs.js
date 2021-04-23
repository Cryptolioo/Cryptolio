import React from 'react';
import '../styles/contact-us.css';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

// The contact us class allows the user to contact support regarding numerous issues.
// This class can be accessed from the landing page or from the portfolio page
export class ContactUs extends React.Component {

    constructor() {
        super()

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeIssue = this.onChangeIssue.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);

        this.state = {
            email: '',
            issue: '',
            details: ''
        }
    }

    // When the form is submitted, a post request is made to the server containing
    // the form contacts which is then emailed to support
    onSubmit(e) {
        e.preventDefault()

        const contactForm = {
            email: this.state.email,
            issue: this.state.issue,
            details: this.state.details
        }

        axios.post('http://localhost:4000/api/contact-us', contactForm)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if(err.response.status == 422) // Email address was invalid
                {
                    document.getElementById("email-text").innerHTML = err.response.data.error;
                }
            });
    }

    // When email is changed, set the states email to the new one
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email-text").innerHTML = "Email address";
    }

    // When issue is changed, set the states issue to the new one
    onChangeIssue(e) {
        this.setState({
            issue: e.target.value
        })
    }

    // When details is changed, set the states details to the new one
    onChangeDetails(e) {
        this.setState({
            details: e.target.value
        })
    }

    // This render() method contains a form where the user can enter their email address,
    // their issue by choosing from a dropdown box and also details about the issue.
    render() {
        return (
            <Container className="container">
                <Helmet>
                    <title>Contact Us</title>
                    <meta name="contact" content="Contact Us" />
                </Helmet>  
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <a href="/portfolio"><img src={logo} className="logo align-top"/></a>
                        <h2>Contact Us!</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label id="email-text">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formIssue">
                                <Form.Label>What is this about?</Form.Label>
                                <Form.Control as="select" onChange={this.onChangeIssue}>
                                    <option>Choose...</option>
                                    <option>Login</option>
                                    <option>Register</option>
                                    <option>Crypto Request</option>
                                    <option>Bug</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formDetails">
                                <Form.Label>Tell us more</Form.Label>
                                <Form.Control type="textarea" placeholder="Go ahead. We're listening..." onChange={this.onChangeDetails}/>
                            </Form.Group>
                            <Button className="contact-btn" variant="light" type="submit" onClick={this.onSubmit}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}