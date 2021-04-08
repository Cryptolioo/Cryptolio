import React from 'react';
import '../styles/change-password.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export class ChangePassword extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.onChangePswd1 = this.onChangePswd1.bind(this);
        this.onChangePswd2 = this.onChangePswd2.bind(this);

        this.state = {
            id: '',
            password: '',
            pswd1: '',
            pswd2: '',
            disabled: false,
            hidden: true
        }
    }

    componentDidMount() {
        const userID = localStorage.getItem("userID");
        this.setState({
            id: userID
        })
    }

    onSubmit(e) {
        e.preventDefault()

        if(this.state.pswd1 == this.state.pswd2)
        {
            const user = {
                id: this.state.id,
                newPassword: this.state.pswd1
            }
    
            axios.post('http://localhost:4000/api/change-password', user)
                .then((res) => {
                    if (res.status == 200) {
                        this.props.history.push('/profile')
                    }
                })
                .catch((err) => {
                    if(err.response.status = "422")
                    {
                        document.getElementById("pswd1").innerHTML = err.response.data.errors[0].msg;
                        document.getElementById("pswd2").innerHTML = err.response.data.errors[0].msg;
                    }
                });
        }
        else {
            document.getElementById("pswd1").innerHTML = "Passwords don't match!";
            document.getElementById("pswd2").innerHTML = "Passwords don't match!";
        }
    }

    onChangePswd(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password-text").innerHTML = "Please enter your current password";
    }

    onChangePswd1(e) {
        this.setState({
            pswd1: e.target.value
        })
        document.getElementById("pswd1").innerHTML = "Please enter your new password";
     }

    onChangePswd2(e) {
        this.setState({
            pswd2: e.target.value
        })
        document.getElementById("pswd2").innerHTML = "Confirm your new password";
    }

    verifyPassword() {
        const user = {
            id: this.state.id,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/check-password', user)
        .then((res) => {
            if(res.status == 200) {
                this.setState({
                    disabled: true,
                    hidden: false
                })
            }
        })
        .catch((err) => {
            if(err.response.status == 401) {
                document.getElementById("password-text").innerHTML = "Invalid password entered. Please try again";
            }
        });
    }

    render() {
        return (
            <div className="changePassword" >
                <a href="/profile"><img src={logo} className="logo align-top"/></a>
                <h2>Change Password</h2>
                <div className="change-password-input">
                    <label htmlFor="basic-url" id="password-text">Please enter your current password</label>
                    <InputGroup className="mb-3">
                        <FormControl type="password" onChange={this.onChangePswd}
                            placeholder="Current password"
                            aria-label="Current password"
                            aria-describedby="basic-addon2"
                            disabled={this.state.disabled}
                        />
                        <InputGroup.Append>
                            <Button variant="light" onClick={this.verifyPassword.bind(this)} disabled={this.state.disabled}>Verify</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <br></br>
                    <Form className="change-password-form" hidden={this.state.hidden}>
                        <Form.Group controlId="formPswd1">
                            <Form.Label id="pswd1">Please enter your new password</Form.Label>
                            <Form.Control type="password" id="pswd" onChange={this.onChangePswd1}/>
                        </Form.Group>
                        <Form.Group controlId="formPswd2">
                            <Form.Label id="pswd2">Confirm your new password</Form.Label>
                            <Form.Control type="password" onChange={this.onChangePswd2}/>
                        </Form.Group>
                        <Button variant="light" type="submit" onClick={this.onSubmit}>Change Password</Button>
                    </Form>
                </div>
            </div>
        )
    }
}