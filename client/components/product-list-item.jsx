import React from 'react';

function ProductListItem(props) {
  const imageStyle = {
    height: '250px'
  };
  const shadow = {
    boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
    textAlign: 'center'

  };
  const cardStyle = {
    height: '250px'
  };
  const buttonStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    bottom: '0%'
  };
  const realPrice = props.price / 100;
  return (
    <div className="card" style={shadow}>
      <img className="card-img-top" style={imageStyle} src={props.image}></img>
      <div className="card-body" style={cardStyle}>
        <h2 className="card-title">{props.name}</h2>
        <h4 className="card-text">{ ' $' + realPrice.toFixed(2)}</h4>
        <p className="card-text">{props.desc}</p>
        <button type="button" style={buttonStyle} onClick={()=>props.setView('details', { id: props.id })} className="btn btn-block btn-info">Details</button>
      </div>
    </div>
  );
}

function ProductList(props) {
  let message = {
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: '1%',
    fontFamily: 'gameFont',
    color: 'black',
    fontSize: '50px'

  };
  let cardSpacing = {
    paddingBottom: '1%'
  };
  const productItem = props.products.map(prod => {
    return (
      <div style={cardSpacing} className="col-md-3" key={prod.id}>
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
    <div>
      <div style={message}>Welcome to our shop traveler! Here you will find rare and powerful items to help you along your quest. Please note that there is a limit of one of each item per order.</div>
      <div className="row">
        {productItem}
      </div>
    </div>
  );
}

export default ProductList;
