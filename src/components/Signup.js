import React, {useReducer, useState} from 'react'
import { Button, Alert, Form, Container, Card, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const Signup = () => {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        // alert('Your info has been submitted.')
        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    }
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    return (
        <div classname='wrapper'>
            <h2>Sign Up</h2>
            {submitting &&
                <div>
                    Please submit the following:
                    <ul>
                        {Object.entries(formData).map(([full_name, value]) => (
                            <li key={full_name}><strong>{full_name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Full Name</p>
                        <input full_name='full_name' onChange={handleChange}/>
                    </label>
                </fieldset>
                <Alert variant='primary'>Please check info before submitting</Alert>
                <Button>Submit</Button>
            </form>
        </div>
    )
}

export default Signup