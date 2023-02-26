import React, { useState, useEffect } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import FallDown from '../Shared/FallDown';
function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    window.addEventListener(
      "animationComplete",
      (e) => {
        setIsLoading(false);
      },
      false
    );
  }, [])
  const onBlur = () => {
    if (window.game) {
      window.game.input.keyboard.enabled = true;
    }
  }
  const onFocus = () => {
    if (window.game) {
      window.game.input.keyboard.enabled = false;
    }
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
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
        console.log(values);
        fetch('/sendMessage', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: values.email,
            content: values.message,
            subject: values.subject
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setSubmitting(false);
          });

      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <h2>Contact</h2>
            <FallDown isLoading={isLoading}>
              <div>
                <Field type="email" name="email" onBlur={onBlur} onFocus={onFocus} />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <Field name="subject" onBlur={onBlur} onFocus={onFocus} />
                <ErrorMessage name="subject" component="div" />
              </div>
              <div>
                <Field as="textarea" name="message" onBlur={onBlur} onFocus={onFocus} />
                <ErrorMessage name="message" component="div" onBlur={onBlur} onFocus={onFocus} />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </FallDown>


          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Contact;
