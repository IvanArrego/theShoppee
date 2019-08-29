import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modal: false,
      isItInCart: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
        if (cart[i].id === idChecked) {
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
      const imageStyle = {
        height: '300px',
        display: 'inline-block'
      };
      const cardBodyStyle = {
        width: '600px',
        left: '50%',
        transform: 'translate(-50%)',
        textAlign: 'center'
      };
      const inlineStyle = {
        display: 'inline-block'
      };
      const realPrice = parseFloat(this.state.product[0].price / 100);
      return (
        <div>
          <div className = "card" style = {cardBodyStyle}>
            <img className = "card-img-top" style ={imageStyle} src = {this.state.product[0].image}></img>
            <h2 className = "card-title" style ={inlineStyle}>{this.state.product[0].name}</h2>
            <h4 className = "card-text" style ={inlineStyle}>{ ' $' + realPrice.toFixed(2)}</h4>
            <p className = "card-text" style ={inlineStyle}>{this.state.product[0].shortDescription}</p>
            <div className ="card-body" >
              <p className = "card-text">{this.state.product[0].longDescription}</p>
            </div>
            <button disabled ={this.state.isItInCart} onClick = {() => this.onClick() } className = "btn btn-success">Add To Cart</button>
            <button onClick = {() => this.props.setView('catalog', {})} className = "btn btn-secondary">Go back</button>
          </div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>Added to cart</ModalHeader>
            <ModalBody>{this.state.product[0].name} added to cart</ModalBody>
            <ModalFooter>
              <Button onClick={() => this.clickedCart()}>Go To Cart</Button>
              <Button onClick={() => this.clickedCatalog()}>Continue Shopping</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

  }

}
