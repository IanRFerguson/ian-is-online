import { useState } from 'react';
import swal from 'sweetalert';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                swal("Thanks for reaching out! I'll get back to you soon 🫡");
                setFormData({ name: '', email: '', message: '' });
            } else {
                console.error('Error:', data);
                swal("Sorry, something went wrong");
            }
        } catch (error) {
            console.error('Error:', error);
            swal("Sorry, something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={sendEmail} className='contactMeForm'>
            <div className='contactMeComponent'>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className='contactMeInputField'
                    placeholder='Name'
                    required
                />
            </div>
            <div className='contactMeComponent'>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='contactMeInputField'
                    placeholder='Email Address'
                    required
                />
            </div>
            <div className='contactMeComponent'>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className='contactMeTextField'
                    placeholder='Message'
                    required
                />
            </div>
            <div className='contactMeComponent'>
                <input type="submit" value="Send" disabled={isSubmitting} className='writeToIan' />
            </div>
        </form>
    );
};

export default ContactForm;