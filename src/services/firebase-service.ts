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

export const generateUserDocument = async (user: any) => {
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
        photoURL: additionalInfo.photoURL,
      }
    } else if (additionalInfo.favoriteCuisines) {
      const array = [...additionalInfo.favoriteCuisines];

      newData = {
        favoriteCuisines: array,
      }
    } else if (additionalInfo.favoriteChiefs) {
      const array = [...additionalInfo.favoriteChiefs];

      newData = {
        favoriteChiefs: array,
      }
    }

    try {
      await userRef.set(newData, { merge: true });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
};

// create user
export const createUserWithEmailAndPassword = (email: any, password: any) => {
  auth.createUserWithEmailAndPassword(email, password).catch(error => {
    console.error('Error signing in with password and email', error);
  });
};

// sign in user
export const signInWithEmailAndPasswordHandler = (email: any, password: any) => {
  auth.signInWithEmailAndPassword(email, password).catch(error => {
    console.error('Error signing in with password and email', error);
  });
};

// sign out user
export const signOutHandler = () => {
  auth.signOut().then(() => console.log('logged out')).catch(error => {
    console.error('Error signing out', error);
  });;
}

// delete user

export const uploadImage = async (file: any, currentUserId: string) => {
  const storageRef = storage
    .ref('users')
    .child(`${new Date().getTime()}-${currentUserId}.jpeg`);

  const uploadTask = storageRef.putString(file, 'data_url', { contentType: 'image/jpeg' });

  return new Promise((resolve, reject) => {
    //  Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: //or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        //A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);

          resolve(downloadURL);
        });
      });
  })
};