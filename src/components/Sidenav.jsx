import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import nav from "../nav";

export default function Sidenav(props) {
  const [show, setShow] = useState(false);

  return (
    <Navbar key={false} bg="light" expand={false} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Rankoli - IBM</Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setShow(true)}
          aria-controls={`sideNav-expand-${false}`}
        >
          <i className="fa fa-bars"></i>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`sideNav-expand-${false}`}
          aria-labelledby={`sideNavLabel-expand-${false}`}
          show={show}
          placement="end"
        >
          <Offcanvas.Header onHide={() => setShow(false)} closeButton>
            <Offcanvas.Title id={`sideNavLabel-expand-${false}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link onClick={() => setShow(false)} to="/">
                Home
              </Link>
              {nav.map(
                (i, index) =>
                  props.access[i.access] && (
                    <Link
                      key={`side-${index}`}
                      onClick={() => setShow(false)}
                      to={i.path}
                    >
                      {i.title}
                    </Link>
                  )
              )}
              <Link onClick={() => props.setLogin(false)} to="/">
                Logout
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
