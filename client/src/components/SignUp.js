import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import "./SignUp.css"

function SignUp() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(values) {
        fetch("http://127.0.0.1:5555/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    //TODO HANDLE ERROR
                    console.error(data.error)
                } else {
                    //TODO
                    history.push('/signin')
                }
            })
            .catch(error => {
                console.error('Error', error);
                alert('An error occured. Please try a')
            });
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label>Username:</label>
                        <Field id="username" name="username" className="usernameInput" type="text" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <Field id="email" name="email" className="emailInput" type="email" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Field id="password" name="password" type="password" className="passwordInput" />
                    </div>
                    <button type="submit" >Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUp