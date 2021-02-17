
import React from 'react';
import { Link } from 'react-router-dom'
import "bootswatch/dist/united/bootstrap.min.css"

const Home = () => {
    return (
        

        // <div class="card">
        //     <div class="card-body">
        //         Get2Gether is a free way to help you stay connected with friends and family members that lives abroad. <br />
        //         The web app allows registered users to add and save location information for all their contacts and always know the best time to reach out to them for a real time conversation.<br />
        //         It is a simple solution for having time zone info and time zone conversion, all in one place.<br /><br />

        //         Get2Gether started as a Capstone Project for <a href="https://adadevelopersacademy.org/" target="_blank" rel="noreferrer">Ada Developers Academy</a> by Denise Soares.<br /><br/ >
        //         Want to know more? <Link to="/signup" >Join Us</Link>
        //     </div>
        // </div>

            <div class="card">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">About Us</h6>
                    <p class="card-text">Get2Gether is a free way to help you stay connected with friends and family members that lives abroad. <br />
                        The web app allows registered users to add and save location information for all their contacts and always know the best time to reach out to them for a real time conversation.<br />
                        It is a simple solution for having time zone info and time zone conversion, all in one place.<br /><br />
                    </p>
                    <p>
                        Get2Gether started as a Capstone Project for <a href="https://adadevelopersacademy.org/" target="_blank" rel="noreferrer">Ada Developers Academy</a> by Denise Soares.<br /><br/ >
                        Want to know more? <Link to="/signup" >Join Us</Link>
                    </p>
                </div>
            </div>
    )
}

export default Home;

