import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBTvC1THo54siRs2NMrV2zZOD52aeC98Ds",
  authDomain: "small-talk-1-38e71.firebaseapp.com",
  databaseURL: "https://small-talk-1-38e71.firebaseio.com",
  projectId: "small-talk-1-38e71",
  storageBucket: "small-talk-1-38e71.appspot.com",
  messagingSenderId: "27060276522"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider;
export const twitterProvider = new firebase.auth.TwitterAuthProvider;
