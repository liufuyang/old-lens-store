import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

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
      if(error.code === 'auth/email-already-in-user') {
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
      <label>Display Name</label>
      <input type={'text'} required onChange={handleChange} name={'displayName'} value={displayName}/>

      <label>Email</label>
      <input type={'email'} required onChange={handleChange} name={'email'} value={email}/>

      <label>Password</label>
      <input type={'password'} required onChange={handleChange} name={'password'} value={password}/>

      <label>Confirm Password</label>
      <input type={'password'} required onChange={handleChange} name={'confirmPassword'} value={confirmPassword}/>

      <button type={'submit'}> Submit</button>
    </form>
  </div>)
}

export default SignUpForm;