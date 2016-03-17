var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');


/*
By default the modal is anchored to document.body. All of the following overrides are available.

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    text-align            : 'center'
  }
};


var PopUp = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: true };
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div id="pop-up">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <button onClick={this.closeModal} className="close-btn">X</button>
          <h1> Welcome to Get Block-O Home</h1>

          <h3>
          {"make it to the the house and win"}
          {" be sure to avoid the balls"}
          <br/>
          {"don't hit the walls!"}
          </h3>


          <ul id="pop-up-instructions">
            <h2>Instructions:</h2>
            <li> [←] to move blocko left</li>
            <li> [→] to move blocko right</li>
            <li> [↑] to climb the ladder</li>
            <li> [space] to jump</li>

          </ul>
        </Modal>
      </div>
    );
  }
});

module.exports = PopUp;
