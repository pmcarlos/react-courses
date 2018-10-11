import React from 'react';
import styles from '../styles';
import RootNavigator from '../navigation/RootNavigator';

import { connect } from 'react-redux';
import { login, uploadImages } from '../redux/actions'
import * as firebase from 'firebase';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import firebaseConfig from '../config/firebase'

firebase.initializeApp(firebaseConfig);

class Login extends React.Component {
  state = {}
  async componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user)
      if (user != null) {
        this.props.dispatch(login(user))
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1867308913562451', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = await firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        Alert.alert("Try Again")
      });
    }
  }  

  render() {
    if(this.props.loggedIn) {
      return(
        <RootNavigator />
      )
    } else {
      return(
        <View style={[styles.container, styles.center]}>
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return{
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Login)