
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Alert } from 'react-bootstrap'
import Locations from './Locations'
import './TimeBar.css'

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
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div>
                        <span><p><strong>You are logged in as: </strong>{currentUser.email}</p></span>
                    </div>
                    <div>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/update-profile">Update Profile</a></li>
                        <li class="breadcrumb-item"><a href="/update-account">Update Account</a></li>
                        <li class="breadcrumb-item"><a href="/add-contact">Add Contacts</a></li>
                        <li class="breadcrumb-item"><a href="/contacts-list">Manage Contacts</a></li>
                        </ol>
                    </div>
                    <span><button type="button" class="btn btn-link" onClick={handleLogout} >Log Out</button></span>
                </Card.Body>
            </Card> 
            <br />
            <Locations />
        </>
    )
}




