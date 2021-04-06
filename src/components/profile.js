import React from 'react';
import '../styles/profile.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import axios from 'axios';

export class Profile extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCurrentEmail = this.onChangeCurrentEmail.bind(this);
        this.onChangeNewEmail = this.onChangeNewEmail.bind(this);
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);

        this.state = {
            currentEmail: '',
            newEmail: '',
            currentPassword: '',
            newPassword: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newDetails = {
            currentEmail: this.state.currentEmail,
            newEmail: this.state.newEmail,
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword
        }

        axios.post('http://localhost:4000/api/profile', newDetails)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    onChangeCurrentEmail(e) {
        this.setState({
            currentEmail: e.target.value
        })
    }

    onChangeNewEmail(e) {
        this.setState({
            newEmail: e.target.value
        })
    }

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value
        })
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    render() {


        return (
            <Form>
                <header>
                    <div class="row">
                        <div class="logo-row">
 
                            <h1 id="brand"><img
                                src={logo}
                                width="50"
                                height="50"
                                className="logo"
                            />Cryptolio</h1>
                        </div>
                    </div>
                </header>
                {/* <Navbar bg="secondary" variant="dark"> */}
                    {/* <Navbar.Brand href="#home">
                       <h1> <img
                            src={logo}
                            width="30"
                            height="30"
                            className="logo"
                        />
                       Cryptolio</h1>
                 </Navbar.Brand>
                </Navbar> */}
                <br></br>
                <div className="container">

                    <h3 className="changePassword">Change Password</h3>
                    <br></br>
                    <br></br>
                    <h6 className="message">New Password must be 5 charcters or longer</h6>


                    <FormGroup>
                        {/* <Label className="oldPassword" id="oldPassword">Current Password</Label> */}
                        <Input type="password" placeholder="Current Password"
                            value={this.state.currentPassword}
                            onChange={this.onChangeCurrentPassword}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        {/* <Label className="newPassword" id="newPassword">New Password</Label> */}
                        <Input type="password" placeholder="New Password"
                            value={this.state.newPassword}
                            onChange={this.onChangeNewPassword}
                        ></Input>
                    </FormGroup>

                    <Button className="btn-sm btn-primary btn-block" onClick={this.onSubmit}>Save</Button>

                    <br></br>

                    <h3 className="changeEmail">Change Email</h3>
                    <br></br>
                    <br></br>
                    <FormGroup>
                        {/* <Label className="oldEmail" id="oldEmail">Current Email</Label> */}
                        <Input type="email" placeholder="Current Email"
                            value={this.state.currentEmail}
                            onChange={this.onChangeCurrentEmail}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        {/* <Label className="newEmail" id="newEmail">New Email</Label> */}
                        <Input type="email" placeholder="New Email"
                            value={this.state.newEmail}
                            onChange={this.onChangeNewEmail}
                        ></Input>
                    </FormGroup>

                    <Button className="btn-sm btn-primary btn-block" onClick={this.onSubmit}>Save</Button>
                    <br></br>
                    <Nav.Link as={Link} to="/portfolio" className="btn-lg btn-primary btn-block" onClick={this.onSubmit}>Finished</Nav.Link>

                    <br></br>
                    <br></br>

                </div>


            </Form>
        );
    }
}
