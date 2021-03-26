import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import logo from '../images/logo.png';
import axios from 'axios';

export class ForgotPassword extends Component{

    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: '',
        }
    }

    onSubmit(e) {
        const newEmail = {
            email: this.state.email
        }

        axios.post('http://localhost:4000/api/forgotPassword', newEmail)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    render() {
        return (
            <Form class="form" id="form" onSubmit={this.onSubmit} >
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
                        <Label>Forgot password</Label>
                     </header>

                <FormGroup>
                    <Label className="email" >Email</Label>
                    <Input
                       type="email" placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}>
                     </Input>
                </FormGroup>

                <Button  className="btn-lg btn-dark btn-block"  onSubmit={this.onSubmit}   >Submit</Button>
                <br></br>
                  </div>
                
            </Form>


        );
    }
}