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
            <p>Want to create something awesome together? I'm all ears! If you're interested in collaborating on a project or have an idea that you think I can help bring to life, I'd love to hear from you. Whether it's software or art, or a blend of the two, I'm always looking for new and exciting ways to create interactive experiences that leave a lasting impression. You can get in touch with me by filling out the contact form below or by sending me an email at jmilst20@gmail.com. Let's create something amazing together</p>
            <FallDown isLoading={isLoading}>
              <div>
                <Field type="email" name="email" placeholder="Email Address" onBlur={onBlur} onFocus={onFocus} />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <Field name="subject" placeholder="Subject" onBlur={onBlur} onFocus={onFocus} />
                <ErrorMessage name="subject" component="div" />
              </div>
              <div>
                <Field as="textarea" placeholder="Message" name="message" onBlur={onBlur} onFocus={onFocus} />
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
