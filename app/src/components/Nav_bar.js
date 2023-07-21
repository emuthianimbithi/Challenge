import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import SignupModal from "../pages/SignupModal";
import LoginModal from "../pages/LoginModal";
import Profile from "../pages/Profile";

export class Nav_bar extends Component {
  render() {
    return (
      <Navbar
        bg="light"
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary sticky-top mb-3"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">Just Chuck</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Profile/>
            </Nav>
            <Nav>
              <LoginModal /> <SignupModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Nav_bar;
