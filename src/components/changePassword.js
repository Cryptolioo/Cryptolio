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

        this.state = {
            id: '',
            password: ''
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

        const password = {
            password: this.state.password
        }
        console.log("gf")
        axios.post('http://localhost:4000/api/change-password', password)
            .then((res) => {
                if (res.status == 200) {
                }
            })
            .catch((err) => {
               
            });
    }

    onChangePswd(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password-text").innerHTML = "Please enter your current password";
    }

    verifyPassword() {
        const user = {
            id: this.state.id,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/change-password', user)
        .then((res) => {
            if(res.status == 200) {
                console.log("Password Matched")
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
                <div className="change-password-form">
                    <label htmlFor="basic-url" id="password-text">Please enter your current password</label>
                    <InputGroup className="mb-3">
                        <FormControl type="password" onChange={this.onChangePswd}
                            placeholder="Current password"
                            aria-label="Current password"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="light" onClick={this.verifyPassword.bind(this)}>Verify</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        )
    }
}