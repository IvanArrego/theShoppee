import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, Col, Container, FormFeedback, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      demoModal: true,
      orderedModal: false,
      canCheckout: false,
      name: '',
      creditCard: '',
      expiration: '',
      cvv: '',
      address: '',
      phone: '',
      email: '',
      validation: {
        validName: '',
        validCC: '',
        validExp: '',
        validCVV: '',
        validAddress: '',
        validPhone: '',
        validEmail: ''
      }
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleOrderedModal = this.toggleOrderedModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.addressInput = this.addressInput.bind(this);
    this.addressValidation = this.addressValidation.bind(this);
    this.emailInput = this.emailInput.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.phoneInput = this.phoneInput.bind(this);
    this.phoneValidation = this.phoneValidation.bind(this);
    this.creditCardValidation = this.creditCardValidation.bind(this);
    this.creditInput = this.creditInput.bind(this);
    this.expirationValidation = this.expirationValidation.bind(this);
    this.expirationInput = this.expirationInput.bind(this);
    this.cvvValidation = this.cvvValidation.bind(this);
    this.cvvInput = this.cvvInput.bind(this);
    this.openOrderedModal = this.openOrderedModal.bind(this);
    this.orderedToggle = this.orderedToggle.bind(this);
    this.demoToggle = this.demoToggle.bind(this);


  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  demoToggle(){
      this.setState(prevState => ({
        demoModal: !prevState.demoModal
      }));
  }
  
  orderedToggle() {
    this.toggleOrderedModal();
  }
  openModal() {
    this.setState({ modal: true });
  }
  openOrderedModal() {
    this.setState({ orderedModal: true });
  }
  toggleOrderedModal() {
    this.setState(prevState => ({
      orderedModal: !prevState.orderedModal
    }));
  }

  deleteItem() {
    this.props.delete();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  nameValidation(e) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const { validation } = this.state;
    if (nameRegex.test(e.target.value)) {
      validation.validName = 'valid';
    } else {
      validation.validName = 'invalid';
    }
    this.setState({ validation });
  }

  nameInput(e) {
    this.handleChange(e);
    this.nameValidation(e);
  }

  addressValidation(e) {
    const addressRegex = /^[0-9]+[ ]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const { validation } = this.state;
    if (addressRegex.test(e.target.value)) {
      validation.validAddress = 'valid';
    } else {
      validation.validAddress = 'invalid';
    }
    this.setState({ validation });
  }
  addressInput(e) {
    this.handleChange(e);
    this.addressValidation(e);
  }

  emailValidation(e) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validation } = this.state;
    if (emailRegex.test(e.target.value)) {
      validation.validEmail = 'valid';
    } else {
      validation.validEmail = 'invalid';
    }
    this.setState({ validation });
  }
  emailInput(e) {
    this.handleChange(e);
    this.emailValidation(e);
  }
  phoneValidation(e) {
    const phoneRegex = /[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}/;
    const { validation } = this.state;
    if (phoneRegex.test(e.target.value)) {
      validation.validPhone = 'valid';
    } else {
      validation.validPhone = 'invalid';
    }
    this.setState({ validation });
  }
  phoneInput(e) {
    this.handleChange(e);
    this.phoneValidation(e);
  }
  creditCardValidation(e) {
    const creditRegex = /[0-9]{16}/;
    const { validation } = this.state;
    if (creditRegex.test(e.target.value)) {
      validation.validCC = 'valid';
    } else {
      validation.validCC = 'invalid';
    }
    this.setState({ validation });
  }

  creditInput(e) {
    this.handleChange(e);
    this.creditCardValidation(e);
  }

  expirationValidation(e) {
    const expRegex = /[0-9]{2}\/?([0-9]{4}|[0-9]{2})$/;
    const { validation } = this.state;
    if (expRegex.test(e.target.value)) {
      validation.validExp = 'valid';
    } else {
      validation.validExp = 'invalid';
    }
    this.setState({ validation });
  }
  expirationInput(e) {
    this.handleChange(e);
    this.expirationValidation(e);
  }
  cvvValidation(e) {
    const cvvRegex = /^([0-9]{3}|[0-9]{4})$/;
    const { validation } = this.state;
    if (cvvRegex.test(e.target.value)) {
      validation.validCVV = 'valid';
      this.setState({canCheckout: true});
    } else {
      validation.validCVV = 'invalid';
    }
    this.setState({ validation });   
  }
  cvvInput(e) {
    this.handleChange(e);
    this.cvvValidation(e);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.toggle();
    this.toggleOrderedModal();
    this.props.order(this.state);
    this.props.delete();
    this.setState({
      name: '',
      creditCard: '',
      address: '',
      email: '',
      phone: '',
      expiration: '',
      cvv: ''

    });
  }
  handleClear() {
    this.setState({
      name: '',
      creditCard: '',
      address: '',
      email: '',
      phone: '',
      expiration: '',
      cvv: ''
    });
  }

  render() {
    const totalCartPrice = this.props.cart.reduce((acc, cur) => {
      acc += cur.price * 1;
      return acc;
    }, 0);
    let realPrice = (totalCartPrice / 100).toFixed(2);
    realPrice = parseFloat(realPrice);
    let shipping = 5.00;
    shipping = shipping.toFixed(2);
    shipping = parseFloat(shipping);
    let tax = totalCartPrice / 100 * 0.0775;
    let taxes = tax.toFixed(2);
    taxes = parseFloat(taxes);
    let totalPrice = realPrice + taxes;
    let totalTaxedPrice = totalPrice + shipping;
    totalTaxedPrice = totalTaxedPrice.toFixed(2);
    totalTaxedPrice = parseFloat(totalTaxedPrice);
    return (
      <React.Fragment>
        <Container className="mt-4 mb-5">
          <div className="h1 text-center card-font mb-4">CHECKOUT</div>
          <Row>
            <Col sm="7">
              <Card className="mb-2">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>1. SHIPPING</CardHeader>
                <CardBody>
                  <CardText>Shipping + Billing Address <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip1"/></CardText>
                  <ReactTooltip id="tooltip1" place="right" type="dark" effect="solid">
                    <span className="font-weight-bold">Note: This is a demo please do not input actual information</span>
                  </ReactTooltip>
                  <InputGroup className="mb-1">
                    <Input placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.nameInput} valid={ this.state.validation.validName === 'valid' } invalid={ this.state.validation.validName === 'invalid' }/>
                    <FormFeedback invalid>Please enter your name.</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="Shipping Address" name="address" type="text" value={this.state.address} onChange={this.addressInput} valid={ this.state.validation.validAddress === 'valid' } invalid={ this.state.validation.validAddress === 'invalid' } />
                    <FormFeedback invalid>Please enter your address.</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="E-Mail" name="email" type="text" value={this.state.email} onChange={this.emailInput} valid={ this.state.validation.validEmail === 'valid' } invalid={ this.state.validation.validEmail === 'invalid' } />
                    <FormFeedback invalid>Please enter a valid e-mail address.</FormFeedback>
                  </InputGroup>
                  <InputGroup>
                    <Input placeholder="Phone Number" name="phone" type="number" value={this.state.phone} onChange={this.phoneInput} valid={ this.state.validation.validPhone === 'valid' } invalid={ this.state.validation.validPhone === 'invalid' }/>
                    <FormFeedback invalid>Please enter a valid 10-digit phone number.</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardHeader className="h3 card-font text-white" style={{ backgroundColor: '#333', borderColor: '#333' }}>2. BILLING</CardHeader>
                <CardBody>
                  <CardText>Credit Card Information <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip2"/></CardText>
                  <ReactTooltip id="tooltip2" place="right" type="dark" effect="solid">
                    <span className="font-weight-bold">Note: This is a demo please do not input actual billing or CC information</span>
                  </ReactTooltip>
                  <InputGroup className="mb-1">
                    <Input placeholder="Credit Card No." name="creditCard" type="number" value={this.state.creditCard} onChange={this.creditInput} valid={ this.state.validation.validCC === 'valid' } invalid={ this.state.validation.validCC === 'invalid' } />
                    <FormFeedback invalid>Please enter a valid 16-digit credit card number (no dashes).</FormFeedback>
                  </InputGroup>
                  <InputGroup className="mb-1">
                    <Input placeholder="Expiration Date (ex. 01/20 or 1/2020)" name="expiration" value={this.state.expiration} onChange={this.expirationInput} valid={ this.state.validation.validExp === 'valid' } invalid={ this.state.validation.validExp === 'invalid' }/>
                    <FormFeedback invalid>Please enter a valid expiration date (mm/yy or mm/yyyy).</FormFeedback>
                  </InputGroup>
                  <InputGroup className="">
                    <Input placeholder="CVV" name="cvv" type="number" value={this.state.cvv} onChange={this.cvvInput} valid={ this.state.validation.validCVV === 'valid' } invalid={ this.state.validation.validCVV === 'invalid' } />
                    <FormFeedback invalid>Please enter a valid 3 or 4 digit CVV.</FormFeedback>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>
            <Col sm="5">
              <div className="h3 card-font">IN YOUR CART</div>
              <span className="h6 description-font text-muted"> {this.props.items} item(s)</span>
              <hr/>
              <div className="h6 description-font">Subtotal:
                <span className="float-right">${realPrice.toFixed(2)}</span></div>
              <div className="h6 description-font">Shipping: <i className="fas fa-question-circle pointer-hover  text-warning" href="#" data-tip data-for="tooltip3"/>
                <ReactTooltip id="tooltip3" place="right" type="dark" effect="solid">
                  <span className="font-weight-bold">Shipping is set at a flat-rate of $5</span>
                </ReactTooltip>
                <span className="float-right">${shipping.toFixed(2)}</span>
              </div>
              <div className="h6 description-font mb-4">Tax: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip4"/>
                <span className="float-right">${taxes}</span>
                <ReactTooltip id="tooltip4" place="right" type="dark" effect="solid">
                  <span className="font-weight-bold">Sales tax is based on Orange County, CA&apos;s rate of 7.75%</span>
                </ReactTooltip>
              </div>
              <hr/>
              <div className="h4 card-font mb-4 text-orange">TOTAL : <span className="float-right">${totalTaxedPrice}</span></div>
              <Button className="btn btn-lg btn-secondary btn-block card-font" onClick={() => this.props.setView('cart', { })}>BACK TO CART</Button>
              <Button disabled={!this.state.canCheckout} className="btn btn-lg btn-primary btn-block card-font" onClick={() => this.openModal()}>CHECKOUT</Button>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="card-font" toggle={this.toggle}><i className="fas fa-exclamation-circle text-warning"></i> FINAL CONFIRMATION</ModalHeader>
          <ModalBody>
            <div className="container mb-3 text-center description-font font-weight-bold">Would you like to submit your order?</div>
            <Container>
              <Row>
                <Col>
                  <div className="card-font">1. SHIPPING</div>
                  <div className="description-font">{this.state.name}</div>
                  <div className="description-font">{this.state.address}</div>
                  <div className="description-font">{this.state.email}</div>
                  <div className="description-font">{this.state.phone}</div>
                </Col>
                <Col>
                  <div className="card-font">2. BILLING</div>
                  <div className="description-font">CC #: {this.state.creditCard}</div>
                  <div className="description-font">Exp.: {this.state.expiration}</div>
                  <div className="description-font">CVV: {this.state.cvv}</div>
                </Col>
              </Row>
            </Container>
            <hr/>
            <div className="h3 card-font text-center font-weight-bold">Order Total: ${totalTaxedPrice}</div>
            <div className="description-font text-muted text-center">{this.props.items} item(s)</div>
            <div className="align-content-center">
            </div>
          </ModalBody>
          <ModalFooter className="card-font">
            <Button color="secondary" onClick={this.toggle}>RETURN TO CHECKOUT</Button>{' '}
            <Button color="success" onClick={this.orderedToggle}>SUBMIT ORDER</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.orderedModal} toggle={this.toggleOrderedModal}>
          <ModalHeader>Thank you traveler!</ModalHeader>
          <ModalBody>We have received your order! Please allow 5-10 business years to receive your order.</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick = {this.handleSubmit}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.demoModal} toggle={this.demoToggle}>
          <ModalHeader>Reminder!</ModalHeader>
          <ModalBody>Please note this is a demo site. Please do not use any real information when checking out. Thank you!</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick = {this.demoToggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
export default CheckoutForm;
