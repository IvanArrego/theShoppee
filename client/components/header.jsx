import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className="header-font pointer-hover noselect" onClick={() => this.props.setView('home', { })}>Shoppee</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><i className="fas fa-home fa-lg pointer-hover" onClick={() => this.props.setView('home', { })}></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="pointer-hover" onClick={() => this.props.setView('catalog', { })}><i className="fas fa-store fa-lg"></i>Catalog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="pointer-hover" onClick={() => this.props.setView('cart', { })}><i className="fas fa-shopping-cart fa-lg d-inline-block"></i><div className="cart-quantity d-inline-block pl-1 pr-1">{this.props.items}</div></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
