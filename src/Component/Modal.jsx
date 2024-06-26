import React from "react";
import "../App.css";
import PropTypes from "prop-types";

// This component is an example of a modal dialog.  The content can be swapped out for different uses, and
// should be passed in from the parent class.
export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.onClose}>
            &times;
          </span>
          <div id="modalcontent">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
