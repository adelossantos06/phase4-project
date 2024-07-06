import React from 'react';
import "./SignIn.css"
import { Formik, Form, Field } from 'formik';

function SignIn() {
    const initialValues = {
        username: '',
        password: ''
    }

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <div className='container'>
                <h2>Sign In</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <label>Username:</label>
                            <Field id="username" name="username" className="usernameInput"></Field>
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field id="username" name="username" type="password" className="passwordInput"></Field>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </>

    )
}

export default SignIn