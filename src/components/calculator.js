import React from 'react';
import '../styles/calculator.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export class Calculator extends React.Component {

    constructor() {
        super()
        
        this.onChangeCapital = this.onChangeCapital.bind(this);
        this.onChangeRisk = this.onChangeRisk.bind(this);
        this.onChangeEntry = this.onChangeEntry.bind(this);
        this.onChangeStopLoss = this.onChangeStopLoss.bind(this);

        this.state = {
            capital: '',
            risk: '',
            entry: '',
            stopLoss: '',
            positionsize: 0
        }
    }

    onChangeCapital(e) {
        this.setState({
            capital: e.target.value
        })
    }

    onChangeRisk(e) {
        this.setState({
            risk: e.target.value
        })
    }

    onChangeEntry(e) {
        this.setState({
            entry: e.target.value
        })
    }

    onChangeStopLoss(e) {
        this.setState({
            stopLoss: e.target.value
        })
    }

    calculatePositionSize() {
        if(this.state.capital > 0 && this.state.risk > 0 && this.state.entry > 0 && this.state.stopLoss > 0)
        {
            let riskAmount = (this.state.risk / 100) * this.state.capital;
            let riskPerCoin = this.state.entry - this.state.stopLoss;
            let newPositionSize = riskAmount / riskPerCoin;
            document.getElementById("size-label").value = Math.abs(newPositionSize).toFixed(4);   
        }
    }

    render() {
        return(
            <div className="calculator">
                <a href="/portfolio"><img src={logo} className="logo align-top"/></a>
                <h2>Position Size Calculator</h2>
                <div className="input">
                <label htmlFor="basic-url">What is your total account capital?</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Total Capital"
                        aria-label="Total Capital"
                        aria-describedby="basic-addon1"
                        type="number"
                        min="0"
                        value={this.state.capital} onChange={this.onChangeCapital}
                        />
                    </InputGroup>
                    <label htmlFor="basic-url">What % of your account do you want to risk?</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Risk"
                        aria-label="Risk"
                        aria-describedby="basic-addon2"
                        type="number"
                        min="0"
                        value={this.state.risk} onChange={this.onChangeRisk}
                        />
                    </InputGroup>
                    <label htmlFor="basic-url">What is the entry price?</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Entry Price"
                        aria-label="Entry Price"
                        aria-describedby="basic-addon1"
                        type="number"
                        min="0"
                        value={this.state.entry} onChange={this.onChangeEntry}
                        />
                    </InputGroup>
                    <label htmlFor="basic-url">What is the stop-loss price?</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Stop-Loss Price"
                        aria-label="Stop-Loss Price"
                        aria-describedby="basic-addon1"
                        type="number"
                        min="0"
                        value={this.state.stopLoss} onChange={this.onChangeStopLoss}
                        />
                    </InputGroup>
                    <label htmlFor="basic-url">This is your max allowed position size in # of coins</label>
                    <InputGroup>
                    <FormControl
                        id="size-label"
                        placeholder="# of coins"
                        aria-label="# of coins"
                        aria-describedby="basic-addon1"
                        readOnly
                        value={this.state.positionSize}
                        />
                    </InputGroup>
                    <Button variant="light" className="calc-button" onClick={this.calculatePositionSize()} hidden="true">Calculate</Button>
                </div>
            </div>
        );
    }
}