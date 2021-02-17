
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Navbar, Nav, Button, Alert, Dropdown, Container } from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Navigation () {

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
        <Navbar fixed ='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Get2Gether</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#features">About Us</Nav.Link>
                {/* <Nav.Link href="#pricing"></Nav.Link> */}
                <Dropdown navbar>
                    <Dropdown.Toggle variant='primary' className='cog-icon' id='account-settings'>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/update-email">Update Account</Dropdown.Item>
                        <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}




    //  <Card>
    //             <Card.Body>
    //                 <h2 className="text-center mb-4">Profile</h2>
    //                 {error && <Alert variant="danger">{error}</Alert>}
    //                 <strong>Email:</strong>{currentUser.email}
    //                 <Link to="/update-profile" className="btn btn-secondary w100 mt-3">
    //                     Update Profile
    //                 </Link>
    //                 <Link to="/update-account" className="btn btn-secondary w100 mt-3">
    //                     Update Account
    //                 </Link>
    //             </Card.Body>
    //         </Card>
    //         <div className="w-100 text-center mt2">
    //             <Button variant="link" onClick={handleLogout}>
    //                 Log Out
    //             </Button>
    //         </div>