import React, { useRef, useState} from 'react';
import { Button, Alert, Form, Card, Container} from 'react-bootstrap';
import { Link,  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/united/bootstrap.min.css";



export default function ForgotPassword () {

    const emailRef = useRef()
    const { resetPassword } = useAuth
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('An email with instructions has been sent to your inbox.')
        } catch {
            setError('Failed to reset')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 classname="text-center mb-4">Reset Password</h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                        <div classname="w-100 text-center mt-3">
                            <Link to="/login">Login</Link>
                        </div>
                </Card.Body>
            </Card>
                <div classname="w-100 text-center mt2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>        
        </>
        
    )
}
