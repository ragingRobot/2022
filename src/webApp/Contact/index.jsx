import React from 'react';
import CenteredText from '../CenteredText';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Contact() {
    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h2>Contact</h2>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field name="subject" />
                        <ErrorMessage name="subject" component="div" />
                        <Field as="textarea" name="message" />
                        <ErrorMessage name="message" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Contact;
