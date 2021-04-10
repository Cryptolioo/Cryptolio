import React from 'react';
import '../styles/profile.css';
import logo from '../images/logo.png';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// The profile class is only accessibleby a logged in user from the
// dropdown menu from the portfolio page. The user can edit their name
// or email here. They can also click change password which redirects them
// to the change password component
export class Profile extends React.Component {

    constructor() {
        super();

        // Gets all data in users portfolio using an axios request to the server
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeSname = this.onChangeSname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            id: '', // Users unique id
            fname: '',
            sname: '',
            email: '',
            password: ''
        }
    }

    // Make a get request to server using the users id as a paramater and
    // return back the users details
    componentDidMount() {
        const userID = localStorage.getItem("userID");

        axios.get('http://localhost:4000/api/profile/' + userID)
        .then((res) => {
            this.setState({ // Set the state with returned details
                id: userID,
                fname: res.data.fname,
                sname: res.data.sname,
                email: res.data.email,
                password: res.data.password,
                disabled: true // Disable the input boxes
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Enable the input boxes
    enableEdit() {
        this.setState({
            disabled: false
        })
    }

    // When the form is submitted, make a post request to the server and
    // try to change the users details with the details entered
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
                    disabled: true // Disable the input boxes
                })
            })
            .catch((err) => { // Couldn't edit user details
                if(err.response.status == 422) {
                    err.response.data.errors.forEach(error => {
                        if(error.param == 'fname') // First Name was invalid
                        {
                            document.getElementById("fname").innerHTML = error.msg;
                        }
                        else if(error.param == 'sname') // Last Name was invalid
                        {
                            document.getElementById("sname").innerHTML = error.msg;
                        }
                        else if(error.param == 'email')// Email was invalid
                        {
                            document.getElementById("email").innerHTML = error.msg;
                        }
                    });
                }
            });
    }

    // When first name is changed, set the states fname to the new one
    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        })
        document.getElementById("fname").innerHTML = "First Name";
    }

    // When last name is changed, set the states sname to the new one
    onChangeSname(e) {
        this.setState({
            sname: e.target.value
        })
        document.getElementById("sname").innerHTML = "Last Name";
    }

    // When email is changed, set the states email to the new one
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        document.getElementById("email").innerHTML = "Email";
    }

    // This render() method contains a form where the user can edit their details. By default the form is disabled.
    // When the user clicks the edit details button the form is enabled. The user can edit their details and click the 
    // save changes button and if successful the form will be disabled again
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