import * as firebase from 'firebase';
import aws from '../config/aws';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { Alert } from 'react-native';

let updateInterval;

export function login(user){
  console.log('user loggeind', user)
  return function(dispatch){
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: ' ',
      chats: ' ',
      geocode: ' ',
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: {
        [user.uid]: false
      },
      token: ' ',
    }
    
    firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
      if(snapshot.val() !== null){
        dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
      } else {
        firebase.database().ref('cards/' + user.uid ).update(params);
        dispatch({ type: 'LOGIN', user: params, loggedIn: true });
      }
    });

  }
}

export function uploadImages(images) {
  return async function(dispatch) {
    //ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(result){
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false });
    var array = images || []
    if(result.uri != undefined){
      let name = result.uri;
      name = name.split('/');
      name = name[name.length-1]
      console.log('name', name)
      const file = {
        uri: result.uri,
        name: name,
        type: "image/png"
      }
  
      const options = {
        keyPrefix: "uploads/",
        bucket: "tinderapp-native",
        region: "us-east-2",
        accessKey: aws.accessKey,
        secretKey: aws.secretKey,
        successActionStatus: 201
      }
      console.log('resultpic', result, file)
      RNS3.put(file, options).then(function(response){
        console.log('response',response);
        if (response.status === 201){
          array.push(response.body.postResponse.location)
          firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
          dispatch({ type: 'UPLOAD_IMAGES', payload: array });
        }
      })
    }
    
    //})
  }
}

export function logout(){
	return function(dispatch){
    firebase.auth().signOut()
    dispatch({ type: 'LOGOUT', loggedIn: false });
   }
}

export function deleteImage(images, key){
	return function(dispatch){
    Alert.alert(
      'Are you sure you want to Delete',
      '',
      [
        {text: 'Ok', onPress: () => {
          var array = images
          array.splice(key, 1)
          array = array.length
          firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
    			dispatch({ type: 'UPLOAD_IMAGES', payload: array });
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
      { cancelable: true }
    )
	}
}

export function updateAbout(value){
	return function(dispatch){
    dispatch({ type: 'UPDATE_ABOUT', payload: value });
    clearTimeout(updateInterval);
    updateInterval = setTimeout(function(){  
      firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({ aboutMe: value });
      console.log('aboutupdate');
    }, 2500);
  }
}

export function getCards(){
	return function(dispatch){
		firebase.database().ref('cards').once('value', (snap) => {
		  var items = [];
		  snap.forEach((child) => {
		    item = child.val();
        item.id = child.key;
		    items.push(item); 
		  });
		  dispatch({ type: 'GET_CARDS', payload: items });
		});
	}
}