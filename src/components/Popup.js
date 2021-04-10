import React from 'react'
import '../styles/popup.css';

// This function creates a popup template which I can use
// in other components to create a popup
function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup
