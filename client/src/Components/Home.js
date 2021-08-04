import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Nav } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

function Home() {
    return (
        <>
        <h3> Home </h3>

        <Button as={Link} to="/login" className="gameButton">Log In</Button>
        <Button as={Link} to="/signup" className="gameButton">Sign Up</Button>
        <h4>Games other users are playing</h4>
        </>
    )
   }
   export default Home