
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'
// import Contacts from './Contacts'

export default function UserDashboard () {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out.')
        }
    }

    return (
        <>
        <Router>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* <strong>Email:</strong>{currentUser.email} */}
                    <Link to="/update_profile" className="btn btn-secondary w100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card> 
            <div classname="w-100 text-center mt2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
            </Router>
        </>
    )
}

