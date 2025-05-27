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
  const prompt = `Extract any available fields from this message: "${input}". The fields to check for are: ${fieldList}. Return a JSON object with only the fields found in the message. Include fields that are not present with a null.`;

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
          text: `I’m here to help auto-fill the application using the details you share.`
        }]);

        await new Promise(resolve => setTimeout(resolve, 700));
        setMessages(prev => [...prev, {
          from: 'bot',
          text: `please provide the details to fill the application.`
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
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    const currentInput = input; // store it in case it's needed in async ops
    setInput('');

    // Mock API response for demonstration (since geminiapikey is empty)
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiapikey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      const jsonStart = reply.indexOf('{');
      const jsonEnd = reply.lastIndexOf('}') + 1;
      const jsonString = reply.slice(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonString.trim());
      console.log('Parsed JSON:', parsed);
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
            <h2 className="header-assistant">🤖 Smart Banking Companion</h2>
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
          </div>

          {showInput && (
            <div className="input-area">
              <textarea
                className="textarea-assistant"
                rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder='e.g. "Open a savings account for John, phone 9999999999, born 1990-01-01"'
              />
              <button className="button-assistant" onClick={sendMessage}>Submit</button>
            </div>
          )}
        </div>
      </div>


      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SmartAssistant;