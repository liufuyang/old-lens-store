import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
  displayName: '', email: '', password: '', confirmPassword: '',
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields


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
      const response = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(response.user, {displayName});
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-user') {
        alert('Cannot create user, email already in use')
      }
      console.error('user password creation encountered an error:', error)
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  return (<div>
    <h1>Sign up with email and password</h1>
    <form onSubmit={handleSubmit}>
      <FormInput label={'Display Name'} type={'text'} required onChange={handleChange} name={'displayName'}
                 value={displayName}/>

      <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'} value={email}/>

      <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                 value={password}/>

      <FormInput label={'Confirm Password'} type={'password'} required onChange={handleChange} name={'confirmPassword'}
                 value={confirmPassword}/>

      <button type={'submit'}> Submit</button>
    </form>
  </div>)
}

export default SignUpForm;