import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Nav from 'react-bootstrap/Nav';
import { Link,withRouter } from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';
import { response } from 'express';

export class ResetPassword extends Component {

    constructor() {
        super();
        // this.token = props.match, params.token;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email:'',
            password: ''
        }
    }

    // async componentDidMount(){
    //     const {
    //         match: {
    //           params: { token },
    //         },
    //       } = this.props;
    //       try{
    //           const response = await axios.get('http://localhost3000/resetPassword',{
    //             params:{
    //                 resetToken : this.props.match.params.token,
    //             },
    //           })
    //           if(response.data.message === 'Password reset link is ok'){
    //               this.setState({
    //                 email: response.data.email
    //               });
    //           }
    //       }catch(err){
    //           console.log(err)
    //       }
  
          
    // }

    // updatePassword = async (e) => {
    //     e.preventDefault();
    //     const { email, password } = this.state;
    //     const {
    //       match: {
    //         params: { token },
    //       },
    //     } = this.props;
    //     try {
    //       const response = await axios.put(
    //         'http://localhost:3003/resetPassword',
    //         {
    //           email,
    //           password,
    //           resetPasswordToken: token,
    //         },
    //       );
    //       console.log(response.data);
    //     } catch (error) {
    //       console.log(error.response.data);
    //     }
    //   };

    


    onSubmit(e) {

        axios.post('http://localhost:4000/api/resetPassword' )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
            
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

  

    render() {
        // const search = this.props.location.search;
        // const token = new URLSearchParams(search).get("token");

        return (
            <Form class="form" id="form">
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

                <div className="container">

                    <header className="header">
                        <Label>reset Password</Label>
                    </header>

                    <FormGroup>
                        <Label className="password" id="password">New Password</Label>
                        <Input type="password" placeholder="Enter new password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        ></Input>
                    </FormGroup>

                    <Nav.Link as={Link} to="/login" className="btn-lg btn-dark btn-block" onClick={this.onSubmit}>Save</Nav.Link>
                    <br></br>
                </div>

            </Form>


        );
    }
}