import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import "./SignUp.css"

function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
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