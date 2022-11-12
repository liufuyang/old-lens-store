import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

// passing createContext the default value will create the user in context
export const UserContext = createContext(
  {
    currentUser: null,
    setCurrentUser: (v) => {
    },
  }
)

// every context created, has a provider
// children is whatever wrapped inside UserProvider
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = {currentUser, setCurrentUser}

  useEffect(() => {
    // centralize user authentication
    return onAuthStateChangedListener((user) => {
      if (user) { // if authed, try created user if it is a new one
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user); // user is null when signed out
    }); // call back to run when unmount
  }, []); // run once

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}