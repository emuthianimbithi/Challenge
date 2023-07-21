import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [joke, setJokes] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = () => {
    const items = JSON.parse(localStorage.getItem("Saved"));
    setJokes(items);
  };

  return (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          handleShow();
          fetchJokes();
        }}
        style={buttonStyles}
      >
        Profile
      </Button>

      <Modal
        centered={true}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Saved Jokes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {joke.map((text, index) => (
            <p key={index} style={styles.paragraph}>
              <u>
                <h5>Joke: {index + 1}</h5>
              </u>
              {text.item}
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;

const styles = {
  container: {
    margin: "20px",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
  },
  paragraph: {
    margin: "10px 0",
    fontSize: "16px",
    lineHeight: "1.6",
    border: "1px solid #ccc",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    borderRadius: "5px",
  },
};

const buttonStyles = {
  border: "none",
  backgroundColor: "transparent",
  outline: "none",
  boxShadow: "none",
  textDecoration: "none",
};
