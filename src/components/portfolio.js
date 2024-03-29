import React from 'react';
import logo from '../images/logo.png';
import '../styles/portfolio.css';
import '../styles/create.css';
import { Cryptos } from './cryptos';
import Link from 'react-router-dom/Link';
import { Create } from './create';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import {Helmet} from 'react-helmet';

// The Portfolio class reads in the stored cryptos and sends them to the cryptos component which
// returns them back to Portfolio where all data on the users portfolio is displayed
export class Portfolio extends React.Component {

    constructor(props) {
        super(props);

        this.ReloadData = this.ReloadData.bind(this);

        this.state = {
            userID: '', // User's unique id
            cryptos: [], // empty array to store cryptos to be displayed
            portfolioValue: 0,
            showCreate: false // Visibility of create popup
        };
    }

    // Gets all data in users portfolio using an axios request to the server
    // using the users id as a parameter
    componentDidMount() {
        // Get users id
        this.state.userID = localStorage.getItem("userID");

        axios.get('https://backend-311615.uc.r.appspot.com/api/cryptos/' + this.state.userID)
        .then((response) => {
            this.setState({ cryptos: response.data });
            this.getPortfolioValue(response); // Set portfolio value
            setInterval(this.ReloadData, 30000); // Update portfolio every 30 seconds
        })
        .catch((error) => {
            console.log(error)
        });
    }

    // This function uses axios to create a lifecycle hook that returns the JSON data.
    // Similar to componentDidMount which only gets ran once. This function gets ran whenever
    // a movie is deleted/edited to update the portfolio. It is also called every 30 seconds
    // to ensure the prices are constantly updating.
    ReloadData() {
        this.state.userID = localStorage.getItem("userID");

        axios.get('https://backend-311615.uc.r.appspot.com/api/cryptos/' + this.state.userID)
        .then((response) => {
            this.setState({ cryptos: response.data });
            this.getPortfolioValue(response);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    // This function gets the total portfolio value of our portfolio, by iterating
    // through the cryptos array and adding the total value of each crypto to the
    // portfolioValue variable. Updated every 30 seconds
    getPortfolioValue(cryptos) {
        this.state.portfolioValue = 0;
        cryptos.data.forEach(crypto => {
            this.state.portfolioValue += crypto.price * crypto.holdings;
        });
        // Set the portfolioValueID label to the current portfolio value
        document.getElementById('portfolioValueID').innerHTML = '$' + parseFloat(this.state.portfolioValue).toFixed(2);//Math.round(this.state.portfolioValue);
    }

    // Enable the visibility of the create popup
    addCrypto(show) {
        this.setState({
            showCreate: show
        });
    }

    // This function logs the user out by removing their token
    // that is stored in localstorage which identifies if a user is
    // logged in or not
    logout() {
        localStorage.removeItem("token");
        this.props.history.push('/')
    }

    // This function creates our user interface for the portfolio component. 
    // Each crypto is then read in from the cryptos component and displayed
    // in the table.
    render() {
        return (
            <div className="portfolio">
                <Helmet>
                    <title>Portfolio</title>
                    <meta name="portfolio" content="My Portfolio" />
                </Helmet>  
                <img src={logo} className="logo d-inline-block align-top"/>
                <Dropdown id="dropdown-menu">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/calculator">Position Size Calculator</Dropdown.Item>
                        <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                        <Dropdown.Item href="/contact-us">Contact Us</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="total_container">
                    <h6 className="value_text">Portfolio Value</h6>
                    <h3 id="portfolioValueID"></h3>
                </div>
                <table width="90%" style={{textAlign: "right", color: "rgba(255, 255, 255, 0.5)", marginLeft: "5vw", marginTop: "2vh", marginBottom: "-2vh", fontFamily: "monospace"}}>
                    <tr>
                        <td width="10%"></td>
                        <td width="18%" style={{textAlign: "left"}}>
                            <p>Name</p>
                        </td>
                        <td width="18%">
                            <p>Price</p>
                        </td>
                        <td width="18%">
                            <p>Holdings</p>
                        </td>
                        <td width="18%">
                            <p>Value</p>
                        </td>
                        <td width="18%"></td>
                    </tr>
                </table>
                <Cryptos cryptos={this.state.cryptos} ReloadData={this.ReloadData}></Cryptos>
                <Link onClick={() => this.addCrypto(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" className="add-crypto">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Link>
                {this.state.showCreate ? <Create changeHandler={this.addCrypto.bind(this)} ReloadData={this.ReloadData}/> : null}
            </div>
        );
    }
}