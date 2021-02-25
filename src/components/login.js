import React from 'react';

export class Login extends React.Component {
    render() {
        return(
            <form>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                
            </form>        
        );
    }
}