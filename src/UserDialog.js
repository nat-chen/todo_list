import React, { Component } from 'react';
import './UserDialog.css';
import { signUp, signOut, signIn, sendPasswordResetEmail} from './leanCloud';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInOrSignUp from './SignInOrSignUp';


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
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {
            this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)} />
            :
            <ForgotPasswordForm 
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)} /> 
          }
        </div>
      </div>
    )
  }
}