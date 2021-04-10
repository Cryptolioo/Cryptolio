import React from 'react';
import { Crypto } from './crypto';

// The Cryptos class uses the map function to split up 'cryptos' array into
// 'crypto'. This is then returned to the crypto component one by one.
export class Cryptos extends React.Component {
    
    render() {
        return this.props.cryptos.map((crypto) => {
            return <Crypto crypto={crypto} ReloadData={this.props.ReloadData}></Crypto>
        })
    }
}