import React, { useState } from 'react' 
// import {Navbar} from 'bootstrap'
import  MenuItems from './MenuItems'
import './Navbar.css'

export default function Navbar() {
    const [clicked, setClicked] = useState(false) 

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    }


    return (
            <nav className="Navbar Items">
                <h1 className="navbar-logo">Get2Gether<i className="fas fa-users"></i></h1>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
    )
}