
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'
import Locations from './Locations'
import TimeBar from './TimeBar'
// import TimeBar from './TimeBar.css'

export default function UserDashboard () {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
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
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser.email} <br />
                    
                    <Link to="/update-profile" className="btn btn-secondary w100 mt-3 mx-3">
                        Update Profile
                    </Link>

                    <Link to="/update-account" className="btn btn-secondary w100 mt-3 mx-3">
                        Update Account
                    </Link>

                    <Link to="/add-contact" className="btn btn-secondary w100 mt-3 mx-3">
                        Add Contact
                    </Link> 

                    <Link to="/contacts-list" className="btn btn-secondary w100 mt-3 mx-3">
                        Contacts List
                    </Link>
                
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>

            <Locations />
        </>
    )
}