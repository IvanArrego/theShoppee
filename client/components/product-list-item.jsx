import React from 'react';
import { Row, Button, Card, CardBody, CardImg, CardSubtitle, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

function ProductListItem(props) {
  const realPrice = props.price / 100;
  const imageSize = {
    objectFit: 'contain',
    height: '300px'
  };
  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mt-2 mb-2 d-flex">
      <Card className="card-font text-center shadow-sm">
        <div>
          <CardImg style={imageSize} top width="100%" src={props.image}/>
        </div>
        <CardBody>
          <CardSubtitle className="h6 text-muted mb-1">{props.name}</CardSubtitle>
          <CardSubtitle className="h5 text-muted mb-1">{ ' $' + realPrice.toFixed(2)}</CardSubtitle>
          <Button className="btn-block" onClick={() => props.setView('details', { id: props.id })}>Details</Button>
        </CardBody>
      </Card>
    </Col>
  );
}

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
    this.toggle = this.toggle.bind(this);
    this.firstVisitCheck = this.firstVisitCheck.bind(this);
  }
  componentWillMount() {
    this.firstVisitCheck();
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    sessionStorage.setItem('visit', 'visited');
  }
  firstVisitCheck() {
    let sessionCheck = sessionStorage.getItem('visit');
    if (sessionCheck === 'visited') {
      this.setState({ modal: false });
    }
  }
  render() {
    let message = {
      textAlign: 'center',
      backgroundColor: 'white',
      marginBottom: '1%',
      fontFamily: 'gameFont',
      color: 'black',
      fontSize: '50px'

    };

    const productItem = this.props.products.map(prod => {
      return (
        <ProductListItem
          key={prod.id}
          name = {prod.name}
          price = {prod.price}
          image = {prod.image}
          desc = {prod.shortDescription}
          setView = {this.props.setView}
          id = {prod.id}
        />
      );
    });
    return (
      <React.Fragment>
        <div style={message}>Welcome to our shop traveler! Here you will find rare and powerful items to help you along your quest. Please note that there is a limit of one of each item per order.</div>
        <Row className="justify-content-md-center mr-1 ml-1">
          {productItem}
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Welcome traveler!</ModalHeader>
          <ModalBody>Please note this is a demo site. Please do not use any real information when checking out. Please acknowledge this by clicking the Close button or clicking on the screen. Thank you!</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick = {this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
