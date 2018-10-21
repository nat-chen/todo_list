import React, { Component } from 'react';
import './App.css';
import './reset.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import AV from 'leancloud-storage'
import UserDialog from './UserDialog';

// var Todo = AV.Object.extend('Todo');
// var todo = new Todo();
// todo.set('title', '工程师周会');
// todo.set('content', '每周工程师会议，周一下午2点');
// // 只要添加这一行代码，服务端就会自动添加这个字段
// todo.set('location','会议室');

// todo.save().then(function (todo) {
//   // 成功保存之后，执行其他逻辑
//   console.log('success');
// }, function (error) {
//   // 异常处理
//   console.error(error)
//   console.log('failure');
// });


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [],
    }
  }
  componentDidUpdate() {
  }

  toggle(event, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state)
  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList,
    })
  }

  addTodo(event) {
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false,
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList,
    });
  }

  delete(event, todo) {
    todo.deleted = true;
    this.setState(this.state);
  }

  render() {
    let todos = this.state.todoList.map((item, index) => {
      if (!item.deleted) {
        return (
          <li key={index}>
            <TodoItem 
              todo={item} 
              onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </li>
        )
      }
    });

    return (
      <div className="app">
        <h1>待办事项</h1>
        <div className="inputWrapper">
          <TodoInput 
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">{todos}</ol>
        <UserDialog />
      </div>
    ) 
  }
}


let id = 0;

function idMaker() {
  id += 1;
  return id;
}
export default App;