import firebase from 'firebase/app';
// import 'firebase/database'; realtime db

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCqJkDKUOrn2xX_B-lfrAdKgc6Ho46ULkY',
  authDomain: 'ionic-recipes-6daa6.firebaseapp.com',
  databaseURL: 'https://ionic-recipes-6daa6.firebaseio.com',
  projectId: 'ionic-recipes-6daa6',
  storageBucket: 'ionic-recipes-6daa6.appspot.com',
  messagingSenderId: '168946296835',
  appId: '1:168946296835:web:25f6f518789934bb22c636',
  measurementId: 'G-ZHZ6D6593P'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// realtime db
// export const db = firebase.database();

export const generateUserDocument = async (user:any) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        userId: user.uid,
        firstName: '',
        secondName: '', 
        favoriteChiefs: [],
        favoriteCuisines: []
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid: string) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const updateUserDocument = async (user: any, additionalInfo: any) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const { email, displayName, photoURL, firstName, secondName, favoriteChiefs, favoriteCuisines } = user;

    let newData = {};

    if (additionalInfo.firstName) {
      newData = {
        firstName: additionalInfo.firstName,
      }
    } else if (additionalInfo.secondName) {
      newData = {
        secondName: additionalInfo.secondName,
      }
    } else if (additionalInfo.photoURL) {
      newData = {
        photoUrl: additionalInfo.photoUrl,
      }
    } else if (additionalInfo.favoriteCuisines) {
      const array = [...additionalInfo.favoriteCuisines];
      console.log(favoriteCuisines);
      newData = {
        favoriteCuisines: array,
      }
    } else if(additionalInfo.favoriteChiefs) {
      const array = [...additionalInfo.favoriteCuisines];

      newData = {
        favoriteCuisines: array,
      }
    }

    try {
      await userRef.set(newData, { merge: true });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
};
