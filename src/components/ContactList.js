import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap';
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
                <ul class="list-group">
                    <li class="list-group-item"><button style={{background: 'none', border: 'none'}} onClick={updateContact}>{contactsList[i].name} ({contactsList[i].nickname})</button></li>
                </ul>
            </Container>
            )
        }
        return res
    }
    
    if (contactsList) {
        return (
            <div>
                {showContactList()}
            </div>
    )} else {
        return null
    }
}