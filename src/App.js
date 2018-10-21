import React, { Component } from 'react';
import './App.css';
import './reset.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import AV from 'leancloud-storage'
import UserDialog from './UserDialog';
import { getCurrentUser, signOut } from './leanCloud'

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
      user: getCurrentUser() || {},
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

  signOut() {
    signOut();
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = {};
    this.setState(stateCopy);
  }

  onSignUpOrSignIn(user) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = user;
    this.setState(stateCopy);
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
        <h1>{this.state.user.username || '我'} 的待办事项
          { 
            this.state.user.id ? 
            <button onClick={this.signOut.bind(this)}>登出</button> :
            null
          }
        </h1>
        <div className="inputWrapper">
          <TodoInput 
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">{todos}</ol>
        {
          this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)} />
        }
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