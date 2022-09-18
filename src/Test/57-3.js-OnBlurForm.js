import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const OnBlurForm = () => {

  const handleEmailBlur = event => {
    console.log(event.target.value);
  }

  const handlePasswordBlur = event => {
    console.log(event.target.value);
  }

  const handleFormSubmit = event => {
    console.log("form submitted")
    event.preventDefault();
  }

  return (
    <div className='container w-50 mx-auto mt-5'>
     
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      
    </div>
  );
}

export default OnBlurForm;