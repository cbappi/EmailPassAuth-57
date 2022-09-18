import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = event => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!/(?=^.{6,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/.test(password)) {
      setError('Password Should contain at least one special character, one numeric character, one upper case, one lower case');
      return;
    }

    setValidated(true);
    console.log('dsffsf : ' + email, password)



if(registered){
  signInWithEmailAndPassword(auth, email, password)
  .then(result => {
    const user = result.user;
    console.log(user);
  })
  .catch(error => {
    console.error(error);
    setError(error.message);
  })
}
else{
  createUserWithEmailAndPassword(auth, email, password)
  .then(result => {
    const user = result.user;
    console.log(user);
    setEmail('');
    setPassword('');
    verifyEmail();

  })
  .catch(error => {
    console.error(error);
    setError(error.message);

  })

}
    event.preventDefault();

  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

 

const verifyEmail=()=>{
sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log('Email verification sent!')
    
  });
}


  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent')
      })
  }


  return (
    <div>
      <h2 className="text-primary text-center">Please {registered?'Login':'Register'} !!</h2>
      <div className="registration w-50 mx-auto mt-5">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
            Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid password.
           </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>


          <p className="text-danger">{error}</p>

          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <br />
          
          <Button variant="primary" type="submit">
            {registered?'Login':'Register'}
          </Button>
        </Form>

      </div>

    </div>
  );
}

export default App;
