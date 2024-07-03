import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);

    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm(
                'service_ani0jod',
                'template_2ueaqwq',
                e.target, {
                publicKey: 'jEHRP8wQ0aO-p5wa6',
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