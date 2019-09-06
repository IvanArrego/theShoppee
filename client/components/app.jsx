import React from 'react';
import Header from './header';
import Home from './home-page';
import ProductList from './product-list-item';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'home',
        params: {

        }
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.listOrDesc = this.listOrDesc.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }
  getProducts() {
    fetch('/api/products.php')
      .then(response => response.json())
      .then(newProducts => this.setState({
        products: this.state.products.concat(newProducts)
      }));
  }
  getCartItems() {
    fetch('/api/cart.php')
      .then(response => response.json())
      .then(currentCartItems => this.setState({
        cart: currentCartItems
      }));
  }
  addToCart(product) {
    const postToCart = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('/api/cart.php', postToCart)
      .then(response => response.json())
      .then(addedCartItem => this.setState({
        cart: this.state.cart.concat(addedCartItem)
      }));
  }
  removeItem(id) {
    const cartItem = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    };
    const cartState = [...this.state.cart];
    const updatedCart = cartState.filter(cartItems =>
      cartItems.id !== id
    );
    fetch('/api/cart.php?=' + id, cartItem)
      .then(() => { this.setState({ cart: updatedCart }); });

  }
  placeOrder(order) {
    let cartOrder = this.state.cart;
    let orderTransaction = {
      name: order.name,
      address: order.address,
      email: order.email,
      phone: order.phone,
      creditCard: order.creditCard,
      cvv: order.cvv,
      expiration: order.expiration,
      cart: JSON.stringify(cartOrder)
    };
    const checkoutCart = {
      method: 'POST',
      body: JSON.stringify(orderTransaction),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('/api/orders.php', checkoutCart)
      .then(response => response.json())
      .then(() => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {

          }
        }
      }));
  }
  setView(name, params) {
    this.setState({
      view: { name: name, params: params }
    });
  }
  listOrDesc() {
    const cartCount = this.state.cart.length;
    if (this.state.view.name === 'home') {
      return (
        <Home setView = {this.setView} click = {this.homePageClick}/>
      );
    } else if (this.state.view.name === 'catalog') {
      return (
        <div className='store-background'>
          <ProductList products = {this.state.products} setView = {this.setView}/>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails setView = {this.setView} viewId = {this.state.view.params.id} addProduct = {this.addToCart} cart = {this.state.cart} />
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary delete = {this.removeItem} items = {cartCount} products = {this.state.cart} setView = {this.setView} />
      );
    } else {
      return (
        <div>
          <CheckoutForm order ={this.placeOrder} cart = {this.state.cart} delete = {this.removeItem} items = {cartCount} products = {this.state.cart} setView = {this.setView} />
        </div>
      );
    }

  }
  render() {
    const cartCount = this.state.cart.length;
    return (
      <div >
        <Header items = {cartCount} setView = {this.setView}/>
        <this.listOrDesc />
      </div>

    );
  }
}
