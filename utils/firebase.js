import config from "../config";
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebaseConfig);
}

export default firebase;
