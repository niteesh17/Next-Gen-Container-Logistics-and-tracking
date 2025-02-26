import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";
function NavBar() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand href="#home" style={{ color: 'white', fontSize: '24px' }} className="me-auto">Container Management Sytem</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ fontSize: '24px' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{ color: 'white', fontSize: '18px' }}>Home</Nav.Link>
            <Nav.Link href="login" style={{ color: 'white', fontSize: '18px' }}>Login</Nav.Link>
            <Nav.Link href="Query" style={{ color: 'white', fontSize: '18px' }}>Query</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
