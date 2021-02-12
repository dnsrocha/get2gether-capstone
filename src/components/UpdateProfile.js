import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'



export default function UpdateProfile({baseURL}) {
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const history = useHistory();

    const loadUserData = () => {
        currentUser && 
            axios.get(`${baseURL}/users/current/${currentUser.uid}`)
                .then((response) => {
                    const apiUser = Object.values(response.data)[0]
                    if (Object.keys(response.data)[0] !== 'message') {
                        apiUser.userID = Object.keys(response.data)[0]
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


    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.values
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
                message: 'All fields must be populated.'
            })
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkPopulatedFields()) {
            axios.put(baseURL + '/users/' + user.userID, user)
                .then((response) => {
                    setError({variant: 'success', message: response.data.message});
                    history.push('/');
                })
                .catch((error) => {
                    const message=`There was an error with your request. User profile was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }

    }

    // if (!user) {
    //     return(
    //         <div></div>
    //     )
    // }
    return (
        <Container>
        {/* <div class="jumbotron"> */}
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h3 className='text-center mb-4'>Profile</h3>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name='full_name' value={user.full_name} onChange={handleChange} />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCountry" >
                                <Form.Label>Country</Form.Label>
                                <Form.Control name='country' value={user.location_info.country} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId='formGridState' >
                                <Form.Label>State</Form.Label>
                                <Form.Control name='state' value={user.location_info.city} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity" >
                                <Form.Label>City</Form.Label>
                                <Form.Control name='city' value={user.location_info.city} onChange={handleChange} />
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

}