
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './UserDashboard'
import Login from './Login'
import Signup from './Signup'

const Home = ({baseURL}) => {
  const { currentUser } = useAuth();
    return (
        <div>
            { currentUser ? 
                <UserDashboard baseURL={baseURL} /> 
            :
                <Login />
       
            }
        </div>
    )
}

export default Home;