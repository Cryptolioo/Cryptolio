import React from 'react';
import '../styles/landing.css';
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
                <Button variant="success">Login</Button>
                <br></br><br></br>
                <Button variant="outline-success">Register</Button>
            </div>
        );
    }
}