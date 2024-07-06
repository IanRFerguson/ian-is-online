import { useState, useEffect } from 'react';

function getEmailConfig() {
    const [config, setConfig] = useState({});

    useEffect(() => {
        fetch("getEmailConfig")
            .then(
                response => response.json()
                    .then(data => {
                        setConfig(data)
                    }
                    )
            )
    }, []);

    return config
}

export default getEmailConfig;