import React from 'react';
import '../styles/create.css';
import Popup from './Popup';
import Link from 'react-router-dom/Link';
import axios from 'axios';

export class Create extends React.Component {

    constructor() {
        super();

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTicker = this.onChangeTicker.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);

        this.state = {
            Ticker: '',
            Price: '',
            Holdings: ''
        }
    }

    buttonPopup = true;

    closePopup() {
        this.buttonPopup = false;
        this.props.changeHandler(false);
    }

    onChangeTicker(e) {
        this.setState({
            Ticker: e.target.value
        });
    }

    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings
        }

        axios.post('http://localhost:4000/api/cryptos', newCrypto)
            .then((res) => {
                console.log("close popup");
                this.props.ReloadData();
                this.closePopup();
            })
            .catch((err) => {
                if (err.response.status == 402) { // Ticker is not currently supported
                    document.getElementById('invalidTicker').innerHTML = "Crypto not currently supported!"
                } else if (err.response.status == 404) { // Holdings was an invalid vaue

                    document.getElementById('invalidHoldings').innerHTML = "Holdings must be greater than 0!"
                }
            });
    }

    render() {
        return (
            <Popup trigger={this.buttonPopup}>
                <h2 id="create_header">Add Crypto</h2>
                <label id='invalidTicker'></label>
                <br></br>
                <label id='invalidHoldings'></label>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Ticker: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Ticker}
                            onChange={this.onChangeTicker}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Holdings: </label>
                        <input type='text'
                            name='holdings'
                            className='form-control'
                            value={this.state.Holdings}
                            onChange={this.onChangeHoldings}></input>
                    </div>
                    <div className="confirm-cancel">
                        <Link onClick={this.onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" style={{ color: "white" }}>
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </Link>
                        <Link onClick={() => this.closePopup()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" style={{ color: "white" }}>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </Link>
                    </div>
                </form>
            </Popup>
        )
    }
}