import { useState } from 'react';
import emailjs from '@emailjs/browser';
import getEmailConfig from '../getEmailConfig';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);

    const emailConfig = getEmailConfig();

    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm(
                emailConfig.service_id,
                emailConfig.template_id,
                e.target, {
                publicKey: emailConfig.public_key,
            })
            .then(
                (result) => {
                    setStateMessage('Message sent!');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                },
                (error) => {
                    console.log(error)
                    setStateMessage('Something went wrong, please try again later');
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                }
            );

        // Clears the form after sending the email
        e.target.reset();
    };
    return (
        <form onSubmit={sendEmail}>
            <div className='contactMeComponent'>
                <input type="text" name="from__name" className='contactMeInputField' placeholder='Name' />
            </div>
            <div className='contactMeComponent'>
                <input type="email" name="from__email" className='contactMeInputField' placeholder='Email Address' />
            </div>
            <div className='contactMeComponent'>
                <textarea name="message" className='contactMeTextField' placeholder='Message' />
            </div>
            <div className='contactMeComponent'>
                <input type="submit" value="Send" disabled={isSubmitting} className='writeToIan' />
                {stateMessage && <p>{stateMessage}</p>}
            </div>
        </form>
    );
};

const Contact = (props) => {
    return (
        <div className="sectionDisplay">
            <div className="sectionHeader">
                <h1>Contact Me</h1>
            </div>
            <div className="contactMeContent">
                <p>
                    Want to talk about engineering your next project?
                    Knicks basketball?
                    Street photography?
                    Hit me up!
                </p>
                <ContactForm />
            </div>
        </div>
    )
}

export default Contact;