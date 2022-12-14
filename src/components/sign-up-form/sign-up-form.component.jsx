import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '', email: '', password: '', confirmPassword: '',
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  // hook into context, when user updates, if lots of component hook onto the same updated context, might result performance issue
  // no needed anymore when using auth observer
  // const {setCurrentUser} = useContext(UserContext)

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value}) // only update a single field
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // DO not let the form do stuff on its own

    if (password !== confirmPassword) {
      alert("password not match")
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      // needed to call createUserDocumentFromAuth here other than rely on the contex is because we need displayName
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      }
      console.error('user password creation encountered an error:', error)
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={'Display Name'} type={'text'} required onChange={handleChange} name={'displayName'}
                   value={displayName}/>

        <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'} value={email}/>

        <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                   value={password}/>

        <FormInput label={'Confirm Password'} type={'password'} required onChange={handleChange}
                   name={'confirmPassword'}
                   value={confirmPassword}/>

        <Button type={'submit'}> Sign up</Button>
      </form>
    </div>)
}

export default SignUpForm;