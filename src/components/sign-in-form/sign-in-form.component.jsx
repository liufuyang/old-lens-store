import {useContext, useState} from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
  displayName: '', email: '', password: '', confirmPassword: '',
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const {setCurrentUser} = useContext(UserContext)

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value}) // only update a single field
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // DO not let the form do stuff on its own

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(user)
      setCurrentUser(user)
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          alert(error.code)
      }
      console.error(error)
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user)
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'} value={email}/>

        <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                   value={password}/>

        <div className={'buttons-container'}>
          <Button type={'submit'}> Sign in</Button>
          {/* button type will not submit form */}
          <Button type={'button'} onClick={signInWithGoogle} buttonType={'google'}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>)
}

export default SignInForm;