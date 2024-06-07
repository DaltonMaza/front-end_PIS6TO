'use client'
import { useState } from 'react';
import styles from './chat-bot.module.css';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [keywords, setKeywords] = useState([]);

    const keywordArray = ['fecha', 'temperatura', 'humedad', 'dióxido de carbono'];

    const handleInputChange = (event) => {
        const input = event.target.value;
        setMessage(input);

        const foundKeywords = keywordArray.filter(keyword =>
            input.toLowerCase().includes(keyword)
        );

        setKeywords(foundKeywords);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message.trim()) {
            console.log('Mensaje enviado:', message);
            setMessage('');
            setKeywords([]);
            event.preventDefault();
        }
    };

    return (
        <div className={styles.chatbot}>
            <label htmlFor="chat-input">Chat:</label>
            <textarea
                id="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                rows="2"
            />
            {/* <input
                type="text"
                id="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
            /> */}
            <div className={styles.keywords}>
                {keywords.length > 0 && (
                    <div>
                        Palabras clave detectadas:
                        <ul>
                            {keywords.map((keyword, index) => (
                                <li key={index} className={styles.keyword}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
