'use client'
import { useState } from 'react';
import styles from './chat-bot.module.css';

const Chatbot = () => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message.trim()) {
            console.log('Mensaje enviado:', message);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatbot}>
            <label htmlFor="chat-input">Chat:</label>
            <input
                type="text"
                id="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
            />
        </div>
    );
};

export default Chatbot;
