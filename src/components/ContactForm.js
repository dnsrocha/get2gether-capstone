import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { Form, Button, Container, Card, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'



export default function ContactForm({baseURL}) {

    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();

    const [contact, setContact] = useState({
        auth_id: currentUser.uid,
        name: '',
        nickname: '',
        location_info: {
            country: '',
            state: '',
            city: ''
        },
        availability_info: {}
    })

    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newLocation = ['country', 'state', 'city']

        const newContact = {
            ...contact,
            location_info: {
                ...contact.location_info,
            }
        }

        if (newLocation.includes(updatedInfo)) {
            
            newContact.location_info[updatedInfo] = updatedValue
            setContact(newContact)

        } else {

            newContact[updatedInfo] = updatedValue
            setContact(newContact)
            
        }
    }

    const availabilityChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newAvailability = contact.availability_info || {}

        setContact({
            ...contact,
            availability_info: {
                ...newAvailability,
                [updatedInfo]: updatedValue === "on"
            }
        })
    }


        //check if all fields are populated
        const checkPopulatedFields = () => {
            const fields =
                Object.values(contact)
                    .filter((element) => {
                        return typeof (element) !== 'object' && typeof (element) !== 'boolean'
                    })
                    .concat(Object.values(contact.location_info))
            
                    
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
            axios.post(baseURL + '/add_contact', contact)
                .then((response) => {
                
                    setError({ variant: 'success', message: response.data.message })
                    history.push('/dashboard');
                    
                })
                .catch((error) => {
                    const message=`There was an error with your request. Could not save user profile ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({ variant: 'danger', message: message });
                    console.log(message);
                })
        }
    }



    if (contact) {
        return (
            <Container>
                {error && <p>{error.message}</p>} 
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h3 className='text-center mb-4'>Add Contact</h3>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control type="text" name='name'  onChange={handleChange} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Nickame*</Form.Label>
                                        <Form.Control type="text" name='nickname'  onChange={handleChange} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCountry" >
                                        <Form.Label>Country*</Form.Label>
                                        <Form.Control name='country'  onChange={handleChange} placeholder="Don't use acronyms" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId='formGridState' >
                                        <Form.Label>State*</Form.Label>
                                        <Form.Control name='state'  onChange={handleChange} placeholder="Don't use acronyms" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity" >
                                        <Form.Label>City*</Form.Label>
                                        <Form.Control name='city'  onChange={handleChange} placeholder="Don't use acronyms" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Label>Availability* (Hours are displayed in 24-hour military time format. Check all that apply.) </Form.Label>
                                        {[...Array(24).keys()].map(i =>  
                                            <Form.Check type="checkbox" name={i} label={i} checked={contact.availability_info[i]} onChange={availabilityChange}/>
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
        return null
    }
}