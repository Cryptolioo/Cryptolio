import React from 'react';
import '../styles/landing.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class Landing extends React.Component {
    render() {
        return(
            <div className="landing">
                <h1>Cryptolio</h1>
                <br></br><br></br><br></br>
                <p>
                    Enter Introduction for Cryptolio here.
                </p>
                <br></br>
                <Link to="/login" className="btn btn-success btn-lg">Login</Link>
                <br></br><br></br>
                <Link to="/register" className="btn btn-outline-success btn-lg">Register</Link>
            </div>
        );
    }
}