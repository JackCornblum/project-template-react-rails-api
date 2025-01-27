import { Form, Group, Label, Control, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function Login({setCurrentGamer}) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
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
            setErrors(gamerData)
        }
    }

    function handleClick(e) {
        history.push('/signup')
    }

 return (
     <>
        <h3 style={{fontFamily: 'Goldman', color: '#14FFEC' }}> Login </h3>
        <Form onSubmit={handleSubmit} style={{fontFamily: 'Goldman', color: '#14FFEC' }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors([])
                    }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors([])
                    }}/>
            </Form.Group>
           
            <Button type="submit" className="gameButton">Login</Button>
            <Form.Label>Or</Form.Label>
            <Button onClick={handleClick} className="gameButton">Signup</Button>
            
        </Form>
       
            {errors.error? errors.error.map(e => <p className="error-message" style={{fontFamily: 'Goldman', color: '#14FFEC' }}>{e}</p>): null}
     </>
 )
}
export default Login