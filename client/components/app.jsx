import React from 'react';
import Header from './header';
import ProductList from './product-list-item';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {

        }
      }
    };
    this.setView = this.setView.bind(this);
    this.listOrDesc = this.listOrDesc.bind(this);
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch('/api/products.php')
      .then(response => response.json())
      .then(newProducts => this.setState({
        products: this.state.products.concat(newProducts)
      }));
  }

  setView(name, params) {
    this.setState({
      view: { name: name, params: params }
    });
  }
  listOrDesc() {
    if (this.state.view.name === 'catalog') {
      return (
        <ProductList products = {this.state.products} setView = {this.setView}/>
      );
    } else {
      return (
        <ProductDetails setView = {this.setView}/>
      );
    }

  }

  render() {

    return (
      <div className="container">
        <Header/>
        <this.listOrDesc/>
      </div>

    );
  }
}
