import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem() {
    this.props.onDelete(this.props.id);
  }
  render() {
    const realPrice = parseFloat(this.props.price / 100);
    return (
      <div className="mt-3 mb-3">
        <hr/>
        <div className="row align-items-center mt-1 mb-1">
          <img src={this.props.image} alt="" className="col-sm-5 mx-auto"/>
          <div className="col-sm-7">
            <div className="h3 card-font">{this.props.name}</div>
            <div className="h6">{this.props.desc}</div>
            <div className="h6 description-font text-muted">${realPrice.toFixed(2)}</div>
            <button className="btn btn-lg btn-block card-font btn-danger" onClick={this.deleteItem}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

function CartSummary(props) {
  if (props.items >= 1) {
    const cartItems = props.products.map(prod => {
      return (
        <div key = {prod.id}>
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
    let subtotalPrice = (itemTotal / 100).toFixed(2);
    subtotalPrice = parseFloat(subtotalPrice);
    let shipping = 5.00;
    shipping = shipping.toFixed(2);
    shipping = parseFloat(shipping);
    let tax = itemTotal / 100 * 0.0775;
    let taxes = tax.toFixed(2);
    taxes = parseFloat(taxes);
    let totalPrice = subtotalPrice + taxes;
    let totalTaxedPrice = totalPrice + shipping;
    totalTaxedPrice = totalTaxedPrice.toFixed(2);
    totalTaxedPrice = parseFloat(totalTaxedPrice);
    return (
      <Container className="mt-4 mb-4">
        <Row>
          <Col sm="7">
            <div className="h2 card-font">CART <span className="h6 description-font text-muted">{props.items} item(s)</span></div>
            <b>{cartItems}</b>
          </Col>
          <Col sm="5">
            <div className="h2 card-font">SUMMARY</div>
            <hr/>
            <div className="h6 description-font">Subtotal: <span className="float-right">${subtotalPrice.toFixed(2)}</span></div>
            <div className="h6 description-font">Shipping: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart1"/> <span className="float-right">$5.00</span></div>
            <ReactTooltip id="tooltip-cart1" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Shipping is set at a flat-rate of $5.00</span>
            </ReactTooltip>
            <div className="h6 description-font mb-4">Tax: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart2"/> <span className="float-right">${taxes}</span></div>
            <ReactTooltip id="tooltip-cart2" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Sales tax is based on the king&apos;s rate of 7.75%</span>
            </ReactTooltip>
            <hr/>
            <div className="h4 card-font mb-4">TOTAL : <span className="float-right">${totalTaxedPrice}</span></div>
            <button type="button" className="btn btn-lg btn-secondary btn-block card-font" onClick={() => props.setView('catalog', { })}>BACK TO CATALOG</button>
            <button type="button" className="btn btn-lg btn-primary btn-block card-font" onClick={() => props.setView('checkout', { })}>Checkout</button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="mt-4 mb-4">
        <Row>
          <Col>
            <div className="h2 card-font">CART <span className="h6 description-font text-muted">0 item(s)</span></div>
            <b>Your cart is empty</b>
          </Col>
          <Col sm="5">
            <div className="h2 card-font">SUMMARY</div>
            <hr/>
            <div className="h6 description-font">Subtotal: <span className="float-right">$0.00</span></div>
            <div className="h6 description-font">Shipping: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart1"/> <span className="float-right">$0.00</span></div>
            <ReactTooltip id="tooltip-cart1" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Shipping is set at a flat-rate of $5</span>
            </ReactTooltip>
            <div className="h6 description-font mb-4">Tax: <i className="fas fa-question-circle pointer-hover text-warning" href="#" data-tip data-for="tooltip-cart2"/> <span className="float-right">$5</span></div>
            <ReactTooltip id="tooltip-cart2" place="right" type="dark" effect="solid">
              <span className="font-weight-bold">Sales tax is based on Orange County, CA&apos;s rate of 7.75%</span>
            </ReactTooltip>
            <hr/>
            <div className="h4 card-font mb-4">TOTAL : <span className="float-right">$0.00</span></div>
            <button type="button" className="btn btn-lg btn-secondary btn-block card-font" onClick={() => props.setView('catalog', { })}>BACK TO CATALOG</button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default CartSummary;
