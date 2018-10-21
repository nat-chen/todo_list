import React, { Component } from 'react';
import './TodoItem.css';

export default class TodoItem extends Component {
  toggle(event) {
    this.props.onToggle(event, this.props.todo);
  }
  delete(event) {
    this.props.onDelete(event, this.props.todo);
  }

  render() {
    return (
      <div className="TodoItem">
        <input type="checkbox"   
          checked={this.props.todo.status === 'completed' }
          onChange={this.toggle.bind(this)} />
          <span className="title">{this.props.todo.title}</span>
        <button onClick={this.delete.bind(this)}>删除</button>
      </div>
    )
  }
}