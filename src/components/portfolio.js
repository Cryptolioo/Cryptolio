import React from 'react';
import logo from '../images/logo.png';
import '../styles/portfolio.css';
import { Cryptos } from './cryptos';

export class Portfolio extends React.Component {

    state = {
        cryptos: [
            {
                "Ticker": "BTC",
                "Price": "54000",
                "Holdings": "34"
            },
            {
                "Ticker": "ETH",
                "Price": "1700",
                "Holdings": "127"
            }
        ]
    }

    render() {
        return(
            <div className="portfolio">
                <img
                        src={logo}
                        width="70"
                        height="70"
                        className="logo d-inline-block align-top"
                    />
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
            </div>
        );
    }
}