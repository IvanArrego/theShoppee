import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  getProductID() {
    fetch('/api/products.php/?id=' + this.props.id)
      .then(response => response.json())
      .then(product => {
        this.setState({
          product
        });
      });
  }

  componentDidMount() {
    this.getProductID();

  }

  render() {
    if (this.state.product == null) {
      return null;
    } else {
      const imageStyle = {
        height: '500px'
      };
      const realPrice = this.state.product.price / 100;
      return (
        <div className = "card">
          <button onClick = {() => this.props.setView('catalog', {})} className = "btn btn-success">Go back</button>
          <img className = "card-img-top" style ={imageStyle}src = {this.state.product.image}></img>
          <div className ="card-body">
            <h2 className = "card-title">{this.state.product.name}</h2>
            <h4 className = "card-text">{ ' $' + realPrice.toFixed(2)}</h4>
            <p className = "card-text">{this.state.product.shortDescription}</p>
            <p className = "card-text">{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    }

  }

}
