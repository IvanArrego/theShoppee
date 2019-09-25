import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, CardImg, CardBody, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modal: false,
      isItInCart: false
    };
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.cartCheck = this.cartCheck.bind(this);
    this.clickedCart = this.clickedCart.bind(this);
    this.clickedCatalog = this.clickedCatalog.bind(this);
  }
  getProductID() {
    fetch('/api/products.php?id=' + this.props.viewId)
      .then(response => response.json())
      .then(product => {
        this.setState({
          product
        });

      })
      .then(() => this.cartCheck(this.state.product[0].id, this.props.cart));
  }
  componentDidMount() {
    this.getProductID();
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onClick() {
    this.props.addProduct(this.state.product);
    this.toggle();
    this.setState({ isItInCart: true });
  }
  cartCheck(idChecked, cart) {
    if (!cart) {
      return null;
    } else if (cart.length >= 1) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productID == idChecked) {
          this.setState({ isItInCart: true });
        }
      }
    }
  }
  clickedCart() {
    this.toggle();
    this.props.setView('cart', {});
  }
  clickedCatalog() {
    this.toggle();
    this.props.setView('catalog', {});
  }
  render() {
    if (this.state.product == null) {
      return null;
    } else {
      const realPrice = parseFloat(this.state.product[0].price / 100);
      return (
        <React.Fragment>
          <Container className="mt-2 mb-4">
            <Row>
              <Col sm="7">
                <CardImg className="card-img-top" src={this.state.product[0].image}></CardImg>
              </Col>
              <Col sm="5">
                <Card className="card" >
                  <CardTitle className="text-center">{this.state.product[0].name}</CardTitle>
                  <CardSubtitle className="text-center">{ ' $' + realPrice.toFixed(2)}</CardSubtitle>
                  <CardBody>
                    <CardText className ="card-text">{this.state.product[0].longDescription}</CardText>
                  </CardBody>
                  <Button disabled={this.state.isItInCart} onClick={() => this.onClick()} className="btn btn-success">Add To Cart</Button>
                  <Button onClick={() => this.props.setView('catalog', {})} className="btn btn-secondary">Go back</Button>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>Added to cart</ModalHeader>
            <ModalBody>{this.state.product[0].name} added to cart</ModalBody>
            <ModalFooter>
              <Button onClick={() => this.clickedCart()}>Go To Cart</Button>
              <Button onClick={() => this.clickedCatalog()}>Continue Shopping</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
      );
    }

  }

}
