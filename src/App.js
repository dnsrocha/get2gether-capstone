import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'

import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import './App.css';


// import Home from './components/Home'
import Signup from './components/Signup'
// import Login from './components/Login'
// import Navigation from './components/Navigation'
// import UserDashboard from './components/UserDashboard'
// import User from './components/User'
// import Search from './components/Search'
// import SearchContact from './SearchContact'
// import ContactList from './components/ContactList'


const BASE_URL = 'http://localhost:5000'



const App = () => {
  return (
    <AuthProvider>

      <Container 
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh"}}
        >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Signup />
        </div>
      </Container>

    </AuthProvider>
    
    
    
  );
}


export default App;
