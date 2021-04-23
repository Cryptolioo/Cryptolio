import React from 'react';
import '../styles/create.css';
import Popup from './Popup';
import Link from 'react-router-dom/Link';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

// The Edit class will be used to edit existing crypto details
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

    // Gets the details of the specified crypto on page by using the props id to
    // identify which crypto the user would like to edit
    componentDidMount() {
        const userID = localStorage.getItem("userID");

        // Create a request object and append some parameters to it which will
        // be passed with the axios.get request
        var params = new URLSearchParams();
        params.append("userID", userID);
        params.append("id", this.props.id);
        var request = {
            params: params
        };
        
        axios.get('https://backend-311615.uc.r.appspot.com/api/cryptos/', request)
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

    // Closes the popup
    closePopup() {
        this.buttonPopup = false;
        this.props.changeHandler(false);
    }

    // When holdings is changed, set the states holdings to the new one
    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    // When form is submitted, make a put request to the server and pass newCrypto
    onSubmit(e) {
        e.preventDefault();
        
        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings,
            _id: this.state._id
        }
        
        axios.put('https://backend-311615.uc.r.appspot.com/api/cryptos/' + this.state._id, newCrypto)
        .then(res => {
            console.log(res);
            this.closePopup();
            this.props.ReloadData();
        })
        .catch((err) => {
            document.getElementById('holdings-text').innerHTML = "Holdings must be greater than 0!";
        });
    }

    // Inside this render() function we create a form. This form has
    // one input box to edit the holdings. There is also
    // a check icon at the bottom. Once clicked the information is sent
    // to the server.
    render() {
        return (
            <Popup trigger={this.buttonPopup}>
                <h2 id="header">Edit {this.state.Ticker}</h2>
                <Form className="edit-form">
                    <Form.Group controlId="formHoldings">
                        <Form.Label id="holdings-text">Add Holdings</Form.Label>
                        <Form.Control type="text" value={this.state.Holdings} onChange={this.onChangeHoldings}/>
                    </Form.Group>
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
                </Form>
            </Popup>
        )
    }
}