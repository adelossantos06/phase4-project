import React, { useState } from 'react';
import "./SignIn.css";
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.PreventDefault()
    }



    return (
        <>
            <div className='container'>
                <h2>Sign In</h2>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <label>Username:</label>
                            <Field id="username" name="username" className="usernameInput" type="text"></Field>
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field id="pasword" name="password" type="password" className="passwordInput"></Field>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>

            </div>
            <div className="signup">
                <p>Don't have an account?</p>
                <NavLink to="/signup">
                    <button className='signup-button'>Sign Up</button>
                </NavLink>

            </div>
        </>

    )
}

export default SignIn