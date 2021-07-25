import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config =  {
    apiKey: "AIzaSyD2Y-F0r54Y5lwJLoAbiRLMyFgy8yuIQTw",
    authDomain: "crown-db-e4960.firebaseapp.com",
    projectId: "crown-db-e4960",
    storageBucket: "crown-db-e4960.appspot.com",
    messagingSenderId: "928090120691",
    appId: "1:928090120691:web:81b14d5978e1af3de03286",
    measurementId: "G-N6SS7M112D"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;