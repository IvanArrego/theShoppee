import React from 'react';

function CartSummaryItem(props) {
  const imageStyle = {
    height: '250px'
  };
  const cardStyle = {
    height: '200px'
  };

  const realPrice = props.price / 100;
  return (
    <div className = "card" >
      <img className = "card-img-top" style = {imageStyle} src = {props.image}></img>
      <div className ="card-body" style = {cardStyle} >
        <h2 className = "card-title">{props.name}</h2>
        <h4 className = "card-text">{ ' $' + realPrice.toFixed(2)}</h4>
        <p className = "card-text">{props.desc}</p>
      </div>
    </div>
  );
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
          />
        </div>

      );

    });
    let itemTotal = 0;
    for (let item of cartItems) {

      let prices = item.props.children.props.price;
      itemTotal += prices;
    }
    let totalPrice = '$' + itemTotal / 100;
    return (

      <div>
        <h2>Cart Summary</h2>
        <h3>Total Price:{totalPrice} </h3>
        <button onClick = {() => props.setView('catalog', { })}>Back to Catalog</button>
        <div className = "row">
          {cartItems}
        </div>
      </div>
    );
  } else {
    const cartItems = props.products.map(prod => {
      return (
        <div key = {prod.id}>Empty</div>
      );
    }
    );

    return (
      <div className = "row">
        {cartItems}
      </div>
    );
  }

}

export default CartSummary;
