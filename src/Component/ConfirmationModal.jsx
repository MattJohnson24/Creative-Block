import React, { Component } from 'react';
import exitIcon from "../assets/exit_white.png";


class ConfirmationModal extends Component {
    render() {
        
        let dialog = (
            <div className='modal' id='confirmation-modal'>
                <div className='modal-content' id="confirmation-modal-content">
                    <div>{this.props.children}</div>
                </div>
            </div>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default ConfirmationModal;