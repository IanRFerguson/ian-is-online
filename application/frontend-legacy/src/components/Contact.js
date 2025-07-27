import { useState } from 'react';
import emailjs from '@emailjs/browser';
import CONFIG from '../emailConfig';
import swal from 'sweetalert';



const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm(
                CONFIG.serviceID,
                CONFIG.templateID,
                e.target, {
                publicKey: CONFIG.publicKey,
            })
            .then(
                (result) => {
                    swal("Thanks for reaching out! I'll get back to you soon 🫡");
                    setIsSubmitting(false);
                },
                (error) => {
                    console.log(error)
                    swal("Sorry, something went wrong");
                    setIsSubmitting(false);
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