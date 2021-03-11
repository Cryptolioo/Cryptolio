import React from 'react';
import '../styles/create.css';
import Popup from './Popup';
import Link from 'react-router-dom/Link';
import axios from 'axios';

export class Edit extends React.Component {

    constructor() {
        super();

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);

        this.state = {
            Ticker: '',
            Price: '',
            Holdings: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos/' + this.props.id)
        .then((response) => {
            this.setState({
                _id: response.data._id,
                Ticker: response.data.ticker,
                Price: response.data.price,
                Holdings: response.data.holdings
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    buttonPopup = true;

    closePopup() {
        this.buttonPopup = false;
        this.props.changeHandler(false);
    }


    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.closePopup();
        
        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings
        }
        
        axios.post('http://localhost:4000/api/cryptos', newCrypto)
        .then((res) => {
            this.props.ReloadData();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <Popup trigger={this.buttonPopup}>
                <h2 id="create_header">Edit {this.state.Ticker}</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Edit Holdings: </label>
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