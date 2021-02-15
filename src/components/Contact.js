import React, {useState, useEffect, useRef} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {Card, Button, Container, Row, Col, Alert, Overlay} from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ContactForm from './ContactForm'




export default function Contact ({baseURL}) {
    const { currentUser } = useAuth();
    const [contact, setContact] = useState({});
    const [error, setError] = useState('');
    const target = useRef(null);

    // const match = useRouteMatch('/contacts/:id');
    // const userId = match.params.id

    export default function ContactList({baseURL}) {
        const { currentUser } = useAuth();
        const [contactsList, setContactsList] = useState(null);
        const [error, setError] = useState('');
    
    
        // const loadContactsList = () => {
        //     currentUser && 
        //         axios.get(`${baseURL}/contacts_list/${currentUser.uid}`)
        //             .then((response) => {
    
        //                 // console.log(response.data);
        //                 // console.log(response.data.result);
        //                 // console.log(response.data.result[0]);
        //                 // console.log(response.data.result[0].contact_id);
    
        //                 const apiContactsList = Object.values(response.data.result)
        //                 if (Object.keys(response.data.result)[0] !== 'message') {
        //                     setContactsList(apiContactsList);
        //                 } else {
        //                     setError({variant: 'warning', message: Object.values(response.data)[0]})
        //                 }
        //             })
    const loadContactData = () => {
        currentUser && 
            axios.get(`${baseURL}/contact/${currentUser.uid}/`)
                .then((response) => {
                    const apiUser = Object.values(response.data)
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.contactID = Object.keys(response.data)[0];
                        setContacts(apiContact);
                    } else {
                        setError({variant: 'warning', message: apiUser})
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    console.log(error.message)
                    const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
    }

    useEffect(() => {
        loadUserData();
    }, [])

    useEffect(() => {
        axios.get(`${baseURL}/users/${userId}`)
            .then((response) => {
                const apiUser = response.data
                setUser(apiUser);
            })
            .catch((error) => {
                const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                setError({variant: 'danger', message: message});
                console.log(message);
            })
    }, [baseURL, userId])

    const showUserData = () => {
        return (
            <Container>
                <Card>
                    <Row>
                        <Col>
                            <Card.Title>{user.full_name}</Card.Title>
                        </Col>
                    </Row>
                    <Card.Body>
                        
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <div>
            { error.message && <Alert variant={error.variant}>{error.message}</Alert>}
            {showUserData()}
        </div>
    )

}