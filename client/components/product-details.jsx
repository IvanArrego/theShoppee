import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  getProductID() {
    fetch('/api/products.php?id=1')
      .then(response => response.json())
      .then(productID => this.setState({
        product: productID
      }));
  }

  componentDidMount() {
    this.getProductID();
  }

  render() {
    if (this.state.product === 1) {
      return (
        <div>{this.state.product}</div>
      );
    } else {
      return (
        <div>Loading</div>
      );
    }

  }

}
