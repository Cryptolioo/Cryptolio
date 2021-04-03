import React from 'react';
import '../styles/contact-us.css';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';

export class ContactUs extends React.Component {

    constructor() {
        super()

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
                console.log(err);
            });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeIssue(e) {
        this.setState({
            issue: e.target.value
        })
    }

    onChangeDetails(e) {
        this.setState({
            details: e.target.value
        })
    }

    render() {
        return(
            <div className="contact-us">
                <a href="/portfolio"><img src={logo} className="logo align-top"/></a>
                <h2>Contact Us!</h2>
                <Form className="contact-form" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
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
            </div>
        );
    }
}