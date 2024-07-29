'use client'
import { useState } from 'react';
import styles from './chat-bot.module.css';
import { getData } from '@/services/datosclima.service';
import mensajes from './Mensajes';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const keywordArray = ['fecha', 'temperatura', 'humedad', 'dióxido de carbono', 'dioxido de carbono', 'co2'];

    const handleInputChange = (event) => {
        const input = event.target.value;
        setMessage(input);

        const foundKeywords = keywordArray.filter(keyword =>
            input.toLowerCase().includes(keyword)
        );

        setKeywords(foundKeywords);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && message.trim()) {
            event.preventDefault();

            var fecha = '';

            keywords.map((keyword) => {
                if (keyword == 'fecha') {
                    const arrayA = message.split(keyword);
                    fecha = arrayA[arrayA.length - 1].trim();
                }
            });

            const body = {
                'message': message,
                'keywords': keywords
            };

            if (fecha != '') {
                body.fecha = fecha
            }

            try {
                setLoading(true);
                const response = await getData(body);
                const data = response.data;

                console.log(response);

                setResponse(data);

                console.log('Mensaje enviado:', message);
                setMessage('');
                setKeywords([]);
            } catch (error) {
                console.log(error?.response?.data);
                mensajes(error?.response?.data?.data, "Error al recuperar datos", "error");
            } finally {
                setLoading(false);
            }
        }
    };

    const resetChat = () => {
        setMessage('');
        setKeywords([]);
        setResponse([]);
        setLoading(false);
    }

    return (
        <div className={styles.chatbot}>
            <label htmlFor="chat-input">Chat:</label>
            <textarea
                id="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                rows="3"
            />
            {/* <div className={styles.keywords}>
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
            </div> */}
            {loading && (
                <div className={styles.loading}>
                    <p>Cargando...</p>
                </div>
            )}
            {response.length > 0 && (
                <div className={styles.response}>
                    <p>Respuesta</p>
                    {response.map((response, index) => (
                        <p key={index}>{response}</p>
                    ))}
                    <button onClick={resetChat} className={styles.resetButton}>Reiniciar</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
