import React, { Component } from 'react';

export default class TodoItem extends Component {
  toggle(event) {
    this.props.onToggle(event, this.props.todo);
  }
  delete(event) {
    this.props.onDelete(event, this.props.todo);
  }

  render() {
    return (
      <div>
        <input type="checkbox"
          checked={this.props.todo.status === 'completed' }
          onChange={this.toggle.bind(this)} />
          {this.props.todo.title}
        <button onClick={this.delete.bind(this)}>Delete</button>
      </div>
    )
  }
}