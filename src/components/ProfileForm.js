import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { Form, Button, Container, Card, Col} from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'



export default function ProfileForm({baseURL}) {

    const { currentUser } = useAuth();
    const [error, setError] = useState(null)

    const [user, setUser] = useState({
        auth_id: currentUser.uid,
        full_name: currentUser.displayName,
        location_info: {
            country: '',
            state: '',
            city: ''
        },
        availability_info: []
    })

    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newLocation = ['country', 'state', 'city']

        const newUser = {
            ...user,
            location_info: {
                ...user.location_info,
            }
        }

        if (newLocation.includes(updatedInfo)) {
            
            newUser.location_info[updatedInfo] = updatedValue
            setUser(newUser)

        } else {

            newUser[updatedInfo] = updatedValue
            setUser(newUser)
            
        }
        console.log(newUser)
        console.log({updatedInfo, updatedValue})
    }


        //check if all fields are populated
        const checkPopulatedFields = () => {
            const fields =
                Object.values(user)
                    .filter((element) => {
                        return typeof (element) !== 'object' && typeof (element) !== 'boolean'
                    })
                    .concat(Object.values(user.location_info))
            
                    console.log(user);
                    fields.every((field) => console.log(field));
                    
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
            axios.post(baseURL + '/users', user)
                .then((response) => {
                
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
            {error && <p>{error.message}</p>} 
            {/* <div class="jumbotron"> */}
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h3 className='text-center mb-4'>Profile</h3>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Full Name*</Form.Label>
                                    <Form.Control type="text" name='full_name'  onChange={handleChange} />
                                </Form.Group>

                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCountry" >
                                    <Form.Label>Country*</Form.Label>
                                    <Form.Control name='country'  onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridState' >
                                    <Form.Label>State*</Form.Label>
                                    <Form.Control name='state'  onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity" >
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control name='city'  onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            {/* <Form.Row>
                                <Form.Group as={Col} controlId="formGridAvailability" >
                                    <Form.Label>Availability*</Form.Label>
                                    <Form.Control name='availability_info'  onChange={handleChange} />
                                </Form.Group>
                            </Form.Row> */}
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