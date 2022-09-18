import React from 'react';
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const auth = getAuth(app)

function App() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
 


  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

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
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      console.error(error);
      
    })

    event.preventDefault();
  }

  return (
    <div className='container w-50 mx-auto mt-5'>
     
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />

            <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
            </Form.Control.Feedback>

          </Form.Group>

          <p className="text-danger">{error}</p>
        
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      
    </div>
  );
}

export default App;