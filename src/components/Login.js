import { Alert } from "react-bootstrap";
import React, { useState, useContext } from "react"
import { Modal, Button } from "react-bootstrap"
import AuthContext from "./context/auth-context";

import './Login.css'

function Login(props) {
  const [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [signup, setSignup] = useState("false")
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext);



  const handleClose = () => setShow(false);

  const changeAuthMode = (mode) => {
    setAuthMode(mode)
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("")

  }

  const handleLogin = (e) => {

    e.preventDefault();
    if (authMode === 'signin') {
      let credentials = {
        username: username,
        password: password
      }

      fetch('http://localhost:8080/api/customer/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Invalid credentials")

        })
        .then((data) => {

          login(data);
        })

        .catch(err => {
          console.log(err)
          setError(err)
        }
        )

    }

  }

  const handleAdminLogin = (e) => {

    e.preventDefault();
    if (authMode === 'admin') {
      let credentials = {
        username: username,
        password: password
      }

      fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.ok) {

            return res.json();
          }
        })
        .then((data) => {
          login(data);
        })

        .catch(err => setError(err))

    }
  }

  const handleSignup = (e) => {

    e.preventDefault();

    if (authMode === 'signup') {
      let credentials = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        username: username,
        password: password
      }

      fetch('http://localhost:8080/api/customer/create', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.ok) {
            setSignup(true)
            setShow(true)
            setUsername("");
            setPassword("");
            setAuthMode('signin')
            return res.json();
          }
        })
        .then((data) => {
          console.log(data)
        })
        .catch(err => setError(err))



    }


  }




  if (authMode === "signin") {
    return (<>

      {signup && <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>You succesfully created an account. Please login with your credentials</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      }
      <div className="Auth-form-container">
        <form onSubmit={handleLogin} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={() => changeAuthMode('signup')}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required
              />
            </div>
            {/* {error && <Alert variant="danger" >{error}</Alert>} */}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="text-center">
              Are you an Admin?{" "}
              <span className="link-primary" onClick={() => changeAuthMode('admin')}>
                Login here!
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
    )
  }

  if (authMode === "admin") {
    return (
      <div className="Auth-form-container">
        <form onSubmit={handleAdminLogin} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Admin Login</h3>
            <div className="text-center">
              Not an Admin?{" "}
              <span className="link-primary" onClick={() => changeAuthMode('signin')}>
                Go Back
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (


    < div className="Auth-form-container" >
      <form onSubmit={handleSignup} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => changeAuthMode('signin')}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Enter your lastname"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Enter your desired username"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div >

  )
}

export default Login