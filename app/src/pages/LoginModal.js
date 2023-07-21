import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Container } from "react-bootstrap";
import { LogIn } from "../components/Check";
import Alert from "react-bootstrap/Alert";

function LoginModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUserNotExistModal, setShowUserNotExistModal] = useState(false);
  const [showSessionInProgress, setShowSessionInProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [sessions, setSessions] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("Sessions", JSON.stringify(sessions));
  }, [sessions]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existingSessions = JSON.parse(localStorage.getItem("Sessions"));

    if (!LogIn(email, password)) {
      setShowUserNotExistModal(true);
      return;
    }
    if (existingSessions.length > 0 ) {
      setShowSessionInProgress(true);
      return;
    }
    const updatedSessions = [...existingSessions, email];

    setSessions(updatedSessions);
    setEmail("");
    setPassword("");
    handleClose();
  };

  return (
    <>
      <Button
        variant="outline-light"
        onClick={handleShow}
        style={{ border: "none" }}
      >
        Log in
      </Button>

      <Modal
        centered="true"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log in Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-center align-items-center">
            <div className="login-form-container">
              <Form
                className={`p-4 pt-2 border rounded shadow`}
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
                <Button variant="primary" type="submit" className="mt-3">
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

      <Modal
        centered="true"
        show={showUserNotExistModal}
        onHide={() => setShowUserNotExistModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Session in Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>Your email or password are wrong.</p>
            <p>Please Sign Up first if you haven't.</p>
            <hr />
            <p className="mb-0">
              If you don't fix this....Chuck will find you and round house kick
              your face off. CHEERS ; )
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUserNotExistModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered="true"
        show={showSessionInProgress}
        onHide={() => setShowSessionInProgress(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>There is a session in progress</p>
            <p>Let the guy finish man!!!</p>
            <hr />
            <p className="mb-0">
              If you don't fix this....Chuck will find you and round house kick
              your face off. CHEERS ; )
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSessionInProgress(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
