import "./App.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState(" ");
  const [error, setError] = useState(" ");
  const [name, setName] = useState(" ");
  const [pass, setPass] = useState(" ");
  const [registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);
  // User value triger
  const handleOnBlurUsername = (e) => {
    setName(e.target.value);
    // password triger
  };
  // Email value triger
  const handleonBlurEmail = (e) => {
    setEmail(e.target.value);
    // password triger
  };
  const handleonBlurPass = (e) => {
    setPass(e.target.value);
  };
  const handleOnchangeRegistered = (event) => {
    setRegistered(event.target.checked);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // submit validated
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // write 'return' to prevent sending this error to firebase
      return;
    }
    // validation condition
    if (!/[0-9]/.test(pass)) {
      setError("Password Should Contains Minimum  One digit!");
      return;
    }
    setValidated(true);
    setError(" ");
    // console.log('Form submitted', 'Email:', email, 'Password:' ,pass);
    if (!registered) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail(" ");
          setError(" ");
          setUserName();
          emailVerify();
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    }
    event.preventDefault();
  };
  const setUserName =()=>{
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      console.log(`Updating name`);
      
    }).catch((error) => {
      // An error occurred
      console.log(error);
      
    });
  }
  const emailVerify = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
  };
  const handlePasswordReset =() =>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    console.log(`Email Sent`);
    
  })
  .catch((error) => {
    console.log(error);
    
    // ..
  });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Please {registered ? "Login" : "Registration"} !
      </h1>
      <div className="w-50 mx-auto mt-5 border border-info p-4">
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>

{/* User Name */}
{ !registered && <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>User name</Form.Label>
            <Form.Control
              onBlur={handleOnBlurUsername}
              type="text"
              placeholder="Enter your name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
          </Form.Group>}
{/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleonBlurEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
          </Form.Group>
{/* password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handleonBlurPass}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleOnchangeRegistered}
              type="checkbox"
              label="If you Already Registered - Click me to Log in"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <button onClick={handlePasswordReset} variant='link' >Forget Password? </button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Registration"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
