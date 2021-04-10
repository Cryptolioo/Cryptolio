import React from 'react';
import '../styles/calculator.css';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// The Calculator class calculates the position size the user should use in a trade
// by using a simple formular with the users input as parameters
export class Calculator extends React.Component {

    constructor() {
        super()
        
        // Bind new data to corresponding variables
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

    // When capital is changed, set the states capital to the new one
    onChangeCapital(e) {
        this.setState({
            capital: e.target.value
        })
    }

    // When risk is changed, set the states risk to the new one
    onChangeRisk(e) {
        this.setState({
            risk: e.target.value
        })
    }

    // When entry is changed, set the states entry to the new one
    onChangeEntry(e) {
        this.setState({
            entry: e.target.value
        })
    }

    // When stop-loss is changed, set the states stop-loss to the new one
    onChangeStopLoss(e) {
        this.setState({
            stopLoss: e.target.value
        })
    }

    // This function calculates the position size whenever the user has filled in all inputs
    calculatePositionSize() {
        if(this.state.capital > 0 && this.state.risk > 0 && this.state.entry > 0 && this.state.stopLoss > 0)
        {
            let riskAmount = (this.state.risk / 100) * this.state.capital;
            let riskPerCoin = this.state.entry - this.state.stopLoss;
            let newPositionSize = riskAmount / riskPerCoin;
            document.getElementById("size-label").value = Math.abs(newPositionSize).toFixed(2);   
        }
    }

    // Inside the render() function we create a form. The user can fill in the input boxes. 
    // The last input box is readonly as this is where the user gets the answer to his
    // calculation.
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