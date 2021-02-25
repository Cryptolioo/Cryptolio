import React from 'react';

export class Crypto extends React.Component {
    render() {
        return(
            <div className="crypto">
                {console.log(this.props.cryptos)}
            </div>
        );
    }
}