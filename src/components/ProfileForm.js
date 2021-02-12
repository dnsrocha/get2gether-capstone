import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'


export default function ProfileForm() {

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

    return (
        <div>

        </div>
    )
}