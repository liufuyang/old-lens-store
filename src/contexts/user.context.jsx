import {createContext, useState} from "react";

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
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}