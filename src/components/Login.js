import React, { useRef, useState} from 'react';
import { Button, Alert, Form, Card} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/united/bootstrap.min.css";



export default function Login () {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password*</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {/* <Button disabled={loading} className="w-100" type="submit">Log In</Button> */}
                        <button disabled={loading} type="button" class="btn btn-info btn-lg btn-block">Log In</button>
                    </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/reset-password">Forgot Password?</Link>
                        </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>        
        </>
        
    )
}
