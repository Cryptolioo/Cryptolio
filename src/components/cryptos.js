import React from 'react';
import { Crypto } from './crypto';

export class Cryptos extends React.Component {
    render() {
        return this.props.cryptos.map((crypto) => {
            return <Crypto crypto={crypto} ReloadData={this.props.ReloadData}></Crypto>
        })
    }
}