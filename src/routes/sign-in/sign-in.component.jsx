import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user)
    await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign in Page</h1>
      <Button onClick={logGoogleUser} buttonType={'google'}>
        Sign in with Google Account
      </Button>

      <SignUpForm></SignUpForm>
    </div>
  )
}

export default SignIn;