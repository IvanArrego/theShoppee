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
        height: '300px',
        display: 'inline-block',
        width: '600px'
      };
      const cardBodyStyle = {
        width: '600px'
      };
      const inlineStyle = {
        display: 'inline-block'
      };
      const realPrice = this.state.product.price / 100;
      return (

        <div>
          <button onClick = {() => this.props.setView('catalog', {})} className = "btn btn-success">Go back</button>
          <div className = "card" style = {cardBodyStyle}>
            <img className = "card-img-top" style ={imageStyle} src = {this.state.product.image}></img>
            <h2 className = "card-title" style ={inlineStyle}>{this.state.product.name}</h2>
            <h4 className = "card-text" style ={inlineStyle}>{ ' $' + realPrice.toFixed(2)}</h4>
            <p className = "card-text" style ={inlineStyle}>{this.state.product.shortDescription}</p>
            <div className ="card-body" >
              <p className = "card-text">{this.state.product.longDescription}</p>
            </div>
            <button onClick = {() => this.props.addProduct(this.state.product)} className = "btn btn-success">Add To Cart</button>
          </div>
        </div>
      );
    }

  }

}
