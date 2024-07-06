import React from 'react';
import "./SignIn.css"
import { Formik, Form, Field } from 'formik';

function SignIn() {
    const initialValues = {
        username: '',
        password: ''
    }

    const handleSubmit = (values) => {
        console.log(values); // Replace with your form submission logic
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
                            <Field id="username" name="username" ></Field>
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field id="username" name="username"></Field>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </>

    )
}

export default SignIn