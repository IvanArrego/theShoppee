import React from 'react';
import Header from './header';
import ProductList from './product-list-item';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import CartCheckoutSummary from './checkout-cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
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
      method: 'DELETE'
    };
    const cartState = [...this.state.cart];
    const updatedCart = cartState.filter(cartItems =>
      cartItems.id !== id
    );
    fetch('/api/cart/' + id, cartItem)
      .then(() => { this.setState({ cart: updatedCart }); });

  }
  placeOrder(order) {
    const checkoutCart = {
      method: 'POST',
      body: JSON.stringify({ cart: this.state.cart, name: order.name, address: order.address, creditCard: order.creditCard }),
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

    if (this.state.view.name === 'catalog') {
      return (
        <ProductList products = {this.state.products} setView = {this.setView}/>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails setView = {this.setView} viewId = {this.state.view.params.id} addProduct = {this.addToCart} />
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary delete = {this.removeItem} items = {cartCount} products = {this.state.cart} setView = {this.setView} />
      );
    } else {
      return (
        <div>
          <CartCheckoutSummary delete = {this.removeItem} items = {cartCount} products = {this.state.cart} setView = {this.setView} />
          <CheckoutForm items = {cartCount} products = {this.state.cart} cart = {this.state.cart} setView = {this.setView} order ={this.placeOrder} />
        </div>
      );
    }

  }
  render() {
    const cartCount = this.state.cart.length;
    return (
      <div className="container">
        <Header items = {cartCount} setView = {this.setView}/>
        <this.listOrDesc />
      </div>

    );
  }
}
