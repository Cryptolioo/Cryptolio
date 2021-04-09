import React, { Component } from 'react';
import '../styles/reset-password.css';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Nav from 'react-bootstrap/Nav';
import { Link,withRouter } from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';

export class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            password: '',
            token: '',
            disabled: true
        }
    }

    componentDidMount() {
      const resetToken = this.props.match.params.token;

      axios.get('http://localhost:4000/api/reset-password/' + resetToken)
        .then((res) => {
            if(res.status == 200) {
                this.setState({
                    token: resetToken,
                    disabled: false
                })
            }
        })
        .catch((err) => {
            if(err.response.status == 422) {
                document.getElementById("header").innerHTML = err.response.data.error;
            }
        })
    }


    onSubmit(e) {
    const user = {
        token: this.state.token,
        newPassword: this.state.password
    }

    axios.post('http://localhost:4000/api/change-password', user)
         .then((res) => {
            if(res.status == 200)
            {
                this.props.history.push("/login");
            }
        })
        .catch((err) => {
            if(err.response.status == 422) {
                document.getElementById("password").innerHTML = err.response.data.error;
            }
            else if(err.response.status == 414) {
                document.getElementById("header").innerHTML = err.response.data.error;
                this.setState({
                    disabled: true
                })
            }
        });   
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password").innerHTML = "Enter new password";
    }

    render() {return (
            <div className="reset-password">
                <a href="/forgot-password"><img src={logo} className="logo align-top"/></a>
                <Form class="form" id="form">
                    <div className="container">
                        <header className="header">
                            <Label id="header">Reset Password</Label>
                        </header>
                        <FormGroup>
                            <Label className="password" id="password">New Password</Label>
                            <Input type="password" placeholder="Enter new password" 
                                value={this.state.password} onChange={this.onChangePassword}
                                disabled={this.state.disabled}>
                            </Input>
                        </FormGroup>
                        <Button className="btn-lg btn-dark btn-block" 
                            onClick={this.onSubmit} disabled={this.state.disabled}>Save
                        </Button>
                        <br></br>
                    </div>
                </Form>
            </div>
        );
    }
}