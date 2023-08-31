import React from 'react'
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap'

export default function NavbarComponent(props) {
  return (
    <>
        <Navbar expand={false} className="bg-body-tertiary mb-3" >
            <Container fluid>
                <Navbar.Brand href="#">Arquima</Navbar.Brand>
                <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-false"} />
                <Navbar.Offcanvas 
                    id={"offcanvasNavbar-expand-false"} 
                    aria-labelledby={"offcanvasNavbarLabel-expand-false"}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={"offcanvasNavbarLabel-expand-false"}>
                            Arquima
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link onClick={props.registroEmpleados}>Registrar empleado</Nav.Link>
                            <Nav.Link onClick={props.baseDatos}>Base de datos</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
    </>
  )
}
