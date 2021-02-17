import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import TimeBar from "./TimeBar";
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

const x = {
    "geo": {"country": "United Kingdom", "state": "England", "city": "London", "latitude": 51.505182, "longitude": -0.0999387},
    "timezone": "Europe/London",
    "timezone_offset": 0,
    "date": "2021-02-15",
    "date_time": "2021-02-15 07:00:42",
    "date_time_txt": "Monday, February 15, 2021 07:00:42",
    "date_time_wti": "Mon, 15 Feb 2021 07:00:42 +0000",
    "date_time_ymd": "2021-02-15T07:00:42+0000",
    "date_time_unix": 1613372442.965,
    "time_24": "07:00:42",
    "time_12": "07:00:42 AM",
    "week": "08",
    "month": "02",
    "year": "2021",
    "year_abbr": "21",
    "is_dst": false,
    "dst_savings": 1
};

const geolocationApi = process.env.REACT_APP_IP_GEOLOCATION_API_KEY

export default function Locations({baseURL}) {
    const [srcTzInfo, setSrcTzInfo] = useState();
    const date = new Date();
    const { currentUser } = useAuth();
    const [contactsList, setContactsList] = useState(null);
    const [error, setError] = useState('');
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [addedContacts, setAddedContacts] = useState([]);

    useEffect(() => {
        user &&
        fetch(`https://api.ipgeolocation.io/timezone?apiKey=${geolocationApi}&location=`
        // fetch("https://google.com/timezone?apiKey=thiswillfail&location="
            + encodeURIComponent(`${user.location_info.city}, ${user.location_info.state}, ${user.location_info.country}`))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setSrcTzInfo(result);
                },
                (error) => {
                    console.log(error);
                    setSrcTzInfo(x);
                }
            )
    }, [user])



    const loadUserData = () => {
        currentUser && 
            axios.get(`/users/current/${currentUser.uid}`)
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
    }, []);

    const loadContactsList = () => {
        currentUser && 
            axios.get(`/contacts_list/${currentUser.uid}`)
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

    const refreshPage = (e) => { 
        window.location.reload(); 
    }


    const showContact = (e) => {
        const index = document.getElementById('contacts').value
        if (index < 0) return;
        const newAddedContacts = [...addedContacts]
        newAddedContacts.push(index)
        setAddedContacts(newAddedContacts)
    }

    if (!contactsList || !user) return "Loading..."

    return (
        <div id="locations">

            <Form >
                <h3 className='text-center mb-4'>Time Bar</h3>
                <Form.Label>Select the contact(s) you want to reach out to!</Form.Label>
                <Form.Group controlId="addContact">
                    <Form.Control as="select" id="contacts">
                    <option value="-1">Select contact</option>
                    {contactsList.map((c, i) => 
                        <option key={i} value={i}>{c.name}</option>
                    )}
                    </Form.Control>
                </Form.Group>
                
                <Button onClick={showContact}>Add to Time Bar</Button>
            </Form>
            <TimeBar name={user.full_name} date={date} srcTzInfo={srcTzInfo} dst_location={user.location_info}
                src_availability={{}} dst_availability={user.availability_info}/>
            {addedContacts.map((c, i) =>
                <TimeBar key={i} name={contactsList[c].name} date={date} srcTzInfo={srcTzInfo} dst_location={contactsList[c].location_info}
                    src_availability={user.availability_info} dst_availability={contactsList[c].availability_info}/>
            )}
            <div className="w-100 text-center mt2">
                <Button variant="link" onClick={refreshPage}>
                    Refresh
                </Button>
            </div>
        </div>
        
    )
}
