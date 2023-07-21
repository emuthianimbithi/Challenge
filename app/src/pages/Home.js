import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Warning from "../components/Warning";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [state, setShowWarning] = useState(false);
  const [joke, setJokes] = useState([]);
  const [save, setSave] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  useEffect(() => {
    localStorage.setItem("Saved", JSON.stringify(save));
  }, [save]);

  const handleSave = (put) => {
    const email = JSON.parse(localStorage.getItem("Sessions"));
    if (email!==null) {
      const existSave = JSON.parse(localStorage.getItem("Saved"));
      const items = {
        email: email,
        item: put,
      };
      const updateItem = [...existSave, items];

      setSave(updateItem);
      fetchJokes();
    } else {
      setShowWarning(true);
    }
  };

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/joke/random`);
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
    <div className="App">
      <Container fluid="true">
        <Row>
          <Col md={2} className="sidebar-left">
            <Image
              src={
                " https://media0.giphy.com/media/l1J3Tqz2fpsx60MDe/200w.webp?cid=ecf05e47p17hwsyxk4uisv6mwtxv0the6bo9pmz7q04s0gqj&ep=v1_gifs_search&rid=200w.webp&ct=g"
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                " https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjU4dGozc2J2NWtteWVlZXpsNzRjNXR0YXhiMzI1OWp3aGdobWFiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XzuRP7Pr0woUM/giphy.gif"
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG55MjZwOTQxZWtiZHg4MWNuOHZjZzd2M3V6Z2J0aW14djhpMTBybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J3KhGhb1E9vqWQ0/giphy.gif "
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW40cTlkdDd0ZmRvM2czMWp5dWF4Z3A2bTZ0NGN4amx3OHR4ZDFrayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J3nY7N7LBrBobVm/giphy.gif "
              }
              fluid="true"
              rounded="true"
            />
          </Col>

          <Col md={8} className="main-content">
            <Card className="content-card">
              <Card.Img
                variant="top"
                src="https://gifdb.com/images/featured/chuck-norris-f1b8by3dof3j9ou5.gif"
                fluid="true"
                rounded="true"
              />
              <Card.Body style={{ maxWidth: "500px", minWidth: "200px" }}>
                <Card.Title>
                  <u>Random Fact About Chuck Noris</u>
                </Card.Title>
                <Card.Text>
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
                </Card.Text>
                <Button
                  variant="success"
                  style={{ marginBottom: "5px" }}
                  onClick={() => handleSave(joke.value)}
                >
                  Save
                </Button>
                {state && <Warning show = {state} />}
                <Button variant="primary" onClick={() => fetchJokes()}>
                  Another!!
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} className="sidebar-right">
            <Image
              src={
                "https://media2.giphy.com/media/13fR00PIYwb7Gg/200w.webp?cid=ecf05e47p17hwsyxk4uisv6mwtxv0the6bo9pmz7q04s0gqj&ep=v1_gifs_search&rid=200w.webp&ct=g"
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                "https://media2.giphy.com/media/7qZ3ZX1Gu3TZm/200w.webp?cid=ecf05e47p17hwsyxk4uisv6mwtxv0the6bo9pmz7q04s0gqj&ep=v1_gifs_search&rid=200w.webp&ct=g"
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                "https://media2.giphy.com/media/26n6PChdnDrBhmc7u/200w.webp?cid=ecf05e47p17hwsyxk4uisv6mwtxv0the6bo9pmz7q04s0gqj&ep=v1_gifs_search&rid=200w.webp&ct=g"
              }
              fluid="true"
              rounded="true"
            />
            <Image
              src={
                "https://media4.giphy.com/media/XzuRP7Pr0woUM/giphy.gif?cid=ecf05e47p17hwsyxk4uisv6mwtxv0the6bo9pmz7q04s0gqj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              }
              fluid="true"
              rounded="true"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
