import React from 'react';
export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      credit: '',
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.order(this.state);
    this.setState({
      name: '',
      credit: '',
      address: ''
    });
  }
  handleClear() {
    this.setState({
      name: '',
      credit: '',
      address: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset = {this.handleClear}>
        <label>
          <input className = "form-control" type="text" placeholder = "Name" name = 'name' value={this.state.name} onChange={this.handleChange}></input>
          <input className = "form-control" type="number" placeholder = "Credit Card" name = 'credit' value={this.state.credit} onChange={this.handleChange}></input>
          <input className = "form-control" type="text" placeholder = "Address" name = 'address' value={this.state.address} onChange={this.handleChange}></input>
        </label>
        <input className = "btn btn-success" type="submit" value="Submit"></input>
        <input className = "btn btn-danger" type="reset" value="Reset"></input>
      </form>

    );
  }
}
