import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap';

// The reset password class allows the user to enter a new password
// A token is passed in the URL when the user clicks the link in their email
// this token is used to find the user in the database and check if their expire token
// has expired and if so don't let them change password.
export class ResetPassword extends Component {

    constructor(props) {
        super(props);

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            password: '',
            token: '',
            disabled: true
        }
    }

    // Get the reset token from the URL when the page is loaded and make a get
    // request to the server to check if the user can change password
    componentDidMount() {
      const resetToken = this.props.match.params.token;

      axios.get('http://localhost:4000/api/reset-password/' + resetToken)
        .then((res) => {
            if(res.status == 200) { // User can change password
                this.setState({
                    token: resetToken,
                    disabled: false // Enable form
                })
            }
        })
        .catch((err) => {
            if(err.response.status == 422) { // Expire token has expired or token is invalid
                document.getElementById("header-txt").innerHTML = err.response.data.error;
            }
        })
    }

    // When the form is submitted, make a post request to the server containing
    // the token and the new password.
    onSubmit(e) {
        const user = {
            token: this.state.token,
            newPassword: this.state.password
        }

        axios.post('http://localhost:4000/api/change-password', user)
            .then((res) => {
                if(res.status == 200) // Changed password successfully
                {
                    this.props.history.push("/login"); // Redirect to login page
                }
            })
            .catch((err) => {
                if(err.response.status == 422) { // Password does not meet requirements
                    document.getElementById("password").innerHTML = err.response.data.error;
                }
                else if(err.response.status == 414) { // Token has expired
                    document.getElementById("header").innerHTML = err.response.data.error;
                    this.setState({
                        disabled: true // Disble form
                    })
                }
            });   
    }

    // When password is changed, set the states password to the new one
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        document.getElementById("password").innerHTML = "Enter new password";
    }

    // This render() method contains a form which is disabled by default. If the token and expire
    // token are valid this form is enabled and the user can change their password
    render() {
        return (
            <Container className="container">
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <a href="/forgot-password"><img src={logo} className="logo align-top"/></a>
                        <h2 id="header-txt">Reset Password</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form id="form">
                            <FormGroup>
                                <Label className="password" id="password">New Password</Label>
                                <Input type="password" placeholder="Enter new password" 
                                    value={this.state.password} onChange={this.onChangePassword}
                                    disabled={this.state.disabled}>
                                </Input>
                            </FormGroup>
                            <Button className="btn-light btn-block" onClick={this.onSubmit} disabled={this.state.disabled}>Save</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}