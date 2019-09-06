import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        <div className = 'home-background'></div>
        <div className = "sword-background" onClick={() => this.props.setView('catalog', { })}></div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Welcome traveler!</ModalHeader>
          <ModalBody>Please note this is a demo site. Please do not use any real information when checking out. Thank you!</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick = {this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }

}
