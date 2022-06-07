import "./App.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState(' ')
  const [pass, setPass] = useState(' ')
  const [validated, setValidated] = useState(false);
// Email value triger
const handleonBlurEmail = e =>{
  setEmail(e.target.value);
  // password triger
}
const handleonBlurPass = e =>{
  setPass(e.target.value);
}
const handleOnSubmit = event =>{
  // submit validated
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  setValidated(true);
  // console.log('Form submitted', 'Email:', email, 'Password:' ,pass);
  createUserWithEmailAndPassword(auth, email, pass)
  .then(result=>{
    const user = result.user;
    console.log(user);
  })
  .catch(error=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  })
  event.preventDefault();
}


  return (
    <div>
      <h1 style={{textAlign:'center'}}>Registration with User Password Login</h1>
      <div className="w-50 mx-auto mt-5 border border-info p-4">
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleonBlurEmail} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handleonBlurPass} type="password" placeholder="Password" required/>
            <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
            
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
