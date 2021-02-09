import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


// import Home from './components/Home'
import Signup from './components/Signup'
// import Login from './components/Login'
// import Navigation from './components/Navigation'
// import UserDashboard from './components/UserDashboard'
// import User from './components/User'
// import Search from './components/Search'
// import SearchContact from './SearchContact'
// import ContactList from './components/ContactList'


import './App.css';

const BASE_URL = 'http://localhost:5000'



const App = () => {
  return (
    <div>
    <a href='http://localhost:5000' target="_blank" rel="noopener noreferrer">Home Page</a>
    <Signup />
    </div>
  );
}


export default App;
