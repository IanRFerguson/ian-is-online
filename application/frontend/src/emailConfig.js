const CONFIG = {
    serviceID: process.env.REACT_APP_EMAIL_SERVICE_ID,
    templateID: process.env.REACT_APP_EMAIL_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY
};

for (const [key, value] of Object.entries(CONFIG)) {
    if (value == null) {
        throw new Error(`Missing email config value: ${key}`);
    }
}

export default CONFIG;