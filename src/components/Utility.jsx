import { useState } from 'react';

function Utility({ details }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [extracted, setExtracted] = useState({});
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const geminiapikey = 'AIzaSyCfBv5Jy7S9ZdNSVifURY3jDodOrRJoUt4'; // Replace with your actual Gemini API key

  const keys = Object.keys(details);
  const fieldList = keys.join(', ');
  const prompt = `Extract any available fields from this message: "${input}". The fields to check for are: ${fieldList}. Return a JSON object with only the fields found in the message. Include fields that are not present with a null.`;

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
      console.error('API error:', err);
      setError('Failed to fetch response. Please try again.');
    }
  };

  return (
    <div className="chat-container" role="region" aria-label="Chatbot interface">
      <h2 className="chat-title">Chatbot</h2>
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
  );
}

export default Utility;