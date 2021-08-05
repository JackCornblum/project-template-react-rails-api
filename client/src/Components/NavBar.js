import {useHistory} from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar({currentGamer, setCurrentGamer}) {
    // const history = useHistory()
    // console.log(currentGamer)

    async function handleLogout(e) {
        const res = await fetch('/logout', {
            method: 'DELETE'
        })

        // const gamerData = await res.json()

    }

    return (
        <>
            <Navbar className="color-nav" variant="dark">
                <Container className="nav-container">
                    <Navbar.Brand className="mr-auto" style={{fontFamily:'Goldman'}} href="/">Flatiron Steamclone</Navbar.Brand>
                    <Nav className="me-auto">
                    {currentGamer.id? <Navbar.Brand>{currentGamer.name}</Navbar.Brand> : null}
                        <Nav.Link className="color-links" href="/">Home</Nav.Link>
                        {currentGamer.id? <Nav.Link href="/mygames">My Games</Nav.Link> : null}
                        <Nav.Link className="color-links" href="/search">Search Games</Nav.Link>
                        {currentGamer.id?<Nav.Link className="color-links" href="/login" onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link className="color-links" href="/login">Login</Nav.Link>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar