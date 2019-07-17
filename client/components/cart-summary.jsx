import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem() {
    this.props.onDelete(this.props.id);
  }
  render() {
    const imageStyle = {
      height: '250px'
    };
    const cardStyle = {
      height: '250px'
    };
    const realPrice = parseInt(this.props.price / 100);

    return (

      <div className = "card">
        <img className = "card-img-top" style = {imageStyle} src = {this.props.image}></img>
        <div className ="card-body" style = {cardStyle} >
          <h2 className = "card-title">{this.props.name}</h2>
          <h4 className = "card-text">{ ' $' + realPrice.toFixed(2)}</h4>
          <p className = "card-text">{this.props.desc}</p>

        </div>
        <button className="btn btn-danger" onClick = {this.deleteItem}>Delete</button>
      </div>
    );
  }
}

function CartSummary(props) {
  if (props.items >= 1) {
    const cartItems = props.products.map(prod => {

      return (
        <div className="col-md-4" key = {prod.id}>
          <CartSummaryItem
            name = {prod.name}
            price = {prod.price}
            image = {prod.image}
            desc = {prod.shortDescription}
            setView = {props.setView}
            id = {prod.id}
            onDelete = {props.delete}
          />
        </div>

      );

    });
    let itemTotal = 0;
    for (let item of cartItems) {

      let prices = parseInt(item.props.children.props.price);
      itemTotal += prices;
    }
    let totalPrice = '$' + itemTotal / 100;
    return (

      <div>
        <h2>Cart Summary</h2>
        <h3>Total Price:{totalPrice} <button onClick = {() => props.setView('checkout', { })}>Checkout</button> </h3>
        <button onClick = {() => props.setView('catalog', { })}>Back to Catalog</button>
        <br></br>
        <div className = "row">
          {cartItems}
        </div>
      </div>
    );
  } else {
    return (
      <div className = "row">
        <div>Cart is empty</div>
        <button onClick = {() => props.setView('catalog', { })}>Back to Catalog</button>
      </div>
    );
  }

}

export default CartSummary;
