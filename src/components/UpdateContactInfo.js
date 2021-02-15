import React, { useState } from 'react'
import { Form, Button, Container, Card, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'



export default function UpdateContactInfo({baseURL, contactInfo}) {
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [contact, setContact] = useState(contactInfo);
    const history = useHistory();


    const handleChange = (e) => {
        const updatedInfo = e.target.name
        const updatedValue = e.target.value
        const newLocation = ['country', 'state', 'city']

        if (newLocation.includes(updatedInfo)) {
            setContact({
                ...contact,
                location_info: {
                    ...contact.location_info,
                    [updatedInfo]: updatedValue,
                }
            })
        } else {
            setContact({
                ...contact,
                [updatedInfo]: updatedValue,
            })
        }
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
            axios.put(`${baseURL}/contacts/${currentUser.uid}/update-info/${contactInfo.contact_id}`, contact)
                .then((response) => {
                    setError({variant: 'success', message: response.data.message});
                    history.push('/contacts-list');
                })
                .catch((error) => {
                    const message=`There was an error with your request. Contact was not saved. ${error.response && error.response.data.message ? error.response.data.message : error.message}.`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
        }

    }

    if (contact) {

    return (
        <Container>
            {error && <p>{error.message}</p>} 
        {/* <div class="jumbotron"> */}
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h3 className='text-center mb-4'>Update Contact Info</h3>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Name*</Form.Label>
                                <Form.Control type="text" name='name' value={contact.name} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nickname*</Form.Label>
                                <Form.Control type="text" name='nickname' value={contact.nickname} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCountry" >
                                <Form.Label>Country*</Form.Label>
                                <Form.Control name='country' value={contact.location_info.country} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId='formGridState' >
                                <Form.Label>State*</Form.Label>
                                <Form.Control name='state' value={contact.location_info.state} onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity" >
                                <Form.Label>City*</Form.Label>
                                <Form.Control name='city' value={contact.location_info.city} onChange={handleChange} />
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