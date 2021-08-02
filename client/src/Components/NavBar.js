// import {useHistory} from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar({currentGamer}) {
    // const history = useHistory()
    console.log(currentGamer)
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    {currentGamer.id? <Navbar.Brand>{currentGamer.name}</Navbar.Brand> : null}
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/mygames">My Games</Nav.Link>
                        <Nav.Link href="#pricing">Search Games</Nav.Link>
                        {currentGamer.id?<Nav.Link href="/login">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar