import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin, twitterLogin} from '../actions/userAction';

class Login extends Component {
  componentWillMount() {
    if(this.props.user !== null) {
      this.props.history.push('/');
    } 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== null) {
      nextProps.history.push('/');
    }
  }
  render() {
    return(
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-sm-12 jumbotron" style={{marginTop: '-20px'}}>
            <h1>Diary | {new Date().getFullYear()} </h1>
            <h2><i>Login with your social network</i></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button className="btn btn-danger btn-lg" onClick={this.props.googleLogin}>Login with google</button>
          </div>
          <br/>
          <div className="col-sm-6">
            <button className="btn btn-primary btn-lg" onClick={this.props.twitterLogin}>Login with twitter</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {googleLogin, twitterLogin})(Login);