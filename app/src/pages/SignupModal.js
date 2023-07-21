import React, { useState ,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Container } from "react-bootstrap";

function SignupModal() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    localStorage.setItem("Users", JSON.stringify(users));
  },[users])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirm_password) {
      setPasswordMismatch(true);
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("Users"));

    const user = {
      email : email,
      password : password
    }
    const updatedUsers = [...existingUsers, user];

    setUsers(updatedUsers);
    setEmail("");
    setConfirmPassword("");
    setPassword("");
    setPasswordMismatch(false);
    handleClose();
  };
  return (
    <>
      <Button
        variant="outline-light"
        onClick={handleShow}
        style={{ border: "none" }}
      >
        Sign Up
      </Button>

      <Modal
        centered = "true"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign up Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            className={"d-flex justify-content-center align-items-center "}
          >
            <div className="login-form-container">
              <Form
                className={"p-4 pt-2 border rounded shadow "}
                style={{ minWidth: "300px" }}
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirm_password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={passwordMismatch ? "password-mismatch" : ""}
                  />
                  {passwordMismatch && (
                    <Form.Text className="text-danger">
                      Passwords do not match
                    </Form.Text>
                  )}
                </Form.Group>
                <Button className = "mt-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal;
