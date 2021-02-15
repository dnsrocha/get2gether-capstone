import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import {Card, Container, Row, Col} from 'react-bootstrap';
import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


export default function ContactList({baseURL, onContactSelected}) {
    const { currentUser } = useAuth();
    const [contactsList, setContactsList] = useState(null);
    const [error, setError] = useState('');
    const history = useHistory();


    const loadContactsList = () => {
        currentUser && 
            axios.get(`${baseURL}/contacts_list/${currentUser.uid}`)
                .then((response) => {

                    // console.log(response.data);
                    // console.log(response.data.result);
                    // console.log(response.data.result[0]);
                    // console.log(response.data.result[0].contact_id);


                    const apiContactsList = Object.values(response.data.result)
                    if (Object.keys(response.data.result) !== 'message') {
                        setContactsList(apiContactsList);
                    } else {
                        setError({variant: 'warning', message: Object.values(response.data)[0]})
                    }
                })
                .catch((error) => {
                    const message=`There was an error with your request. ${error.response && error.response.data.message ? error.response.data.message : error.message}`;
                    setError({variant: 'danger', message: message});
                    console.log(message);
                })
    }   

    useEffect(() => {
        loadContactsList();
    }, [])
    




    const showContactList = () => {
        let res = [];
        for (let i=0; i < contactsList.length; i++) {
            const updateContact = (e) => {
                onContactSelected(contactsList[i])
                history.push('/update-contact')
            }

            res.push(
            <Container key={contactsList[i].contact_id}>
                {error && <p>{error.message}</p>} 
                <Card>
                    <Row>
                        <Col>
                            <Card.Title className="text-center mb-4 mx-2"><button style={{background: 'none', border: 'none'}} onClick={updateContact}>{contactsList[i].name}</button></Card.Title> 
                        </Col>
                    </Row>
                    <Card.Body>
                        <div>
                            <ul>
                                <li>{contactsList[i].nickname}</li>
                                <li>{contactsList[i].location_info.country}, {contactsList[i].location_info.state}, {contactsList[i].location_info.city}</li>
                            </ul>

                        </div>
                    </Card.Body>
                </Card>
            </Container>
            )
        }
        return res
    }
    
    if (contactsList) {
        return (
            <div>
                {/* { error.message && <Alert variant={error.variant}>{error.message}</Alert>} */}
                {showContactList()}
            </div>
    )} else {
        return null
    }
}