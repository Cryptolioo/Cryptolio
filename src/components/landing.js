import React from 'react';
import '../styles/landing.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export class Landing extends React.Component {
    render() {
        return(
            <div className="landing ">
                <Navbar id="navbar" width="100%">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <h1 id="brand">Cryptolio</h1>
                    <Nav.Link as={Link} to="/calculator" className="calc-link ml-auto">Calculator</Nav.Link>
                    <Nav.Link as={Link} to="/contact-us" className="contact-link">Contact Us</Nav.Link>
                    <Nav.Link as={Link} to="/login" className="login-btn btn btn-success ml-auto">Login</Nav.Link>
                </Navbar>
                
                <h1 id="intro">
                    Track all your Crypto in the one place from <br></br>anywhere in the world.
                </h1>
                <Link to="/register" className="register-btn btn btn-success">Register</Link>
            </div>
        );
    }
}