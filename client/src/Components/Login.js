import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function Login({setCurrentGamer}) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(null)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        const gamer = {
            email,
            password
        }
        const res = await fetch('/log_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gamer})
        })
        const gamerData = await res.json()
        if(gamerData.id) {
            setCurrentGamer(gamerData)
            history.push('/')
        } else {
            setErrors(gamerData.error)
        }
    }

 return (
     <>
        <h3> Login </h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button type="submit" id="login-button">Login</Button>
            {/* {errors? : null} */}
        </Form>
     </>
 )
}
export default Login