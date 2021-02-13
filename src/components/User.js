import React, {useState, useEffect, useRef} from 'react'
import {useRouteMatch, Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {Card, Button, Container, Row, Col, Alert, Overlay} from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';



const User = ({baseURL}) => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const target = useRef(null);

    const match = useRouteMatch('/users/:id');
    const userId = match.params.id

    const loadUserData = () => {
        currentUser && 
            axios.get(`${baseURL}/users/current/${currentUser.uid}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0];
                        // setCurrentOwner(apiUser);
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


export default User;