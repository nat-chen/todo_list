import React, { Component } from 'react';

export default class TodoInput extends Component {
  handleSumbit(event) {
    if (event.key === 'Enter') {
      console.log('用户按回车了')
    }
  }
  render() {
    return (
      <input type="text" 
        defaultValue={this.props.content}
        onKeyPress={this.handleSumbit.bind(this)} />
    )
  }
}