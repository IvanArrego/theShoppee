import React from 'react';
import Header from './header';
import ProductList from './product-list-item';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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

  render() {

    return (
      <div className="container">
        <Header/>
        <ProductList products = {this.state.products}/>
      </div>

    );
  }
}
