import React from 'react';
import '../styles/profile.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export class Profile extends React.Component {

    constructor() {
        super();

    }

    componentDidMount() {
        axios.get()
    }

    render() {
        return (
            <div className="profile">
                <a href="/portfolio"><img src={logo} className="logo align-top"/></a>
                <h2>My Profile</h2>
                <Form className="profile-form">
                    <Form.Group controlId="formFName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group controlId="formLName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"/>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
