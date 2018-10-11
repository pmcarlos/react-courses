import React from 'react';
import styles from '../styles'
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

class Matches extends React.Component {
  state = {
    chats: []
  }

  componentWillMount() {
    firebase.database().ref('cards/' + this.props.user.id + '/chats').on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        item = child.val();
        items.push(item); 
      });
      this.setState({ chats: items.reverse() });
    });
  }

  render() {
    return (
     <View style={styles.container}>
      <ScrollView>
        {this.state.chats.map((uri, key)=>{
          return (
            <TouchableOpacity key={key} style={styles.imgRow} >
              <Image style={styles.img} source={{uri: uri.user.photoUrl}} />
              <Text style={styles.bold}>{uri.user.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
     </View>
    )
  }
}

function mapStateToProps(state) {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(Matches)