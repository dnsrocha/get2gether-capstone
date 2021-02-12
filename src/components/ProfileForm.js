import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { Form, Button, Container, Card, Col} from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'



export default function ProfileForm(baseUrl, setDashboardUser) {

    const { currentUser } = useAuth;
    const [error, setError] = useState('')

    const [user, setUser] = useState({
        auth_id: currentUser.uid,
        full_name: currentUser.displayName,
        location_info: {
            country: '',
            state: '',
            city: ''
        }
        //availability_info: {}, --> time windows where user is available
        //avatar_url': submitted_data['avatar_url'], # bonus =  choose from available
    })

    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.updatedValue
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
            });
        }

        const handleCheck = (e) => {
            setUser({
                ...user,
                [e.target.name]: !user[e.target.name]
            });
        }

        //check if all fields are populated
        const checkPopulatedFields = () => {
            const fields =
                Object.values(user)
                    .filter((element) => {
                        return typeof (element) !== 'object' && typeof (element) !== 'boolean'
                    })
                    .concat(Object.values(user.address))
            
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

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkPopulatedFields()) {
            axios.post(baseUrl + '/users', user)
                .then((response) => {
                    setDashboardUser(response);

                    setUser({
                        auth_id :currentUser.uid,
                        full_name: '',
                        location_info: {
                            country: '',
                            state: '',
                            city: ''
                        }
                        //availability_info: {}, --> time windows where user is available
                        //avatar_url': '', # bonus =  choose from available
                    })
                    setError({ variant: 'success', message: response.data.message })
                })
                .catch((error) => {
                    const message=`There was an error with your request. Could not save user profile ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({ variant: 'danger', message: message });
                    console.log(message);
                })
        }
    }



    return (
        <Container>
            <div class="jumbotron">
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
            </div>
        </Container>
    )
}