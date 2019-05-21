import React from 'react';

function ProductListItem(props) {
  const imageStyle = {
    height: '250px'
  };
  const realPrice = props.price / 100;
  return (
    <div className = "card">
      <img className = "card-img-top" style ={imageStyle}src = {props.image}></img>
      <div className ="card-body">
        <h2 className = "card-title">{props.name}</h2>
        <h4 className = "card-text">{ ' $' + realPrice.toFixed(2)}</h4>
        <p className = "card-text">{props.desc}</p>
        <button onClick = {() => props.setView('details', { id: props.id })} className = "btn btn-success">Details</button>
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
          setView = {props.setView}
          id = {prod.id}
        />
      </div>

    );

  });
  return (
    <div className = "row">
      {productItem}
    </div>
  );
}

export default ProductList;
