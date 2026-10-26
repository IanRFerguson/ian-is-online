import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';

// Site keys are public. In development we use Cloudflare's "always passes" test key
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TURNSTILE_SITE_KEY = process.env.NODE_ENV === 'production'
    ? 'REPLACE_WITH_TURNSTILE_SITE_KEY'
    : '1x00000000000000000000AA';
const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const loadTurnstile = () => {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    return new Promise((resolve, reject) => {
        let script = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
        if (!script) {
            script = document.createElement('script');
            script.src = TURNSTILE_SCRIPT_URL;
            script.async = true;
            document.head.appendChild(script);
        }
        script.addEventListener('load', () => resolve(window.turnstile));
        script.addEventListener('error', reject);
    });
};

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileContainer = useRef(null);
    const turnstileWidgetId = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        website: '' // honeypot - hidden from people, bots tend to fill it in
    });

    useEffect(() => {
        let cancelled = false;
        loadTurnstile()
            .then((turnstile) => {
                if (cancelled || !turnstileContainer.current) return;
                turnstileWidgetId.current = turnstile.render(turnstileContainer.current, {
                    sitekey: TURNSTILE_SITE_KEY,
                    callback: setTurnstileToken,
                    'expired-callback': () => setTurnstileToken(''),
                    'error-callback': () => setTurnstileToken(''),
                });
            })
            .catch((error) => console.error('Failed to load Turnstile:', error));

        return () => {
            cancelled = true;
            if (window.turnstile && turnstileWidgetId.current !== null) {
                window.turnstile.remove(turnstileWidgetId.current);
                turnstileWidgetId.current = null;
            }
        };
    }, []);

    const resetTurnstile = () => {
        setTurnstileToken('');
        if (window.turnstile && turnstileWidgetId.current !== null) {
            window.turnstile.reset(turnstileWidgetId.current);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!turnstileToken) {
            swal("Please complete the verification check before sending");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, turnstileToken })
            });

            const data = await response.json();

            if (response.ok) {
                swal("Thanks for reaching out! I'll get back to you soon 🫡");
                setFormData({ name: '', email: '', message: '', website: '' });
            } else {
                console.error('Error:', data);
                swal("Sorry, something went wrong");
            }
        } catch (error) {
            console.error('Error:', error);
            swal("Sorry, something went wrong");
        } finally {
            setIsSubmitting(false);
            // Tokens are single-use, so get a fresh one for any further submissions
            resetTurnstile();
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
            <div className='contactMeHoneypot' aria-hidden='true'>
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete='off'
                />
            </div>
            <div className='contactMeComponent'>
                <div ref={turnstileContainer} />
            </div>
            <div className='contactMeComponent'>
                <input type="submit" value="Send" disabled={isSubmitting || !turnstileToken} className='writeToIan' />
            </div>
        </form>
    );
};

export default ContactForm;