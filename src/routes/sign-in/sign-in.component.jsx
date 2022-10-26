import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user)
    await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Account
      </button>
    </div>
  )
}

export default SignIn;