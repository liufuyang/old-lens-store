import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'; // getDoc/setDoc is for get/set the data on a doc

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPfoYMZy0xW3bH9IZA5F2k1OfFld_Li-c",
  authDomain: "old-lens-store.firebaseapp.com",
  projectId: "old-lens-store",
  storageBucket: "old-lens-store.appspot.com",
  messagingSenderId: "730683620861",
  appId: "1:730683620861:web:0613d89f8c24aea8b6ed94"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
  .setCustomParameters({
    prompt: 'select_account'
  })

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

// save the logged-in user's info and credentials
export const createUserDocumentFromAuth = async (userAuth) => {
  // get a document reference, even if user is not there, it gives a reference back
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists()) // print false if user is not in db

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await  setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating user: ', error.message);
    }
  }

  return userSnapshot;
}