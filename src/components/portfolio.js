import React from 'react';
import logo from '../images/logo.png';
import '../styles/portfolio.css';
import '../styles/create.css';
import { Cryptos } from './cryptos';
import Link from 'react-router-dom/Link';
import { Create } from './create';
import axios from 'axios';

export class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            cryptos: []
        };
        //this.addCrypto = this.addCrypto.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data})
        })
        .catch((error) => {
            console.log(error)
        });
    }

    addCrypto(show) {
        this.setState({
            showCreate: show,
        });
    }

    render() {
        return(
            <div className="portfolio">
                <img src={logo} width="70" height="70"
                     className="logo d-inline-block align-top"/>
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
                <Cryptos cryptos={this.state.cryptos}></Cryptos>
                <Link onClick={() => this.addCrypto(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" style={{position: "absolute", bottom: "20px", color: "white"}}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Link>
                {this.state.showCreate ? <Create changeHandler={this.addCrypto.bind(this)}/> : null}
            </div>
        );
    }
}