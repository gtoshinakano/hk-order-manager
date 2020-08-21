import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';

const config = {
  apiKey: "AIzaSyDPb1nbYcG7_DjvEGt2Be91TVdU3f0FRJU",
  authDomain: "associados-hokkaido.firebaseapp.com",
  databaseURL: "https://associados-hokkaido.firebaseio.com",
  projectId: "associados-hokkaido",
  storageBucket: "associados-hokkaido.appspot.com",
  messagingSenderId: "835296829422",
  appId: "1:835296829422:web:d4a38087b4408ce2"
}

try{
  firebase.initializeApp(config);

}catch(err){
  console.log(err);
}




export default firebase
