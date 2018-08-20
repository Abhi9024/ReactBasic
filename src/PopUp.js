import React, { Component } from 'react';
import  {Button, Modal,ModalHeader,ModalTitle,ModalBody,ModalFooter }  from 'react-bootstrap';
import './App.css';
import './bootstrap.css';



class PopUp extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleHide = this.handleHide.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleHide() {
      this.setState({ show: false });
    }
    render() {
      return (
        <div className="modal-container" style={{ height: 200 }}>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={() => this.setState({ show: true })}
          >
            Launch contained modal
          </Button>
  
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <ModalHeader closeButton>
              <ModalTitle id="contained-modal-title">
                Contained Modal
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
              ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleHide}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
  
  export default PopUp;