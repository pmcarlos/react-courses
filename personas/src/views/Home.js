import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from '../actions';
import UserItem from '../components/UserItem';
import { RingLoader } from 'react-spinners';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';


class Home extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.getUsers();
  }
  render() {
    let users = [];

    if(this.props.users.data) {
      users = this.props.users.data.map((val, index, array) => {
        return (
          <UserItem 
            key={index}
            name={val.name}
            last_name={val.last_name}
            facebook={val.facebook}
            id={val.id}
          />
        );
      });
    }

    if(this.props.users.type == "START_GET_USERS") {
      return(
        <div className="Home-preLoader">
          < RingLoader 
          color="#fff"
          loading={ true }/>
        </div>
        
      )
    }

    return(
      <div className="Home">
        { users }
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.getUsers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);