import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import "bootswatch/dist/united/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css';


import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
// import UserDashboard from './components/UserDashboard'
import UpdateAccount from './components/UpdateAccount'
import UpdateProfile from './components/UpdateProfile'
import Navigation from './components/Navigation'
import User from './components/User'
// import Search from './components/Search'
// import SearchContact from './SearchContact'
// import ContactList from './components/ContactList'


const BASE_URL = 'http://localhost:5000'



const App = () => {
  return (
    

      <Container 
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh"}}
        >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Navigation baseUrl={BASE_URL} />
              <Switch>
                {/* <PrivateRoute exact path='/users/:id' ><User baseUrl={BASE_URL} /></PrivateRoute> */}
                <Route path="/"><Home baseURL={BASE_URL} /></Route>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/reset-password" component={ForgotPassword} />
                {/* <PrivateRoute exact path="/dashboard" component={UserDashboard} /> */}
                <PrivateRoute exact path="/update-account" component={UpdateAccount} />
                <PrivateRoute exact path='/update-profile'><UpdateProfile baseURL={BASE_URL} /></PrivateRoute>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>

    
    
    
    
  );
}


export default App;
