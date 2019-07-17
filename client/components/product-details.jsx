import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  getProductID() {
    fetch('/api/products.php?id=' + this.props.viewId)
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
        width: '600px',
        left: '50%',
        transform: 'translate(-50%)'
      };
      const inlineStyle = {
        display: 'inline-block'
      };
      const realPrice = parseInt(this.state.product[0].price / 100);
      return (

        <div>
          <button onClick = {() => this.props.setView('catalog', {})} className = "btn btn-success">Go back</button>
          <div className = "card" style = {cardBodyStyle}>
            <img className = "card-img-top" style ={imageStyle} src = {this.state.product[0].image}></img>
            <h2 className = "card-title" style ={inlineStyle}>{this.state.product[0].name}</h2>
            <h4 className = "card-text" style ={inlineStyle}>{ ' $' + realPrice.toFixed(2)}</h4>
            <p className = "card-text" style ={inlineStyle}>{this.state.product[0].shortDescription}</p>
            <div className ="card-body" >
              <p className = "card-text">{this.state.product[0].longDescription}</p>
            </div>
            <button onClick = {() => this.props.addProduct(this.state.product)} className = "btn btn-success">Add To Cart</button>
          </div>
        </div>
      );
    }

  }

}
