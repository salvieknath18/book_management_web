import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Header() {
  return (
   <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/home">Book Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/user">User</Nav.Link>
        <Nav.Link href="/book">Book</Nav.Link>
        <Nav.Link href="/Analytics">Analytics</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

