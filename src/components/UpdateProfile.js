import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'



export default function UpdateProfile({baseURL}) {
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    const [user, setUser] = useState({
        auth_id: currentUser.uid,
        full_name: currentUser.displayName || '',
        location_info: {
            country: '',
            state: '',
            city: ''
        },
        availability_info: {}
    });

    console.log(user)

    const history = useHistory();

    const loadUserData = () => {
        currentUser && 
            axios.get(`${baseURL}/users/current/${currentUser.uid}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]

                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0]
                        apiUser.availability_info = apiUser.availability_info || {}
                        setUser(apiUser);
                    } else {
                        setError({variant: 'warning', message: apiUser})
                    }
                })
                .catch((error) => {
                    const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const availabilityChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newAvailability = user.availability_info || {}

        setUser({
            ...user,
            availability_info: {
                ...newAvailability,
                [updatedInfo]: updatedValue === "on"
            }
        })
    }

    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newLocation = ['country', 'state', 'city']
        

        if (newLocation.includes(updatedInfo)) {
            setUser({
                ...user,
                location_info: {
                    ...user.location_info,
                    [updatedInfo]: updatedValue,
                }
            })
        } else {
            setUser({
                ...user,
                [updatedInfo]: updatedValue,
            })
        }
    }


    //check if all fields are populated
    const checkPopulatedFields = () => {
        const fields =
            Object.values(user)
                .filter((element) => {
                    return typeof (element) !== 'object' && typeof (element) !== 'boolean'
                })
                .concat(Object.values(user.location_info))
        
        if (fields.every((field) => field)) {
            return true
        } else {
            setError({
                variant: 'warning',
                message: 'All fields with * must be populated.'
            })
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkPopulatedFields()) {
            axios.put(baseURL + '/users/' + currentUser.uid, user)
                .then((response) => {
                    setError({variant: 'success', message: response.data.message});
                    history.push('/dashboard');
                })
                .catch((error) => {
                    const message=`There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }

    }

    if (user) {

    return (
        <Container>
            {error && <p>{error.message}</p>} 
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h3 className='text-center mb-4'>Profile</h3>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Full Name*</Form.Label>
                                <Form.Control type="text" name='full_name' value={user.full_name} onChange={handleChange} />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCountry" >
                                <Form.Label>Country*</Form.Label>
                                <Form.Control name='country' value={user.location_info.country} onChange={handleChange} placeholder="Don't use acronyms" />
                            </Form.Group>
                            <Form.Group as={Col} controlId='formGridState' >
                                <Form.Label>State*</Form.Label>
                                <Form.Control name='state' value={user.location_info.state} onChange={handleChange} placeholder="Don't use acronyms" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity" >
                                <Form.Label>City*</Form.Label>
                                <Form.Control name='city' value={user.location_info.city} onChange={handleChange} placeholder="Don't use acronyms" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Availability* (Hours are displayed in 24-hour military time format. Check all that apply.)</Form.Label>
                            {[...Array(24).keys()].map(i =>  
                                <Form.Check type="checkbox" name={i} label={i} checked={user.availability_info[i]} onChange={availabilityChange}/>
                            )}
                            </Form.Group>
                        </Form.Row>
                        <Button variant='primary' type="submit" value="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        {/* </div> */}
    </Container>

    )
    } else {
        return null;
    }

}

// 