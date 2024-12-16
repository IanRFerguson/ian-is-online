import { useState } from 'react';
import emailjs from '@emailjs/browser';
import CONFIG from '../emailConfig';
import swal from 'sweetalert';

function checkCompleteForm(e) {
    console.log("Contact form evaluating...")
}

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
        <form onSubmit={sendEmail} className='contactMeForm'>
            <div className='contactMeComponent'>
                <input type="text" name="from__name" className='contactMeInputField' placeholder='Name' required />
            </div>
            <div className='contactMeComponent'>
                <input type="email" name="from__email" className='contactMeInputField' placeholder='Email Address' required />
            </div>
            <div className='contactMeComponent'>
                <textarea name="message" className='contactMeTextField' placeholder='Message' required />
            </div>
            <div className='contactMeComponent'>
                <input type="submit" value="Send" disabled={isSubmitting} className='writeToIan' />
            </div>
        </form>
    );
};

export default ContactForm;