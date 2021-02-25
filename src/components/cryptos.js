import React from 'react';
import { Crypto } from './crypto';

export class Cryptos extends React.Component {
    render() {
        return(
            <div className="cryptos">
                <Crypto></Crypto>
            </div>
        );
    }
}