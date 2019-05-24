import React from 'react';
function Header(props) {
  return (
    <div>
      <h1 className = "d-inline">Wicked Sales</h1>
      <h1 className = "d-inline"> LOGO</h1>
      <i onClick = {() => props.setView('cart', { })} className = "fas fa-shopping-cart fa-3x">
        <h1 className = "d-inline">{props.items}</h1>
      </i>
    </div>

  );
}
export default Header;
