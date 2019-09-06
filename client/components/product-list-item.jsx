import React from 'react';
import { Row, Button, Card, CardBody, CardImg, CardSubtitle, Col } from 'reactstrap';

function ProductListItem(props) {
  const realPrice = props.price / 100;
  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mt-2 mb-2 d-flex">
      <Card className="card-font text-center shadow-sm">
        <CardImg top width="100%" src={props.image}/>
        <CardBody>
          <CardSubtitle className="h6 text-muted mb-1">{props.name}</CardSubtitle>
          <CardSubtitle className="h5 text-muted mb-1">{ ' $' + realPrice.toFixed(2)}</CardSubtitle>
          <Button className="btn-block" onClick={() => props.setView('details', { id: props.id })}>Details</Button>
        </CardBody>
      </Card>
    </Col>
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

  const productItem = props.products.map(prod => {
    return (
      <ProductListItem
        key={prod.id}
        name = {prod.name}
        price = {prod.price}
        image = {prod.image}
        desc = {prod.shortDescription}
        setView = {props.setView}
        id = {prod.id}
      />
    );
  });
  return (
    <React.Fragment>
      <div style={message}>Welcome to our shop traveler! Here you will find rare and powerful items to help you along your quest. Please note that there is a limit of one of each item per order.</div>
      <Row className="justify-content-md-center mr-1 ml-1">
        {productItem}
      </Row>
    </React.Fragment>
  );
}

export default ProductList;
