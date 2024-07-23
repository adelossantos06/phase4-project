import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import "./SignIn.css";
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext, UserProvider } from './UserContext';

function SignIn({ onSignIn }) {
    const history = useHistory();
    const { setUsername } = useContext(UserProvider)


    function handleSubmit(values) {

        fetch('http://localhost:5555/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid username or password');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    alert('Login failed. Please check your credentials.');
                } else {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user_id', data.id);
                    setUsername(data.username);
                    onSignIn(data);
                    history.push('/trips');
                }
            })
            .catch(error => {
                console.error('Login Error:', error);
                alert('Login failed. Please check your credentials.');
            });
    }



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
                            <label >Username:</label>
                            <Field id="username" name="username" className="usernameInput" type="text" ></Field>
                        </div>
                        <div>
                            <label  >Password:</label>
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