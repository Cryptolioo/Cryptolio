import React from 'react';
import '../styles/crypto.css';

export class Crypto extends React.Component {
    render() {
        return (
            <table id="crypto_table">
                <tr>
                    <td width="8%">
                        <h5>{this.props.crypto.Ticker}</h5>
                    </td>
                    <td width="24%">
                        <h5>${this.props.crypto.Price}</h5>
                    </td>
                    <td width="10%">
                        <h5>{this.props.crypto.Holdings}</h5>
                    </td>
                    <td width="25%">
                    </td>
                </tr>
            </table>
        )
    }
}