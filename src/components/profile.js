import React from 'react';
import '../styles/profile.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export class Profile extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeSname = this.onChangeSname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            id: '',
            fname: '',
            sname: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const userID = localStorage.getItem("userID");
        console.log("Get stuff")
        axios.get('http://localhost:4000/api/profile/' + userID)
        .then((res) => {
            this.setState({
                id: userID,
                fname: res.data.fname,
                sname: res.data.sname,
                email: res.data.email,
                password: res.data.password,
                disabled: true
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    enableEdit() {
        this.setState({
            disabled: false
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            id: this.state.id,
            fname: this.state.fname,
            sname: this.state.sname,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/profile', user)
            .then((res) => {
                console.log(res);
                this.setState({
                    disabled: true
                })
            })
            .catch((err) => {
                if(err.response.status == 422) {
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'fname')
                        {
                            document.getElementById("fname").innerHTML = error.msg;
                        }
                        else if(error.param == 'sname')
                        {
                            document.getElementById("sname").innerHTML = error.msg;
                        }
                        else if(error.param == 'email')
                        {
                            document.getElementById("email").innerHTML = error.msg;
                        }
                    });
                }
            });
    }

    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        })
        document.getElementById("fname").innerHTML = "First Name";
    }

    onChangeSname(e) {
        this.setState({
            sname: e.target.value
        })
        document.getElementById("sname").innerHTML = "Last Name";
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    render() {
        return (
            <div className="profile" onSubmit={this.onSubmit}>
                <a href="/portfolio"><img src={logo} className="logo align-top"/></a>
                <h2>My Profile</h2>
                <Form className="profile-form">
                    <Form.Group controlId="formFName">
                        <Form.Label id="fname">First Name</Form.Label>
                        <Form.Control type="text" value={this.state.fname} disabled={this.state.disabled} onChange={this.onChangeFname} required/>
                    </Form.Group>
                    <Form.Group controlId="formLName">
                        <Form.Label id="sname">Last Name</Form.Label>
                        <Form.Control type="text" value={this.state.sname} disabled={this.state.disabled} onChange={this.onChangeSname}/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label id="email">Email address</Form.Label>
                        <Form.Control type="email" value={this.state.email} disabled={this.state.disabled} onChange={this.onChangeEmail}/>
                    </Form.Group>
                    <Button variant="light" onClick={this.enableEdit.bind(this)} disabled={!this.state.disabled}>Edit Details</Button>
                    <Button variant="light" type="submit" onClick={this.onSubmit} disabled={this.state.disabled}>Save Changes</Button>
                    <br></br><br></br>
                    <Button variant="light" href="/change-password">Change Password</Button>
                </Form>
            </div>
        )
    }
}