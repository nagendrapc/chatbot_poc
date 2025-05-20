import { useState } from 'react';

function Utility({ details }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [extracted, setExtracted] = useState({});
  const geminiapikey = ''; // Replace with your actual Gemini API key

  const keys = Object.keys(details);
  const fieldList = keys.join(', ');
  const prompt = `Extract ${fieldList} from this message: "${input}"`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    setError(null);
    setExtracted({});
    setInput('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiapikey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${prompt}. Respond only with a JSON object.` }] }],
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
      console.error('API error:', err);
      setError('Failed to process input. Please try again.');
    }
  };

  return (
    <div className="utility-container" style={styles.container}>
      <h2 style={styles.header}>💡 Smart Banking Assistant</h2>
      <p style={styles.instructions}>
        Type your request naturally. I’ll extract: <strong>{fieldList}</strong>
      </p>

      <textarea
        style={styles.textarea}
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
        placeholder='e.g. "Please transfer 5000 from account 1234567890 to 9876543210."'
      />

      <button style={styles.button} onClick={sendMessage}>Submit</button>

      {error && <div style={styles.error}>{error}</div>}

      {Object.keys(extracted).length > 0 && (
        <div style={styles.resultBox}>
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
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
    fontFamily: 'sans-serif',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: '10px',
  },
  instructions: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#555',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  resultBox: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
};

export default Utility;