import React, { Component } from 'react';
import './UserDialog.css';
import { signUp, signOut, signIn, sendPasswordResetEmail} from './leanCloud';

export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'signUp',
      selectedTab: 'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: '',
      }
    }
  }

  switch(event) {
    this.setState({
      selected: event.target.value
    })
  }

  signUp(event) {
    event.preventDefault();
    let { email, username, password } = this.state.formData;
    let success = user => this.props.onSignUp.call(null, user);
    let error = error => {
      switch(error.code) {
        case 202:
          alert('用户名已被占用, 请重新命名');
          break;
        default: 
          console.log(error);
          break;
      }
    };
    signUp(email, username, password, success, error);
  }

  signIn(event) {
    event.preventDefault();
    let { username, password } = this.state.formData;
    let success = user => this.props.onSignIn.call(null, user);
    let error = error => {
      switch(error.code) {
        case 210:
          alert('用户名或密码不匹配');
          break;
        default: 
          console.log(error);
          break;
      }
    };
    signIn(username, password, success, error);
  }

  changeFormData(key, event) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key] = event.target.value;
    this.setState(stateCopy) 
  }

  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.selectedTab = 'forgotPassword';
    this.setState(stateCopy);
  }

  resetPassword(event) {
    event.preventDefault();
    sendPasswordResetEmail(this.state.formData.email)
  }

  returnToSignIn() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.selectedTab = 'signInOrSignUp';
    this.setState(stateCopy);
  }

  render() {
    let signUpForm = (
      <form className="signUp"
        onSubmit={this.signUp.bind(this)}>
        <div className="row">
          <label>邮箱</label>
          <input type="text" 
            value={this.state.formData.email}
            onChange={this.changeFormData.bind(this, 'email')}></input>
          <label>用户名</label>
          <input type="text"
            value={this.state.formData.username}
            onChange={this.changeFormData.bind(this, 'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password"
            value={this.state.formData.password}
            onChange={this.changeFormData.bind(this, 'password')} />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
    );

    let signInForm = (
      <form className="signIn"
        onSubmit={this.signUp.bind(this)}>
        <div className="row">
          <label>用户名</label>
          <input type="text"
            value={this.state.formData.username}
            onChange={this.changeFormData.bind(this, 'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password"
            value={this.state.formData.password}
            onChange={this.changeFormData.bind(this, 'password')} />
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
          <a href="#" onChange={this.showForgotPassword.bind(this)}>忘记密码了?</a>
        </div>
      </form>
    );

    let signInOrSignUp = (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <input type="radio"
              value="signUp"
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}
            />注册
          </label>
          <label>
            <input type="radio"
              value="signIn"
              checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this)}
            />登录
          </label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ? signUpForm  : null}
          {this.state.selected === 'signIn' ? signInForm : null}
        </div>
      </div>
    );

    let forgotPassword = (
      <div className="forgotPassword">
        <h3>重置密码</h3>
        <form className="forgotPassword" 
          onSumbit={this.resetPassword.bind(this)}>
          <div className="row">
            <label>邮箱</label>  
            <input type="email"
              value={this.state.formData.email} 
              onChange={this.changeFormData.bind(this, 'email')}/>
          </div>
          <div className="row actions">
            <button type="submit">发送重置邮件</button>
            <a href="#" onClick={this.returnToSignIn.bind(this)}>
              返回登录
            </a>
          </div>  
        </form>
      </div>
    )

    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {
            this.state.selectedTab === 'signInOrSignUp' ?
            signInOrSignUp :
            forgotPassword 
          }
        </div>
      </div>
    )
  }
}