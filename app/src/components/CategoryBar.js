import React, { useState, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [joke, setJokes] = useState([]);
  const [save, setSave] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setModalTitle(category);
    setShow(true);
    setLoading(true);
  };

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  useEffect(() => {
    localStorage.setItem("Saved", JSON.stringify(save));
  }, [save]);

  const handleSave = (put) => {
    const email = JSON.parse(localStorage.getItem("Sessions"));
    const existSave = JSON.parse(localStorage.getItem("Saved"));
    const items = {
      email: email,
      item: put,
    };
    const updateItem = [...existSave, items];

    setSave(updateItem);
    fetchJokes(modalTitle);
  };

  const fetchJokes = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`/joke/cat?category=${category}`);
      const jsonData = await response.json();

      if (jsonData.value) {
        setJokes(jsonData);
      } else {
        setJokes({ value: "No joke available for this category." });
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJokes({ value: "Error fetching joke." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
      {categories.map((category) => (
        <Button
          key={category}
          style={{ margin: "5px" }}
          variant="dark"
          onClick={() => {
            handleShow(category);
            fetchJokes(category);
          }}
        >
          {category}
        </Button>
      ))}
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "200px",
          }}
        >
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <div style={{ flex: 1 }}>
              <strong
                style={{
                  fontSize: "18px",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                {joke.value}
              </strong>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="success" onClick={() => handleSave(joke.value)}>Save</Button>
            <Button variant="primary" onClick={() => fetchJokes(modalTitle)}>
              Another!!!
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryBar;
