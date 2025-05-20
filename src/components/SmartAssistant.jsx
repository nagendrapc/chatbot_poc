import React, { useState, useEffect } from 'react';
import './SmartAssistant.css'; // Import your CSS styles

const SmartAssistant = ({ details }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [extracted, setExtracted] = useState({});
    const [messages, setMessages] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const geminiapikey = ''; // Replace with your actual Gemini API key

    const keys = Object.keys(details);
    const fieldList = keys.join(', ');
    const prompt = `Extract ${fieldList} from this message: "${input}"`;

    useEffect(() => {
        if (isOpen) {
            setMessages([]); // Reset previous messages
            setShowInput(false); // Hide input initially

            // Show messages one after another
            const introSequence = async () => {
                await new Promise(resolve => setTimeout(resolve, 300));
                setMessages(prev => [...prev, { from: 'bot', text: 'Hi 👋' }]);

                await new Promise(resolve => setTimeout(resolve, 700));
                setMessages(prev => [...prev, {
                    from: 'bot',
                    text: `I can help extract: ${fieldList}`
                }]);

                await new Promise(resolve => setTimeout(resolve, 400));
                setShowInput(true); // Now show the input
            };

            introSequence();
        } else {
            // Reset everything on close
            setMessages([]);
            setShowInput(false);
            setInput('');
            setError(null);
            setExtracted({});
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setError(null);
        setExtracted({});
        setInput('');

        // Mock API response for demonstration (since geminiapikey is empty)
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            const mockResponse = {
                name: input.match(/for (\w+)/)?.[1] || '',
                phone: input.match(/\d{10}/)?.[0] || '',
                dob: input.match(/\d{4}-\d{2}-\d{2}/)?.[0] || ''
            };
            const parsed = Object.fromEntries(
                Object.entries(mockResponse).filter(([key]) => keys.includes(key))
            );

            setExtracted(parsed);

            // Reset all fields
            for (const key in details) {
                details[key]('');
            }

            // Update with extracted values
            for (const key in parsed) {
                if (details[key]) {
                    details[key](parsed[key]);
                }
            }
        } catch (err) {
            console.error('Mock API error:', err);
            setError('Failed to process input. Please try again.');
        }
    };

    return (
        <div>
            {/* Floating Icon/Button */}
            <button
                className={`fab ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
            >
                {isOpen ? '💬' : '🤖'}
            </button>

            {/* Chat Panel */}
            <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
                <div className="container">
                    <div className="header-container">
                        <h2 className="header">🤖 Smart Banking Companion</h2>
                        <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close assistant">
                            ✖
                        </button>
                    </div>

                    <div className="chat-body">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message-row ${msg.from}`}>
                                    {msg.from === 'bot' && (
                                        <div className="bot-icon-wrapper">
                                            <span className="bot-icon">🤖</span>
                                        </div>
                                    )}
                                    <div className={`message-bubble ${msg.from}`}>
                                        <span className="text">{msg.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showInput && (
                            <div className="input-area">
                                <textarea
                                    className="textarea"
                                    rows="3"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                    placeholder='e.g. "Open a savings account for John, phone 9999999999, born 1990-01-01"'
                                />
                                <button className="button" onClick={sendMessage}>Submit</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {error && <div className="error">{error}</div>}

            {Object.keys(extracted).length > 0 && (
                <div className="result-box">
                    <h4>🧾 Extracted Info:</h4>
                    <ul>
                        {Object.entries(extracted).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SmartAssistant;