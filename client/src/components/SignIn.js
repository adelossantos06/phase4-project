import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./SignIn.css";
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from './UserContext';

function SignIn() {
    const history = useHistory();
    const { setUsername } = useContext(UserContext)


    function handleSubmit(values) {
        fetch("http://127.0.0.1:5555/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    //TODO HANDLE ERROR
                    console.error(data.error)
                    alert(data.error)
                } else {
                    setUsername(data.username)
                    history.push('/trips')
                }
            })
            .catch(error => {
                console.error('Error', error)
                alert('An error occurred. Please try again')
            });
    };




    return (
        <>
            <div className='container'>
                <h2>Sign In</h2>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleSubmit}
                    validate={values => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                >
                    <Form>
                        <div>
                            <label>Username:</label>
                            <Field id="username" name="username" className="usernameInput" type="text" ></Field>
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field id="password" name="password" type="password" className="passwordInput" ></Field>
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