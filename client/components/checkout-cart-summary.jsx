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
    const realPrice = parseInt(this.props.price / 100);
    return (
      <div className = 'card'>
        <h2 className = "card-title">{this.props.name}</h2>
        <h4 className = "card-text">{ ' $' + realPrice.toFixed(2)}</h4>
        <button className="btn btn-danger" onClick = {this.deleteItem}>Delete</button>
      </div>
    );
  }
}

function CartCheckoutSummary(props) {
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
        <h2>Checkout Summary</h2>
        <h3>Total Price:{totalPrice}</h3>
        <button onClick = {() => props.setView('cart', { })}>Back to Cart</button>
        <br></br>
        <div className = "row">
          {cartItems}
        </div>
      </div>
    );
  } else {
    return (
      <div className = "row">
        <h2>Cart is empty</h2>
        <button onClick = {() => props.setView('catalog', { })}>Back to Catalog</button>
      </div>
    );
  }

}
export default CartCheckoutSummary;
