import { useState } from 'react';
import './Utility.css'; // Ensure this CSS file is imported

function Utility({ details }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [extracted, setExtracted] = useState({});
  const [messages, setMessages] = useState([]);
  const geminiapikey = 'AIzaSyCfBv5Jy7S9ZdNSVifURY3jDodOrRJoUt4';

  const keys = Object.keys(details);
  const fieldList = keys.join(', ');
  const prompt = `Extract any available fields from this message: "${input}". The fields to check for are: ${fieldList}. Return a JSON object with only the fields found in the message.`;

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError(null);
    setExtracted({});
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    const currentInput = input;
    setInput('');

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
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const jsonStart = reply.indexOf('{');
      const jsonEnd = reply.lastIndexOf('}') + 1;
      const jsonString = reply.slice(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonString.trim());

      for (const key in details) {
        details[key]('');
      }

      for (const key in parsed) {
        if (details[key]) {
          details[key](parsed[key]);
        }
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to fetch response. Please try again.');
    }
  };

  return (
    <div className="utility-wrapper">
      {!isOpen && (
        <div className="utility-icon-wrapper">
        <div className="tooltip-message">Need help filling the form?</div>
        <button className="utility-icon" onClick={() => setIsOpen(true)} title="Autofill Assistant">
          🧠
        </button>
      </div>
      
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h2 className="chat-title">Autofill Assistant</h2>
            <button className="chat-close-button" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-input-container">
            <textarea
              className="chat-textarea"
              rows="5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
            />
            <button className="chat-send-button" onClick={sendMessage}>
              Send
            </button>
          </div>

          {error && <div className="chat-error">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default Utility;
