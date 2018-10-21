import React, { Component } from 'react';
import './TodoInput.css';

export default class TodoInput extends Component {
  submit(event) {
    if (event.key === 'Enter') {
      this.props.onSubmit(event);
    }
  }

  changeTitle(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      <input type="text"
        className="TodoInput"
        value={this.props.content}
        onKeyPress={this.submit.bind(this)}
        onChange={this.changeTitle.bind(this)} />
    )
  }
}