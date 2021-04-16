import React from 'react';
import '../styles/landing.css';
import { Link } from 'react-router-dom';
import logo from '../images/logoWithBrand.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Row, Col} from 'react-bootstrap';

// The Landing class is the main page the user is brought to when they enter the site.
// This page has navigation to login/register or to simple use the calculator or to contact support.
export class Landing extends React.Component {
    render() {
        return (
            <Container className="container" style={{display: "flex", flexDirection: "column"}}>
                <Row className="show-grid align-items-center">
                    <Col xs={12} md={5} lg={3}>
                        <img src={logo}/>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} md={2} lg={{ span: 2, offset: 1 }}>
                        <Nav.Link as={Link} to="/calculator" className="calc-link ml-auto">Calculator</Nav.Link>
                    </Col>
                    <Col xs={5} md={2} lg={2}>
                        <Nav.Link as={Link} to="/contact-us" className="contact-link">Contact Us</Nav.Link>
                    </Col>
                    <Col xs={{ span: 6, offset: 3 }} md={{ span: 2, offset: 5 }} lg={{ span: 2, offset: 2 }}>
                        <Nav.Link as={Link} to="/login" className="login-btn btn btn-success ml-auto">Login</Nav.Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} lg={8}>
                        <h1 id="intro">
                            Track all your Crypto in the one place from <br></br>anywhere in the world.
                        </h1>
                        <Link to="/register" className="register-btn btn btn-success">Register</Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}