
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './UserDashboard'
import Login from './Login'

const Home = ({baseURL}) => {
    const { currentUser } = useAuth();
        return (
            <div>
                { currentUser ? 
                    <UserDashboard baseURL={baseURL} /> 
                :
                    <Login href="/login" />
                }
            </div>
        )
}

export default Home;