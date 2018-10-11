import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class UserItem extends Component {
  constructor() {
    super();
    this.state = {
      isRedirected: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState ({
      isRedirected: true
    })
  }
  render() {
    const { name, last_name, facebook, id } = this.props;
    if(this.state.isRedirected) {
      return (<Redirect to={ "/detail/" + id } />);
    }
    return(

      <div className="card" onClick={ this.onClick }>
        <div className="card-content">
          <div className="UserItem-left-box">
            <img src="http://i.imgur.com/HQ3YU7n.gif" 
            alt="profile pic" 
            className="UserItem-image" />
          </div>
          <div className="UserItem-right-box">
            <h2 className="UserItem-name">{ name + ' ' + last_name  }</h2>
            <h3 className="UserItem-facebook">{ facebook }</h3>
          </div>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  facebook: PropTypes.string
}

export default UserItem;