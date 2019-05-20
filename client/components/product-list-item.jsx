import React from 'react';

function ProductListItem(props) {
  return (
    <div className = "card">
      <img className = "card-img-top" src = {props.image}></img>
      <div className ="card-body">
        <h2 className = "card-title">{props.name}</h2>
        <h4 className = "card-text">{ ' $' + props.price}</h4>
        <p className = "card-text">{props.desc}</p>
      </div>
    </div>
  );
}

function ProductList(props) {
  const productItem = props.products.map(prod => {
    return (
      <div className="col-md-4" key = {prod.id}>
        <ProductListItem
          name = {prod.name}
          price = {prod.price}
          image = {prod.image}
          desc = {prod.shortDescription}
        /></div>

    );

  });
  return (
    <div className = "row">
      {productItem}
    </div>
  );
}

export default ProductList;
