import React from 'react';

export default class CheckoutForm extends React.Component {

  render() {
    return (
      <form>
        <label>
          <input className = "form-control" type="text" placeholder = "Name" name = 'name'></input>
          <input className = "form-control" type="number" placeholder = "Credit Card" name = 'Credit Card'></input>
          <input className = "form-control" type="text" placeholder = "Address 1" name = 'Address1'></input>
        </label>
        <input className = "btn btn-success" type="submit" value="Submit"></input>
        <input className = "btn btn-danger" type="reset" value="Reset"></input>
      </form>
    );
  }
}
