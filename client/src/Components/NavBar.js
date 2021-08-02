import {useHistory} from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar({currentGamer, setCurrentGamer}) {
    // const history = useHistory()
    console.log(currentGamer)

    async function handleLogout(e) {
        const res = await fetch('/logout', {
            method: 'DELETE'
        })

        // const gamerData = await res.json()

    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    {currentGamer.id? <Navbar.Brand>{currentGamer.name}</Navbar.Brand> : null}
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {currentGamer.id? <Nav.Link href="/mygames">My Games</Nav.Link> : null}
                        <Nav.Link href="/search">Search Games</Nav.Link>
                        {currentGamer.id?<Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar