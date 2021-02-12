import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'


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
        const checkPopulatedFieds = () => {
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
        if (checkFormPopulated()) {
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
        <div>

        </div>
    )
}