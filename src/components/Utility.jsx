import { useState } from 'react';

function Utility(props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const keys = Object.keys(props.details);
  const fieldList = keys.join(', ');
  const prompt = `Extract ${fieldList} from this message: "${input}".`;

  console.log(props.details);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput('');
    setError(null);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCfBv5Jy7S9ZdNSVifURY3jDodOrRJoUt4`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${prompt}. Respond only with a JSON object` }] }],
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

      for (const key in props.details) {
        props.details[key]('');
      }
      for (const key in parsed) {
        if (props.details[key]) {
          props.details[key](parsed[key]);
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