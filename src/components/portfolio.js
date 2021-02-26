import React from 'react';
import logo from '../images/logo.png';
import '../styles/portfolio.css';
import '../styles/create.css';
import { Cryptos } from './cryptos';
import Link from 'react-router-dom/Link';
//import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import Popup from './Popup';
import { useState } from 'react';

function Portfolio() {

    const [buttonPopup, setButtonPopup] = useState(false);
    
    let state = {
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
                <Cryptos cryptos={state.cryptos}></Cryptos>
                <Link onClick={() => setButtonPopup(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" style={{position: "absolute", bottom: "20px", color: "white"}}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Link>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h2 id="create_header">Add Crypto</h2>
                    <form>
                        <div className="form-group">
                            <label>Add Ticker: </label>
                            <input type='text'
                            className='form-control'></input>
                        </div>
                        <div className="form-group">
                            <label>Add Holdings: </label>
                            <input type='text'
                            name='holdings'
                            className='form-control'></input>
                        </div>
                        <div className="confirm-cancel">
                            <Link onClick={() => setButtonPopup(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"  fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" style={{color: "white"}}>
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </Link>
                            <Link onClick={() => setButtonPopup(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"  fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" style={{color: "white"}}>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </Link>
                        </div>
                    </form>
                </Popup>
            </div>
        );
}

export default Portfolio